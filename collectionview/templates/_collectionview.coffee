CollectionView = require './base/collection-view'
View           = require './base/view'

module.exports = class <%= _.capitalize(_.slugify(name)) %>CollectionView extends CollectionView
  animationDuration: 0
  autoRender: true
  itemView: View
  useCssAnimation: yes
