"use strict"

LIVERELOAD_PORT = 35729
lrSnippet       = require("connect-livereload")(port: LIVERELOAD_PORT)
moment          = require 'moment'

mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->

  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'

    browserify:
      app:
        files:
          'public/js/app.js': [
            'app/**/*.coffee'
            'app/**/*.js'
            'app/**/*.hbs'
          ]
        options:
          debug: true
          transform: ['coffeeify', 'hbsfy']
          extensions: ['.coffee', '.hbs']
          insertGlobals: true
          aliasMappings: [
            {
              cwd: 'app/controllers'
              src: ['**/*.coffee']
              dest: 'controllers'
            },
            {
              cwd: 'app/templates'
              src: ['**/*.hbs']
              dest: '../templates'
            }
          ]
          shim:
            jquery:
              path: 'bower_components/jquery/jquery.js'
              exports: '$'

    clean:
      dist: ['public/', 'tmp/']

    concat:
      distCss:
        src: [
          'vendor/styles/bootstrap.css'
          'tmp/css/app.css'
          'vendor/styles/helpers.css'
        ]
        dest: 'public/css/app.css'
      devJs:
        files:
          'public/js/app.js': '<%= jsFiles %>'

    connect:
      options:
        hostname: '0.0.0.0'
        port: 9000
      livereload:
        options:
          middleware: (connect) ->
            [lrSnippet, mountFolder(connect, "./public")]

    copy:
      assets:
        files: [
          {
            expand: true
            cwd: 'app/assets/'
            src: ['**']
            dest: 'public/'
            filter: 'isFile'
          }
        ]

    mincss:
      dist:
        files:
          "public/css/app.css": "public/css/app.css"

    stylus:
      dist:
        options:
          compress: false
          paths: ['app/css']
        files:
          'tmp/css/app.css': 'app/css/application.styl'

    mocha:
      test:
        src: "http://localhost:4466/index.html"
        mocha:
          ignoreLeaks: false
          timeout: 20000
        run: true

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"

    shell:
      express:
        options:
          async: true
          failOnError: true
          stderr: true
          stdout: true
        command: 'coffee server.coffee -n'

    uglify:
      app:
        options:
          report: 'min'
          preserveComments: 'some'
        src: 'public/js/app.js'
        dest: 'public/js/app.js'

    watch:
      assets:
        files: ['app/assets/**/*'],
        tasks: ['copy']
        options:
          debounceDelay: 50
      css:
        files: ['app/styles/**/*.styl'],
        tasks: ['styles']
        options:
          debounceDelay: 50
      hbs:
        files: ['app/templates/**/*.hbs']
        tasks: ['browserify:app']
        options:
          debounceDelay: 250
      js:
        files: ['app/**/*.coffee'],
        tasks: ['browserify:app']
        options:
          debounceDelay: 250
      livereload:
        options:
          debounceDelay: 250
          livereload: true
        files: 'public/**/*'

  grunt.registerTask 'b', ['clean', 'copy', 'browserify']
  grunt.registerTask 'm', ['b', 'uglify']
  grunt.registerTask 's', ['b', 'shell:express', 'connect:livereload', 'open', 'watch']
  grunt.registerTask 'default', 'b'
