gulp = require 'gulp'
gp = (require 'gulp-load-plugins')()
del = require 'del'
path = require 'path'

settings =
  dev: 'settings/dev'
  devOut: 'settings.dev.json'
  pre: 'settings/pre'
  preOut: 'settings.pre.json'
  prod: 'settings/prod'
  prodOut: 'settings.prod.json'
  files: 'settings/**/*.yml'
  dest: 'app'

gulp.task 'settings.clean', ->
  del [(path.join settings.dest, settings.temp)]

gulp.task 'settings.build.dev', ->
  gulp.src settings.dev
    # Avoid breaking stream on error and notify error
    .pipe gp.plumberNotifier()
    # Concatenante YAML files and transform them into JSON
    .pipe gp.yamlDirs settings.devOut
    .pipe gulp.dest path.join settings.dest, settings.devOut

gulp.task 'settings.build.pre', ->
  gulp.src settings.pre
    # Avoid breaking stream on error and notify error
    .pipe gp.plumberNotifier()
    # Concatenante YAML files and transform them into JSON
    .pipe gp.yamlDirs settings.preOut
    .pipe gulp.dest path.join settings.dest, settings.preOut

gulp.task 'settings.build.prod', ->
  gulp.src settings.prod
    # Avoid breaking stream on error and notify error
    .pipe gp.plumberNotifier()
    # Concatenante YAML files and transform them into JSON
    .pipe gp.yamlDirs settings.prodOut
    .pipe gulp.dest path.join settings.dest, settings.prodOut

gulp.task 'settings.watch', ->
  gulp.watch settings.files, ['settings.build']

gulp.task 'clean', ['settings.clean']
gulp.task 'build', [
  'settings.build.dev', 'settings.build.pre', 'settings.build.prod'
]
gulp.task 'watch', ['settings.watch']
gulp.task 'default', ['build', 'watch']
