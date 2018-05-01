const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = [
    {
        mode: 'production',
        target: 'web',
        entry: {
            client: [
                './client.jsx',
            ]
        },
        devtool: 'source-map',
        plugins: [
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
    },
    {
        mode: 'production',
        target: 'node',
        externals: [nodeExternals()],
        entry: {
            server: [
                'babel-polyfill', // TODO: check if still necessary
                './server.js'
            ]
        },
        devtool: 'source-map',
        plugins: [
        ],
        output: {
            path: path.join(__dirname, '/prod'),
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
