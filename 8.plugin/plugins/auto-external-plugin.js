const ExternalModule = require('webpack/lib/ExternalModule');
class AutoExternalPlugin {
    constructor(options) {
        this.options = options;
        this.externalModules = {};
    }
    apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
            //监听语法村分析的钩子 acorn.Parser
            normalModuleFactory.hooks.parser
                .for("javascript/auto").tap('AutoExternalPlugin', parser => {
                    //当parser解析语法树，或者说遍历语法树节点的时候，当遇到import的时候，就会触发import事件
                    parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
                        if (this.options[source])
                            this.externalModules[source] = true;//{jquery:true}
                    });
                });

            //本来是由factory创建模块 normalModuleFactory创建模块的方法
            //(data, callback) =>{} 由它来创建模块 
            normalModuleFactory.hooks.factory.tap('AutoExternalPlugin', (factory) => (data, callback) => {

                let dependency = data.dependencies[0];///就是我们要创建的模块名称 jquery
                console.log('dependency', dependency);
                let moduleName = dependency.request; // 字符串jquery
                let config = this.options[moduleName];
                if (config) {
                    callback(
                        null,
                        new ExternalModule(config.variable, 'window', dependency.request)
                    );
                } else {
                    //如果说这个模块不作为外部模块处理的话，需要调用原来老的或者 正常的factory 来生产模块
                    factory(data, callback);
                }
            });
        });
        compiler.hooks.compilation.tap('AutoExternalPlugin', compilation => {
            //这个插件给其它 插件提供了一个改变HTML里标签的机会
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('AutoExternalPlugin', (htmlPluginData, callback) => {
                //console.log(JSON.stringify(htmlPluginData, null, 2));
                let tags = Object.keys(this.externalModules).map(key => this.options[key].url).map(url => (
                    {
                        "tagName": "script",
                        "closeTag": true,
                        "attributes": {
                            "type": "text/javascript",
                            "src": url
                        }
                    }
                ));
                htmlPluginData.body = [...tags, ...htmlPluginData.body];
                //htmlWebpackPluginAlterAssetTags 异步串行瀑布
                callback(null, htmlPluginData);
            });
        });
    }
}
module.exports = AutoExternalPlugin;
/**
 *1.找一下我的代码中到底有没有外部依赖的模块?
   分析 语法树，找到import 或者 require依赖，有没有依赖或者说引入jquery
  2.如果有的需二个步骤
     1.把所有引jquery模块变成外部模块
     2.往产出的html里面添加一个外链的JS脚本
 *
 *
 */