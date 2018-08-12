var path = require('path'),
    webpack = require('webpack')

var exclude = /node_modules/

module.exports = {
    entry: [
        './index.html',
        './src/js/main.js',
        './src/less/main.less'
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: exclude,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "../[name].[ext]",
                        }
                    },
                    'extract-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src'],
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: exclude,
                use: ['babel-loader?presets[]=es2015']
            },
            {
                test: /\.less$/,
                exclude: exclude,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|eot|svg|ttf|woff|woff2)$/,
                exclude: exclude,
                use: ['file-loader']
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/assets'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        publicPath: './dist/assets',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8080,
        overlay: true
    }
}
