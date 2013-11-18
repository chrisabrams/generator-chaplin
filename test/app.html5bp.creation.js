'use strict';

var assert  = require('assert'),
    path    = require('path'),
    helpers = require('yeoman-generator').test;

describe('HTML5 Boilerplate generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:app', [
        '../../app'
      ]);
      done();
    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'bower.json',
      'config.json',
      'package.json',
      'Gruntfile.coffee',
      'app/application.coffee',
      'app/initialize.coffee',
      'app/mediator.coffee',
      'app/routes.coffee',
      'app/lib/utils.coffee',
      'app/lib/view-helper.coffee',
      'app/styles/application.styl',
      'app/templates/home.hbs',
      'app/templates/site.hbs',
      //'app/controllers/home.coffee', Need to figure this one out
      'app/controllers/base/controller.coffee',
      'app/assets/apple-touch-icon-114x114-precomposed.png',
      'app/assets/apple-touch-icon-144x144-precomposed.png',
      'app/assets/apple-touch-icon-57x57-precomposed.png',
      'app/assets/apple-touch-icon-72x72-precomposed.png',
      'app/assets/apple-touch-icon-precomposed.png',
      'app/assets/apple-touch-icon.png',
      'app/assets/favicon.ico',                              
      'app/assets/index.hbs',
      'app/models/base/collection.coffee',
      'app/models/base/model.coffee',
      'app/views/base/collection-view.coffee',
      'app/views/base/view.coffee',
      'app/views/home/home-page.coffee',
      'app/views/site-view.coffee',
      'vendor/main.css',
      'vendor/normalize.css',
      '.jshintrc',
      '.editorconfig'
    ];

    helpers.mockPrompt(this.app, {
      'appName': 'html5bptest',
      'controllerSuffix': '',
      'skeleton': '1'
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });

  it('can be imported without blowing up', function () {
    var app = require('../app');
    assert(app !== undefined);
  });

});
