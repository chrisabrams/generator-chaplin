"use strict"

glob  = require 'glob'
grunt = require 'grunt'
util  = require 'util'
 
aliasMappingsToAliasArray = (aliasMappings) ->
 
  aliasArray = []
 
  aliases = (if util.isArray(aliasMappings) then aliasMappings else [aliasMappings])
 
  aliases.forEach (alias) ->
 
    grunt.file.expandMapping(alias.src, alias.dest,
      cwd: alias.cwd
    ).forEach (file) ->
 
      expose = file.dest.substr(0, file.dest.lastIndexOf("."))
      pa = "./" + file.src[0] + ":" + expose
 
      aliasArray.push pa
 
      return
 
    return
 
  return aliasArray

module.exports = (grunt) ->

  watch = false

  if grunt.cli.tasks.indexOf 'w' > -1
    watch = true

  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'

    browserify:
      vendor:
        dest: 'public/js/vendor.js'
        src: []
        options:
          browserifyOptions:
            fullPaths: false
          alias: [
            './node_modules/backbone/backbone.js:backbone'
            './node_modules/jquery/dist/jquery.js:jquery'
            './node_modules/handlebars/dist/handlebars.js:handlebars'
            './node_modules/hbsfy/runtime.js:hbsfy/runtime'
            './node_modules/underscore/underscore.js:underscore'
          ]

      app:
        watch: watch
        files:
          'public/js/app.js': [
            'app/**/*.coffee'
            'app/**/*.js'
            'app/**/*.hbs'
          ]
        options:
          browserifyOptions:
            extensions: [ '.coffee', '.hbs' ]
            fullPaths: false
          bundleOptions:
            debug: true
          transform: [ 'coffeeify', 'hbsfy' ]
          external: [
            'backbone'
            'handlebars'
            'hbsfy/runtime'
            'jquery'
          ]
          alias: aliasMappingsToAliasArray(
            [
              cwd: './app/controllers'
              src: [
                '**/*.coffee'
                '**/*.js'
              ]
              dest: 'controllers'
            ,
              cwd: './app/templates'
              src: [
                '**/*.hbs'
              ]
              dest: '../templates'
            ]
          )

    clean:
      dist: ['public/', 'tmp/']

    concat:
      distCss:
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css'
          'tmp/css/app.css'
        ]
        dest: 'public/css/app.css'
      distJs:
        src: ['public/js/app.js']
        dest: 'public/js/app.js'

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
      bootstrap:
        files: [
          {
            expand: true
            cwd: 'bower_components/bootstrap/dist/fonts/'
            src: ['**']
            dest: 'app/assets/fonts/'
            filter: 'isFile'
          }
        ]

    mincss:
      dist:
        files:
          "public/css/app.css": "public/css/app.css"

    mocha:
      test:
        src: "http://localhost:4466/index.html"
        mocha:
          ignoreLeaks: false
          timeout: 20000
        run: true

    shell:
      express:
        options:
          async: watch
          failOnError: true
          stderr: true
          stdout: true
        command: 'coffee server.coffee -n'

    stylus:
      dist:
        options:
          compress: false
          paths: ['app/css']
        files:
          'tmp/css/app.css': 'app/styles/application.styl'

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
        tasks: ['copy:assets']
        options:
          debounceDelay: 250
      livereload:
        options:
          debounceDelay: 250
          livereload: true
        files: 'public/**/*'

  grunt.registerTask 'scripts', ['browserify']
  grunt.registerTask 'styles',  ['stylus', 'concat:distCss']

  grunt.registerTask 'b', ['clean', 'copy', 'styles', 'scripts']
  grunt.registerTask 'm', ['b', 'uglify']
  grunt.registerTask 's', ['b', 'shell:express']
  grunt.registerTask 'w', ['b', 'shell:express', 'watch']
  grunt.registerTask 'default', 'b'
