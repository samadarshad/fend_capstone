const path = require('path')

module.exports = {
    entry: {
        ClientLib: ['./src/client/ClientLib.js']
    },
    output: {
        libraryTarget: 'umd',
        library: 'Client',
    },
    resolve: {
        alias: {
            Shared: path.resolve(__dirname, 'src/shared/')
        }
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                      }
                    }
                ],
            }
        ]
    }
}
