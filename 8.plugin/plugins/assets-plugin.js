
class AssetsPlugin {
    constructor(options) {
        this.options = options;
    }
    //每个插件都有一个方法 apply
    apply(compiler) {
        compiler.hooks.compilation.tap('AssetsPlugin', (compilation, params) => {
            compilation.hooks.chunkAsset.tap('AssetsPlugin', (chunk, filename) => {
                console.log(`通过${chunk}生成了一个${filename}`);
            });
        });
    }
}
module.exports = AssetsPlugin;