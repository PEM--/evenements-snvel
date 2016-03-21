gulp = require 'gulp'
gp = (require 'gulp-load-plugins')()

# Paths
paths =
  jade: './jade/**/*.jade'
  jadeTemplates: './jade/templates/*.jade'
  html: './tmp/**/*.html'
  stylus: 'styles/**/*.styl'
  stylusIndex: './styles/styles.styl'
  css: 'styles/css/'
  # images: 'images/*'
  temp: './temp/'
  build: './build/'
  final: '../app/private/emails/'

# Direct errors to notification center
handleError = ->
  gp.plumber errorHandler: gp.notify.onError ->
    gp.util.beep()
    "Error: <%= error.message %>"

# Build
gulp.task 'plaintext', ->
  gulp.src paths.html
    .pipe gp.html2txt()
    .pipe gulp.dest paths.build + '/plaintext'

# Stylus
gulp.task 'stylus', ->
  gulp.src paths.stylusIndex
    .pipe handleError()
    .pipe gp.stylus()
    .pipe gp.autoprefixer()
    .pipe gulp.dest paths.css
    .pipe gp.livereload()

# Jade
gulp.task 'jade', ->
  gulp.src paths.jadeTemplates
    .pipe handleError()
    .pipe gp.jade()
    .pipe gulp.dest paths.temp
    .pipe gp.livereload()

gulp.task 'inline', ['jade', 'stylus'], ->
  gulp.src [paths.html]
    #.pipe(gp.inlineCss(preserveMediaQueries: true))
    .pipe handleError()
    .pipe gp.juice()
    .pipe gulp.dest paths.build
    .pipe gp.livereload()

gulp.task 'copy', ['inline'], ->
  gulp.src paths.build
    .pipe gulp.dest paths.final

# Server
gulp.task 'connect', ->
  gp.connect.server
    root: __dirname

gulp.task 'reload', ->
  gulp.src paths.html
    .pipe gp.livereload()

gulp.task 'watch', ->
  server = gp.livereload()
  gp.livereload.listen()
  gulp.watch paths.stylus, ['inline']
  gulp.watch paths.jade, ['inline']

gulp.task 'clean', require('del').bind(null, [
  paths.build, paths.css, paths.html
])

gulp.task 'default', [
  'inline'
  'connect'
  'watch'
]
