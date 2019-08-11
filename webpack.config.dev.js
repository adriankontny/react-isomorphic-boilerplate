const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    client: [
      './client.jsx',
      'webpack-hot-middleware/client?reload=true&overlay=false',
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new AssetsPlugin({
      fullPath: false,
      path: path.join(__dirname, '/prod'),
    }),
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        loader: 'babel-loader',
      },
    ],
  },
};
