'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('view generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:view', [
        '../../view'
      ], 'donde');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/views/donde.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

describe('view deep generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:view', [
        '../../view'
      ], 'donde/esta/mini');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/views/donde/esta/mini.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

