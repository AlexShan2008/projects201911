const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development', //开发模式下打包出来的文件不会压缩
    devtool: 'none',//不需要生成sourcemap文件
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),//产出的文件路径
        filename: 'bundle.js'//产出的文件名
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}