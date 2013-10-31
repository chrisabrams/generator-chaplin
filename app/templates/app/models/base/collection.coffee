Chaplin = require 'chaplin'
Model   = require './model'

module.exports = class Collection extends Chaplin.Collection

  model: Model
