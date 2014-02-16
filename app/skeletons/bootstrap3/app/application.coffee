$          = require 'jquery'

# jQuery plugins
require '../bower_components/bootstrap/dist/js/bootstrap'

Backbone   = require 'backbone'
Backbone.$ = $
Chaplin    = require 'chaplin'

module.exports = class Application extends Chaplin.Application
