# The application object.
$ = require 'jquery'
Backbone = require 'backbone'
Backbone.$ = $
Chaplin = require('chaplin')

module.exports = class Application extends Chaplin.Application
