const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
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
            new AssetsPlugin({
                fullPath: false,
                path: path.join(__dirname, '/prod')
            }),
            new CleanWebpackPlugin(['dist']),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        output: {
            path: path.join(__dirname, '/dist'),
            publicPath: '/',
            filename: 'bundle.[hash].js',
            sourceMapFilename: 'bundle.[hash].map'
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
