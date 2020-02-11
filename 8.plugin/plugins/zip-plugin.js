const jszip = require('jszip');
const { RawSource } = require('webpack-sources');
class ZipPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        let that = this;
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            console.log(compilation.assets);
            let zip = new jszip();
            for (let filename in compilation.assets) {
                let source = compilation.assets[filename].source();
                //向压缩里添加一个新的文件，文件的名称叫filename,文件内容source
                zip.file(filename, source);
            }
            zip.generateAsync({ type: 'nodebuffer' }).then(content => {
                //compilation.assets[that.options.filename] = new RawSource(content);
                compilation.assets[that.options.filename] = {
                    source() {
                        return content;
                    },
                    size() {
                        return content.length;
                    }
                }
                callback();
            });

        });
    }
}
module.exports = ZipPlugin;
/**
 * 1.想办法得到所有产出的文件 emit: new AsyncSeriesHook(["compilation"]),
 * 2.找一个工具模块帮我们把这些产出的文件打成一个压缩包
 * 3.压缩包添加到产出的目录里支
 */