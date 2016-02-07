gulp = require 'gulp'
gp = (require 'gulp-load-plugins')()
del = require 'del'
path = require 'path'

settings =
  src: 'config'
  files: '**/*.yml'
  temp: 'settings.dev.json'
  dest: 'app'

gulp.task 'settings.clean', ->
  del [(path.join settings.dest, settings.temp)]

gulp.task 'settings.build', ->
  gulp.src settings.src
    # Avoid breaking stream on error and notify error
    .pipe gp.plumberNotifier()
    # Concatenante YAML files and transform them into JSON
    .pipe gp.yamlDirs settings.temp
    .pipe gulp.dest path.join settings.dest, settings.temp

gulp.task 'settings.watch', ->
  gulp.watch (path.join settings.src, settings.files), ['settings.build']

gulp.task 'clean', ['settings.clean']
gulp.task 'build', ['settings.build']
gulp.task 'watch', ['settings.watch']
gulp.task 'default', ['build', 'watch']
