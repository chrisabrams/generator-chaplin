Application = require './application'
routes = require './routes'
HomeController = require './controllers/home-controller'

# Initialize the application on DOM ready event.
$ ->
  console.log "dom loaded"
  new Application {
    title: 'Brunch example application',
    controllerSuffix: '-controller',
    routes
  }
