View = require '../base/view'

module.exports = class HomePageView extends View
  autoRender: true
  className: 'container'
  template: require '../../templates/home'
