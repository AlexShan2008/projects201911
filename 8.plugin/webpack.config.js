const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DonePlugin = require('./plugins/done-plugin');
const AssetsPlugin = require('./plugins/assets-plugin');
const ZipPlugin = require('./plugins/zip-plugin');
const AutoExternalPlugin = require('./plugins/auto-external-plugin');
module.exports = {
    mode: 'development',
    devtool: 'none',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    //都是根据模块的名字查找规则
    resolve: {

    },
    /*  externals: {
         //windows上全局变量的名字     let $ = window.jQuery
         jquery: 'jQuery'
     }, */
    resolveLoader: {
        modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        /*  new AssetsPlugin(),
         new DonePlugin(),
         new ZipPlugin({
             filename: Date.now() + '.zip'
         }) */
        new AutoExternalPlugin({
            lodash: {
                variable: '_',// window.jQuery
                url: 'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.js'
            },
            jquery: {
                variable: 'jQuery',// window.jQuery
                url: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js'
            }
        })
    ]
}