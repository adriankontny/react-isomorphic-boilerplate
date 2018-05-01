const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const NodemonPlugin = require('nodemon-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    bail: true,
    target: 'web',
    entry: {
        client: [
            './client.jsx'
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
        hot: true,
        compress: true,
        clientLogLevel: 'none',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            staticContent: '',
            title: 'HMR',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map'
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
