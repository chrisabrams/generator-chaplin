Controller    = require './base/controller'
FooterView    = require '../views/footer'
HeaderView    = require '../views/header'
HomePageView  = require '../views/home/home-page'
JumbotronView = require '../views/bootstrap/jumbotron'

module.exports = class HomeController extends Controller

  beforeAction: ->
    super

    @reuse 'header', HeaderView, region: 'header'
    @reuse 'footer', FooterView, region: 'footer'

  index: ->
    @view = new JumbotronView region: 'main'
    @view.subview 'home-page-content', new HomePageView region: 'main'

    @
