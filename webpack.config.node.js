const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: [
      './server.js',
    ],
  },
  devtool: 'source-map',
  plugins: [
  ],
  output: {
    path: path.join(__dirname, '/prod'),
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
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
