
class DonePlugin {
    constructor(options) {
        this.options = options;
    }
    //每个插件都有一个方法 apply
    apply(compiler) {
        //done: new AsyncSeriesHook(["stats"]),
        compiler.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
            //console.log(stats);
            callback();
        });
    }
}
module.exports = DonePlugin;