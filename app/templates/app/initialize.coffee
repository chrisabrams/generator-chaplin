Application = require './application'
routes      = require './routes'

$ ->

  new Application {
    title: 'Chaplin Generator Example',
    controllerSuffix: '',
    routes
  }
