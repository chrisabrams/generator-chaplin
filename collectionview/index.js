'use strict';

var helpers = require(__dirname + '/../lib'),
    util    = require('util'),
    yeoman  = require('yeoman-generator')

var CollectionviewGenerator = module.exports = function CollectionviewGenerator(args, options, config) {

  yeoman.generators.NamedBase.apply(this, arguments);
  helpers.generators.nameAndPath.call(this);

};

util.inherits(CollectionviewGenerator, yeoman.generators.NamedBase);

CollectionviewGenerator.prototype.files = function files() {

  helpers.creators.nameAndPath.call(this, 'collectionview');

};
