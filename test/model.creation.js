'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('model generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:model', [
        '../../model'
      ], 'foobaz');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/models/foobaz.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

describe('model deep generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:model', [
        '../../model'
      ], 'foo/bar/baz');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/models/foo/bar/baz.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});
