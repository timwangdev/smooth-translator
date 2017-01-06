var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    event: './src/event.js',
    options: './src/options.js',
    page: './src/page.js',
    popup: './src/popup.vue'
  },
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/ },
      { test: /\.vue$/, loader: 'vue!eslint' },
      { test: /\.scss$/, loader: 'sass' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { context: './src', from: '*.html' },
      { context: './src', from: 'manifest.json' },
      { context: './src/img', from: 'icon*.png' },
    ])
  ]
};
