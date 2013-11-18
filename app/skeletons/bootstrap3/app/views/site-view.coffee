View = require './base/view'

module.exports = class SiteView extends View
  container: 'body'
  id: 'site-container'
  regions:
    header: '#header'
    main: '#outer-page-container'
    footer: '#footer'
  template: require '../templates/site'
