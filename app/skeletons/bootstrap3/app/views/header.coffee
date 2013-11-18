View = require './base/view'

module.exports = class HeaderView extends View
  autoRender: true
  className: 'container'
  template: require '../templates/header'
