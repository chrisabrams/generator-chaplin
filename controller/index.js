'use strict';

var helpers = require(__dirname + '/../lib'),
    util    = require('util'),
    yeoman  = require('yeoman-generator')

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);
  helpers.generators.nameAndPath.call(this);

};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {

  helpers.creators.nameAndPath.call(this, 'controller');

};
