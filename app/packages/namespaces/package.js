Package.describe({
  name: 'pierreeric:namespaces',
  version: '0.0.1',
  summary: '',
  documentation: '',
  git: ''
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.addFiles([
    'namespaces.jsx',
  ]);
  api.use([
    'react@0.14.3'
  ]);
  api.export('MainApp');
});
