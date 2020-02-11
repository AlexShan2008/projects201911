const babel = require('@babel/core');
function loader(inputSource) {
    let options = {
        presets: ["@babel/preset-env"],
        sourceMap: true,//生成sourcemap文件
        filename: this.resourcePath.split('/').pop()
    }
    //code转成的ES5代码 map映射文件(把ES6映射为ES5的映射文件，ast抽象语法树)
    //ast 因为webpack拿到code之后，也要转成ast,如果在这个loader编译的时候已经把ast生成了，则可以直接传递给webpack.webpack不需要再通过code生成ast
    let { code, map, ast } = babel.transform(inputSource, options);
    //当异步，或者当同步想返回多个值的时候
    return this.callback(null, code, map, ast);
}
module.exports = loader;