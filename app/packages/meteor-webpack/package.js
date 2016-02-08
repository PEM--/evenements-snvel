Package.describe({
    name: 'webpack:webpack',
    version: '0.4.5',
    summary: 'Seamlessly integrate Webpack with Meteor build system',
    git: 'https://github.com/thereactivestack/meteor-webpack.git',
    documentation: 'README.md'
});

Package.registerBuildPlugin({
    name: 'webpack:webpack',
    use: [
      'meteor',
      'ecmascript@0.1.5',
      'webpack:npmworkaround@0.1.0'
    ],
    sources: [
      'plugin/WebpackSourceMapFix.js',
      'plugin/WebpackCompiler.js',
      'plugin/webpack-plugin.js'
    ],
    npmDependencies: {
      'underscore': '1.8.3',
      'connect': '3.4.1',
      'cors': '2.7.1',
      'npm': '2.14.15',
      'webpack': '1.12.13',
      'webpack-dev-middleware': '1.5.1',
      'webpack-hot-middleware': '2.6.4',
      'memory-fs': '0.3.0',
      'mime': '1.3.4',
      'shelljs': '0.6.0',
      'mkdirp': '0.5.1'
    }
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');

    api.use('isobuild:compiler-plugin@1.0.0');
    api.use('webpack:reload@0.2.0');

    // Meteor polyfill for ecmascript
    api.imply('ecmascript-runtime@0.2.6')
});
