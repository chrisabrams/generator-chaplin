'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('controller generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:controller', [
        '../../controller'
      ], 'snatch');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/controllers/snatch.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

describe('controller deep generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:controller', [
        '../../controller'
      ], 'snatch/that/twig');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/controllers/snatch/that/twig.coffee'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});
