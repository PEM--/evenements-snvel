Package.describe({
  name: 'pierreeric:server-side-routes',
  version: '0.0.1'
});

Package.onUse(function(api) {
  // Meteor's API version
  api.versionsFrom('1.2.1');
  // NPM dependencies
  Npm.depends({
    'body-parser': '1.14.2'
  });
  // Dependencies of this package
  api.use([
    // 'pierreeric:namespaces'
  ]);
  // Dependencies server only
  api.use([
    'accounts-base',
    'meteorhacks:picker@1.0.3',
    // 'pierreeric:payment'
  ], 'server');
  // Included files in this packages
  // Server only
  api.addFiles(['server-side-routes.js'], 'server');
});
