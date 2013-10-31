'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('collection view generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:collectionview', [
        '../../collectionview'
      ], 'dander');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/views/dander.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

describe('collection view deep generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:collectionview', [
        '../../collectionview'
      ], 'donde/esta/aqui');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/views/donde/esta/aqui.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

