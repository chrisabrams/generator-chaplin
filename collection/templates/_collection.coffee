Collection = require './base/collection'
Model      = require './base/model'

module.exports = class <%= _.capitalize(_.slugify(name)) %>Collection extends Collection

  model: Model
