Controller   = require './base/controller'
HomePageView = require '../views/home/home-page'

module.exports = class HomeController extends Controller

  index: ->
    @view = new HomePageView region: 'main'
