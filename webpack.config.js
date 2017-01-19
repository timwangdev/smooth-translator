var webpack = require('webpack');
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
      { test: /\.scss$/, loader: 'sass' },
      { test: /\.png$/,    loader: "url-loader?limit=10000&minetype=image/png" }
    ]
  },
  plugins: [
    new webpack.OldWatchingPlugin(),
    new CopyWebpackPlugin([
      { context: './src', from: '*.html' },
      { context: './src', from: 'manifest.json' },
      { context: './src/img', from: 'icon*.png' },
    ])
  ],
  vue: {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader'
    }
  },
  eslint: {
    failOnError: false
  }
};
