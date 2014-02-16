Chaplin = require 'chaplin'
SiteView = require '../../views/site-view'

module.exports = class Controller extends Chaplin.Controller

  beforeAction: ->
    @reuse 'site', SiteView
