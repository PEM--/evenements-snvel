var webpack = require('webpack');
var path = require('path');
// var autoprefixer = require('autoprefixer');
// var normalize = require('postcss-normalize');

/*
    create an alias called 'RootEnv/' that leads to
    client/Root/development
    or
    client/Root/production
 */
var configPath;
if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  configPath = path.join(__dirname, '.', 'client', 'development');
} else {
  configPath = path.join(__dirname, '.', 'client', 'production');
}

module.exports = {
  externals: {
  //   // Make sure we use Meteor package for jQuery, react and react-router
    'jquery': '$',
    'react': 'React',
    'react-router': 'ReactRouter',
    'react-dom': 'ReactDOM',
    'react-addons-transition-group': 'React.addons.TransitionGroup',
    'react-addons-create-fragment': 'React.addons.createFragment',
    'react-addons-pure-render-mixin': 'React.addons.PureRenderMixin',
    'react-addons-update': 'React.addons.update',
    'react-addons-linked-state-mixin': 'React.addons.LinkedStateMixin',
    'react-addons-test-utils': 'React.addons.TestUtils'
  },
  devServer: {
    // You can change this to your server IP address to access it remotely
    host: 'localhost'
  },
  // hotMiddleware: {
  //   reload: true
  // },
  resolve: {
    root: path.join(__dirname, '..'),
    alias: {
      RootEnv: configPath
    },
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },
  // postcss: function() {
  //   return [autoprefixer, normalize];
  // }
};
