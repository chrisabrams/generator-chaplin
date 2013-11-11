Controller   = require './base/controller'
HeaderView   = require '../views/home/header-view'
HomePageView = require '../views/home/home-page-view'

module.exports = class HomeController extends Controller

  beforeAction: ->
    super

    @compose 'header', HeaderView, region: 'header'

  index: ->
    @view = new HomePageView region: 'main'
