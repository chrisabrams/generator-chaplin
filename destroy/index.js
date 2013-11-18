'use strict';

var helpers = require(__dirname + '/../lib'),
    util    = require('util'),
    yeoman  = require('yeoman-generator')

var DestroyGenerator = module.exports = function DestroyGenerator(args, options, config) {

  helpers.deleteCurrentFolder()
  console.log("Project destroyed.")
};

DestroyGenerator.prototype.files = function files() {

};
