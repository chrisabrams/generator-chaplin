$           = require 'jquery'

Application = require './application'
routes      = require './routes'

$ ->

  new Application {
    title: '<%= appName %>',
    controllerSuffix: '<%= controllerSuffix %>',
    routes
  }
