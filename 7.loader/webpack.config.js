const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //都是根据模块的名字查找规则
    resolve: {

    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'loaders'), 'node_modules']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /title\.js$/,
                enforce: 'pre',//前置
                use: [
                    'pre-loader'
                ]
            },
            {
                test: /title\.js$/,
                enforce: 'post',//后置
                use: [
                    'post-loader'
                ]
            },
            {
                test: /title\.js$/,
                use: [ //normal
                    'a-loader',
                    'b-loader',
                    'c-loader'
                ],
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',// 创建一个style标签，标签里的内容 就是CSS的样式
                    'less-loader'//负责把less编译成css
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',// 创建一个style标签，标签里的内容 就是CSS的样式
                    'css-loader'//负责把less编译成css
                ]
            },
            {
                test: /\.jpg$/,
                //url是依赖file-loader,多了一个功能，就是可以把图片转在base64字符串
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100 * 1024
                        }

                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}