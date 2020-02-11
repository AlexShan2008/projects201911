const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'none',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'plugins')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "plugins": [["import2", {
                                "libraryName": "lodash"
                            }]]
                        }
                    }
                ]
            }
        ]
    }
}