gulp = require 'gulp'
gp = (require 'gulp-load-plugins')()
del = require 'del'
path = require 'path'

settings =
  dev: 'settings/dev'
  devOut: 'settings.dev.json'
  pre: 'settings/pre'
  preOut: 'settings.pre.json'
  test: 'settings/test'
  testOut: 'settings.test.json'
  prod: 'settings/prod'
  prodOut: 'settings.prod.json'
  files: 'settings/**/*.yml'
  dest: 'app'
  imgSrc: 'assets'
  imgDist: 'app/public/img'

gulp.task 'settings.clean', ->
  del [(path.join settings.dest, settings.temp)]

gulp.task 'settings.build.dev', ->
  gulp.src settings.dev
    # Avoid breaking stream on error and notify error
    .pipe gp.plumberNotifier()
    # Concatenante YAML files and transform them into JSON
    .pipe gp.yamlDirs settings.devOut
    .pipe gulp.dest path.join settings.dest, settings.devOut

gulp.task 'settings.build.test', ->
  gulp.src settings.test
    # Avoid breaking stream on error and notify error
    .pipe gp.plumberNotifier()
    # Concatenante YAML files and transform them into JSON
    .pipe gp.yamlDirs settings.testOut
    .pipe gulp.dest path.join settings.dest, settings.testOut

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

types = Object.keys profiles
for type in types
  do (type) ->
    gulp.task "resize-#{type}", ->
      gulp.src "#{settings.imgSrc}/*.jpg"
        .pipe gp.imageResize width: profiles[type]
        .pipe gp.rename (path) -> path.basename += "_#{type}"
        .pipe gulp.dest settings.imgDist

targets = types.map (type) -> "resize-#{type}"

# PNG quantization
pngquant = require 'imagemin-pngquant'
# Optimize images
gulp.task 'imagemin', targets, ->
  gulp.src "#{settings.imgDist}/*.{jpg,png,gif}"
    .pipe gp.imagemin
      progressive: true
      svgoPlugins: [{removeViewBox: false}]
      use: [pngquant()]
    .pipe gulp.dest settings.imgDist

gulp.task 'svgmin', targets, ->
  gulp.src "#{settings.imgSrc}/*.svg"
    .pipe gp.imagemin
      svgoPlugins: [{removeViewBox: false}]
    .pipe gulp.dest settings.imgDist

# Create all webp images
gulp.task 'webp', ['imagemin'], ->
  gulp.src "#{settings.imgDist}/*.jpg"
    .pipe gp.webp()
    .pipe gulp.dest settings.imgDist

# Copy assets
gulp.task 'copy', ->
  gulp.src ["#{settings.imgSrc}/*.png"]
    .pipe gulp.dest settings.imgDist

gulp.task 'clean', ['settings.clean']
gulp.task 'build', [
  'settings.build.dev', 'settings.build.pre',
  'settings.build.test', 'settings.build.prod',
  'svgmin', 'webp', 'copy'
]
gulp.task 'watch', ['settings.watch']
gulp.task 'default', ['build', 'watch']
