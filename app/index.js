'use strict';

var fs     = require('fs'),
    path   = require('path'),
    util   = require('util'),
    walk   = require(__dirname + '/lib/walk'),
    yeoman = require('yeoman-generator'),

    controllerGenerator = require('../controller/index'),
    modelGenerator      = require('../model/index'),
    viewGenerator       = require('../view/index');

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

  var prompts = [
    {
      name: 'appName',
      message: 'Application name'
    },
    {
      name: 'controllerSuffix',
      message: 'Controller suffix (leave this blank if you dont want one)'
    },
    {
      name: 'skeleton',
      message: " \
      [0] Barebones (minimum to get started)\n \
      [1] HTML 5 Boilerplate\n \
      [2] Twitter Bootstrap\n \
      Please enter the number next to the skeleton you would like\n\n \
      "
    }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;

    if(typeof props.controllerSuffix == 'string' && props.controllerSuffix.length > 0) {
      this.controllerSuffix = props.controllerSuffix;
    }

    else {
      this.controllerSuffix = '';
    }

    if(typeof props.skeleton == null) {
      this.skeleton = 0;
    }

    else {
      this.skeleton = parseInt(props.skeleton);
    }

    cb();

  }.bind(this));
};

ChaplinGenerator.prototype.app = function app() {
  var cb = this.async();

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');

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
  this.copy('server.coffee', 'server.coffee');
  this.template('app/_initialize.coffee', 'app/initialize.coffee');

  switch(this.skeleton) {
    case 1: {
      break;
    }

    case 2: {
      break;
    }

    default: {
      this.copy('../skeletons/barebones/Gruntfile.coffee',                 'Gruntfile.coffee');
      this.copy('../skeletons/barebones/app/controllers/_home.coffee',         'app/controllers/home' + this.controllerSuffix + '.coffee')
      this.copy('../skeletons/barebones/app/styles/application.styl',          'app/styles/application.styl')
      this.copy('../skeletons/barebones/app/templates/header.hbs',             'app/templates/header.hbs')
      this.copy('../skeletons/barebones/app/templates/home.hbs',               'app/templates/home.hbs')
      this.copy('../skeletons/barebones/app/templates/site.hbs',               'app/templates/site.hbs')
      this.copy('../skeletons/barebones/app/views/home/header-view.coffee',    'app/views/home/header-view.coffee')
      this.copy('../skeletons/barebones/app/views/home/home-page-view.coffee', 'app/views/home/home-page-view.coffee')
    }
  }

  var _this = this;

  walk(__dirname + '/templates/app', function(err, files) {
    if (err) throw err;

    files.forEach(function(file) {

      // Ignore .DS_Store files as well as files that start with _.
      if ( file.indexOf('.DS_Store') === -1 && file.indexOf('_') === -1 ) {

        file = file.replace(__dirname + '/templates/', '');

        _this.copy(file, file);
      }
    });

    cb();
  }.bind(this));

}
