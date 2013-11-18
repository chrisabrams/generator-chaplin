'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('template generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:template', [
        '../../template'
      ], 'snoodle');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/templates/snoodle.hbs'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});

describe('template deep generator', function () {

  beforeEach(function (done) {

    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {

      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('chaplin:template', [
        '../../template'
      ], 'dont/hate/disney');

      done();

    }.bind(this));

  });

  it('creates expected files', function (done) {

    var expected = [
      'app/templates/dont/hate/disney.hbs'
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);

      done();
    });

  });
});
