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
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    // sourceMapFilename: '[name].[hash].map',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
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
