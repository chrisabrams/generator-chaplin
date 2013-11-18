# generator-chaplin [![Build Status](https://secure.travis-ci.org/chrisabrams/generator-chaplin.png?branch=master)](https://travis-ci.org/chrisabrams/generator-chaplin)

![Chaplin](http://s3.amazonaws.com/imgly_production/3401027/original.png)

Generate scaffolds for [Chaplin.js](http://chaplinjs.org/) using [Yeoman](http://yeoman.io). Expedite the process of creating single page web apps.

Features:

- Provides a working Chaplin.js boilerplate application powered by Yeoman, Grunt, and Bower
- Generate models, views, controllers, etc. on the fly
- Coffeescript source maps out of the box
- Livereload while developing

## Installation

1. Install Yeoman globally

        npm install -g yo

2. Install the Chaplin generator globally

        npm install -g generator-chaplin

3. Create a new project folder

4. Initiate the generator in your project folder

        yo chaplin

## Scaffolding
Once you have generated an app, you can add additional scaffolding by executing these commands from the root of your project.

All scaffolding supports deep paths, so you could name a file `foo` or `foo/bar/baz`, which would end up as `foo/bar/baz.coffee`. Don't worry about the file extension, this is take care of automatically.

### Controllers

    yo chaplin:controller 'mycontroller'

This would create `app/controllers/mycontroller.coffee` (assuming no controller prefix in this case).

### Models & Collections

#### Models

    yo chaplin:model 'mymodel'

This would create `app/models/mymodel.coffee`.

#### Collections

    yo chaplin:collection 'mycollection'

This would create `app/models/mycollection.coffee`.

### Views & CollectionViews

#### Views

    yo chaplin:view 'myview'

This would create `app/views/myview.coffee`.

#### CollectionViews

    yo chaplin:view 'mycollectionview'

This would create `app/views/mycollectionview.coffee`.

### Templates
Creates a handlebars tempalte file.

    yo chaplin:templates 'foo'

This would create `app/templates/foo.hbs`

## Run the server

    grunt s

## Destroy a project

    yo chaplin:destroy

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
