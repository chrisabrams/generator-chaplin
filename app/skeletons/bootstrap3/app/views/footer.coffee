View = require './base/view'

module.exports = class FooterView extends View
  autoRender: true
  className: 'container'
  template: require '../templates/footer'
