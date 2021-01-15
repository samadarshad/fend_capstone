const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
require('dotenv').config()
const serverPort = process.env.PORT;

module.exports = {
    entry: {
        index: './src/client/index.js',
    },
    resolve: {
        alias: {
            Shared: path.resolve(__dirname, 'src/shared/')
        }
    },
    devServer: {
        proxy: {
            '/ClientLib.js': {
                target: 'http://127.0.0.1:8081',
                secure: false
            },
            '/api/*': {
                target: `http://127.0.0.1:${serverPort}`,
                secure: false
            }
        }
    },
    mode: 'development',
    devtool: 'source-map',
    node : {
        fs: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]

}
