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


# Resize images
# See breakpoints in site.variables.import.less
profiles =
  widescreenMonitor: 1920
  largeMonitor: 1200
  computer: 992
  tablet: 768
  mobile: 320

# _ = require 'underscore'
# types = _.keys profiles
# for type in types
#   do (type) ->
#     gulp.task "resize-#{type}", ->
#       gulp.src 'src/*.jpg'
#         .pipe p.imageResize width: profiles[type]
#         .pipe p.rename (path) -> path.basename += "_#{type}"
#         .pipe gulp.dest imgDist
#
# targets = _.map types, (type) -> "resize-#{type}"
#
# # Optimize images
# gulp.task 'imagemin', targets, ->
#   gulp.src "#{imgDist}/*.{jpg,png,gif,svg}"
#     .pipe p.imagemin
#       progressive: true
#       svgoPlugins: [{removeViewBox: false}]
#       use: [pngquant()]
#     .pipe gulp.dest imgDist
#
# # Create all webp images
# gulp.task 'webp', ['imagemin'], ->
#   gulp.src "#{imgDist}/*.jpg"
#     .pipe p.webp()
#     .pipe gulp.dest imgDist
#
# # Default task call every tasks created so far
# gulp.task 'default', ['webp']





gulp.task 'clean', ['settings.clean']
gulp.task 'build', [
  'settings.build.dev', 'settings.build.pre', 'settings.build.prod'
]
gulp.task 'watch', ['settings.watch']
gulp.task 'default', ['build', 'watch']
