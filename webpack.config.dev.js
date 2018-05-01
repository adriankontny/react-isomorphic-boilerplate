const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = [
    {
        mode: 'development',
        target: 'web',
        entry: {
            client: [
                './client.jsx',
                'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false'
            ]
        },
        devtool: 'inline-source-map',
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        output: {
            path: path.join(__dirname, '/dist'),
            publicPath: '/',
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].bundle.map'
        },
        module: {
            rules: [
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader'
                }
            ]
        }
    }
]
