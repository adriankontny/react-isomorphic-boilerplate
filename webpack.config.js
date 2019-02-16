const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    client: [
      './client.jsx',
    ],
  },
  // devtool: 'source-map',
  plugins: [
    new AssetsPlugin({
      fullPath: false,
      path: path.join(__dirname, './prod'),
    }),
  ],
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    // sourceMapFilename: '[name].[hash].map',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // name(module) {
          //   // get the name. E.g. node_modules/packageName/not/this/part.js
          //   // or node_modules/packageName
          //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
          //   // npm package names are URL-safe, but some servers don't like @ symbols
          //   return `npm.${packageName.replace('@', '')}`;
          // },
        },
      },
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.(css|scss)$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },
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
