'use strict';

var helpers = require(__dirname + '/../lib'),
    util    = require('util'),
    yeoman  = require('yeoman-generator')

var CollectionGenerator = module.exports = function CollectionGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);
  helpers.generators.nameAndPath.call(this);

};

util.inherits(CollectionGenerator, yeoman.generators.NamedBase);

CollectionGenerator.prototype.files = function files() {

  helpers.creators.nameAndPath.call(this, 'collection');

};
