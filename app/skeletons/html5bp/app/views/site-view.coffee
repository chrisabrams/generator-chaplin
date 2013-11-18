View = require './base/view'

module.exports = class SiteView extends View
  container: 'body'
  id: 'site-container'
  regions:
    main: '#outer-page-container'
  template: require '../templates/site'
