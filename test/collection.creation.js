'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('collection generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:collection', [
        '../../collection'
      ], 'foolio');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/models/foolio.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

describe('collection deep generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:collection', [
        '../../collection'
      ], 'foo/bar/ball');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/models/foo/bar/ball.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});
