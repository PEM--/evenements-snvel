Package.describe({
  name: 'pierreeric:markdown',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // NPM dependencies
  Npm.depends({
    'marked': '0.3.5'
    /* ,'highlight.js': '9.1.0' */
  });
  // Dependencies of this package
  // Dependencies for server and client
  api.use([
    'ecmascript',
    'es5-shim',
    'cosmos:browserify@0.9.3'
  ]);
  // Included files in this packages
  // Client only
  api.addFiles('markdown.browserify.js', 'client');
  // Server and client
  api.addFiles('markdown.js');
  // Exported symbols outside the scope of this package
  api.export(['marked']);
});
