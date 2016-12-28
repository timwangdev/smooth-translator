var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './src/event.js'
  ],
  output: {
    path: './build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.scss$/, loader: 'webpack-sass' },
      { test: /\.js$/, loader: 'babel-loader?presets[]=es2015' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { context: '/src', from: '*.html' },
      { context: '/src', from: 'manifest.json' },
      { context: '/src/img', from: 'icon*.png' },
    ])
  ]
};