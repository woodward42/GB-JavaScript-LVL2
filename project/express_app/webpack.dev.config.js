const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


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
                    loader: "html-loader"
                }
            },
            {
               test: /\.css$/,
               use: ['style-loader', 'css-loader'] 
            }
            

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/public/index.html",
            filename: "index.html",
            excludeChunks: ['server'],
            inject: 'body'
        })
    ]
}