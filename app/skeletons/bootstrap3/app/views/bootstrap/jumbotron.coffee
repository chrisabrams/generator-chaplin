View = require '../base/view'

module.exports = class JumboTronView extends View
  autoRender: true
  className: 'jumbotron'
  template: require '../../templates/jumbotron'
