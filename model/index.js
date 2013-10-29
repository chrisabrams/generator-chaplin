'use strict';

var helpers = require(__dirname + '/../lib'),
    util    = require('util'),
    yeoman  = require('yeoman-generator')

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);
  helpers.generators.nameAndPath.call(this);

};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
  
  helpers.creators.nameAndPath.call(this, 'model');

};
