const postcss = require('postcss');
let loaderUtils = require('loader-utils');
const tokenizer = require('css-selector-tokenizer');
function loader(cssText) {
    const cssPlugin = (postcssOptions) => {
        return (root) => {//root代表语法树的根节点
            root.walkAtRules(/^import$/, rule => {// "'./global.css'"
                rule.remove();//把自己这条规则删除掉
                postcssOptions.importUrls.push(rule.params.slice(1, -1));
            });
            root.walkDecls('border-radius', decl => {
                const cloned = decl.clone({ prop: '-webkit-' + decl.prop })
                decl.after(cloned);
            })
            root.walkDecls(decl => {
                let values = tokenizer.parseValues(decl.value);
                values.nodes.forEach(nodeValue => {
                    nodeValue.nodes.forEach(item => {
                        if (item.type === 'url') {
                            item.url = "`+require(" + loaderUtils.stringifyRequest(this, item.url) + ").default+`";
                        }
                    });
                });
                decl.value = tokenizer.stringifyValues(values);
            })
        }
    }

    let callback = this.async();
    let postcssOptions = { importUrls: [] };
    let pipeline = postcss([cssPlugin(postcssOptions)]);
    //postcss先把cssText转成抽象语法树。然后交给插件处理,最后把新的语法树重新生成CSS代码
    pipeline.process(cssText).then(result => {
        let resultCss = result.css;
        //importUrls把导入的所有的CSS文件内容合并到当前导出的CSS脚本里
        //./global.css
        let importCSS = postcssOptions.importUrls.map(url => "`+require(" + loaderUtils.stringifyRequest(this, "!!css-loader!" + url) + ")+`").join('\r\n');
        callback(null, 'module.exports=`' + importCSS + '\r\n' + resultCss + '` ');
    });
}
module.exports = loader;
/**
 * 有两个重要的工作
 * 1.处理@import
 * 2.处理url()
 */
/**
 * pitch有什么用?
 * !!
 */
// 如果css-loader返回的是个模块的话 module.exports = "div{color:red}";