const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        ClientLib: ['./src/client/ClientLib.js']
    },
    mode: 'production',
    output: {
        libraryTarget: 'umd',
        library: 'Client',
    },
    resolve: {
        alias: {
            Shared: path.resolve(__dirname, 'src/shared/')
        }
    },
    optimization: {
        minimizer: [new TerserPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}
