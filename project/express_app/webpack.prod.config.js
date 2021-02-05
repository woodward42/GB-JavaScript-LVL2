const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


//экспорт конфига
module.exports = {
    entry: {
       main: ['core-js/stable','regenerator-runtime/runtime','whatwg-fetch','./src/public/index.js'],
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "",
        filename: "js/[name].js"
    },
    target: "web",
    devtool: "source-map",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                parallel: 4
            }),
            new CssMinimizerPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }
            },
            {
               test: /\.css$/,
               use: [MiniCssExtractPlugin.loader, 'css-loader'] 
            }
            

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/public/index.html",
            filename: "index.html",
            excludeChunks: ['server'],
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}