var path = require('path'),
    webpack = require('webpack'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var exclude = /node_modules/

module.exports = {
    entry: [
        './index.html',
        './src/js/main.js'
    ],
    mode: 'production',
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
                            attrs: ['img:src', 'link:href'],
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
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].css",
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
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
    plugins: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({}),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

}
