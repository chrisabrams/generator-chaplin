Chaplin = require 'chaplin'
require '../../lib/view-helper'

module.exports = class View extends Chaplin.View

  getTemplateFunction: ->
    @template
