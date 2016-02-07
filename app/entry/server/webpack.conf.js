var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var normalize = require('postcss-normalize');

var localIdentName = process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]';
var babelSettings = { presets: ['react', 'es2015', 'stage-0'] };
babelSettings.plugins = ['transform-decorators-legacy'];

module.exports = {
  entry: './entry',
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', query: babelSettings, exclude: /node_modules/ },
      { test: /\.css$/, loader: 'css/locals?module&localIdentName=' + localIdentName + '!postcss-loader'},
      { test: /\.styl$/, loader: 'css/locals?module&localIdentName=' + localIdentName + '!postcss-loader!stylus-loader'},
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: 'url?limit=8182' },
      { test: /\.(svg|ttf|woff|woff2|eot)(\?.*)?$/, loader: 'file' }
    ]
  },
  postcss: function() {
    return [autoprefixer, normalize];
  }
};
