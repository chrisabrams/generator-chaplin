'use strict';

var fs     = require('fs'),
    path   = require('path'),
    util   = require('util'),
    walk   = require(__dirname + '/lib/walk'),
    yeoman = require('yeoman-generator')

var ChaplinGenerator = module.exports = function ChaplinGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    if(!this.exists) {
      this.installDependencies({ skipInstall: options['skip-install'] });
    }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ChaplinGenerator, yeoman.generators.Base);

ChaplinGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  var _this = this;

  fs.exists('Gruntfile.coffee', function(exists) {

    if(exists) {
      console.warn("This folder is not empty.")
      _this.exists = true;
      return cb();
    }

    else {

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
    }
  })

};

ChaplinGenerator.prototype.app = function app() {

  if(this.exists) {
    return;
  }

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

  this.template('_config.json', 'config.json');
  this.template('_package.json', 'package.json');
  this.copy('server.coffee', 'server.coffee');
  this.template('app/_initialize.coffee', 'app/initialize.coffee');

  var path;

  switch(this.skeleton) {

    // HTML5 Boilerplate
    case 1: {
      break;
    }

    // Twitter Bootstrap
    case 2: {
      path = '../skeletons/bootstrap3';

      this.template(path + '/_bower.json',                      'bower.json');
      this.copy(path + '/Gruntfile.coffee',                     'Gruntfile.coffee');
      this.copy(path + '/app/controllers/_home.coffee',         'app/controllers/home' + this.controllerSuffix + '.coffee')
      this.copy(path + '/app/styles/application.styl',          'app/styles/application.styl')
      this.copy(path + '/app/templates/footer.hbs',             'app/templates/footer.hbs')
      this.copy(path + '/app/templates/header.hbs',             'app/templates/header.hbs')
      this.copy(path + '/app/templates/home.hbs',               'app/templates/home.hbs')
      this.copy(path + '/app/templates/jumbotron.hbs',          'app/templates/jumbotron.hbs')
      this.copy(path + '/app/templates/site.hbs',               'app/templates/site.hbs')
      this.copy(path + '/app/views/bootstrap/jumbotron.coffee', 'app/views/bootstrap/jumbotron.coffee')
      this.copy(path + '/app/views/footer.coffee',              'app/views/footer.coffee')
      this.copy(path + '/app/views/header.coffee',              'app/views/header.coffee')
      this.copy(path + '/app/views/home/home-page.coffee',      'app/views/home/home-page.coffee')
      this.copy(path + '/app/views/site-view.coffee',           'app/views/site-view.coffee')

      break;
    }

    // Barebones
    default: {
      path = '../skeletons/barebones';

      this.template(path + '/_bower.json',                      'bower.json');
      this.copy(path + '/Gruntfile.coffee',                     'Gruntfile.coffee');
      this.copy(path + '/app/controllers/_home.coffee',         'app/controllers/home' + this.controllerSuffix + '.coffee')
      this.copy(path + '/app/styles/application.styl',          'app/styles/application.styl')
      this.copy(path + '/app/templates/header.hbs',             'app/templates/header.hbs')
      this.copy(path + '/app/templates/home.hbs',               'app/templates/home.hbs')
      this.copy(path + '/app/templates/site.hbs',               'app/templates/site.hbs')
      this.copy(path + '/app/views/site-view.coffee',           'app/views/site-view.coffee')
      this.copy(path + '/app/views/home/header-view.coffee',    'app/views/home/header-view.coffee')
      this.copy(path + '/app/views/home/home-page-view.coffee', 'app/views/home/home-page-view.coffee')
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
