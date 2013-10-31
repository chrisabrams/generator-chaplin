Chaplin = require 'chaplin'
View    = require './view'

module.exports = class CollectionView extends Chaplin.CollectionView
  animationDuration: 0
  useCssAnimation: yes

  getTemplateFunction: View::getTemplateFunction
