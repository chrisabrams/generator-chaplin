'use strict';

var fs     = require('fs'),
    path   = require('path'),
    util   = require('util'),
    yeoman = require('yeoman-generator');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

var ChaplinGenerator = module.exports = function ChaplinGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ChaplinGenerator, yeoman.generators.Base);

ChaplinGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What is the name of your app?'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;

    cb();
  }.bind(this));
};

ChaplinGenerator.prototype.app = function app() {
  var cb = this.async();

  this.mkdir('app');
  this.mkdir('app/assets');
  this.mkdir('app/assets/fonts');
  this.mkdir('app/assets/img');
  this.mkdir('app/controllers');
  this.mkdir('app/lib');
  this.mkdir('app/models');
  this.mkdir('app/styles');
  this.mkdir('app/templates');
  this.mkdir('app/views');
  this.mkdir('test');

  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
  this.template('_package.json', 'package.json');
  this.copy('Gruntfile.coffee', 'Gruntfile.coffee');

  var _this = this;
  walk(__dirname + '/templates/app', function(err, files) {
    if (err) throw err;

    files.forEach(function(file) {
      
      // Ignore .DS_Store file
      if(file.indexOf('.DS_Store') < 1) {
        file = file.replace(__dirname + '/templates/', '');
        
        _this.copy(file, file);
      }
      
    });

    cb();
  });
};

ChaplinGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
