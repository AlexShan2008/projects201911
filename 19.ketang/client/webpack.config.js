const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path');
//process.env.NODE_ENV == 'production' ? 'production' : 'development';
module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',//默认是开发模块
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,//热更新插件
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: {//browserHistory的时候，刷新会报404. 自动重定向到index.html
            index: './index.html'
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "~": path.resolve(__dirname, 'node_modules')
        },
        //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            "libraryName": 'antd',
                            "libraryDirectory": "es",
                            "style": "css"
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
                //exclude: /node_modules/
            },
            /* {
                enforce: 'pre',
                test: /\.(j|t)sx?$/,
                loader: 'source-map-loader'
            }, */
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { importLoaders: 0 }
                }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                    }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { importLoaders: 0 }
                },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //热更新插件
        new webpack.HotModuleReplacementPlugin()
    ]
}