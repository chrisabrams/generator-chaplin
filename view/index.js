'use strict';

var helpers = require(__dirname + '/../lib'),
    util    = require('util'),
    yeoman  = require('yeoman-generator')

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);
  helpers.generators.nameAndPath.call(this);

};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.files = function files() {
  
  helpers.creators.nameAndPath.call(this, 'view');

};
