//现在我要绕过webpack-cli直接运行webpack打包
let webpack = require('webpack');
let config = require('./webpack.config');
let compiler = webpack(config);
compiler.run((err, stats) => {
    console.log(stats);
});
