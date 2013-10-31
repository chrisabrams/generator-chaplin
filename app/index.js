'use strict';

var fs     = require('fs'),
    path   = require('path'),
    util   = require('util'),
    yeoman = require('yeoman-generator'),

    controllerGenerator = require('../controller/index'),
    modelGenerator      = require('../model/index'),
    viewGenerator       = require('../view/index');

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
      name: 'generateControllers',
      message: 'Generate controllers now? (Y/n)'
    },
    {
      name: 'generateModels',
      message: 'Generate models now? (Y/n)'
    },
    {
      name: 'generateViews',
      message: 'Generate views now? (Y/n)'
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

    this.generateControllers = ( props.generateControllers && props.generateControllers.toLowerCase() === 'y' );
    this.generateModels      = ( props.generateModels && props.generateModels.toLowerCase() === 'y' );
    this.generateViews       = ( props.generateViews && props.generateViews.toLowerCase() === 'y' );

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
  this.template('app/_initialize.coffee', 'app/initialize.coffee');
  this.copy('app/controllers/_home.coffee', 'app/controllers/home' + this.controllerSuffix + '.coffee')

  var _this = this;

  walk(__dirname + '/templates/app', function(err, files) {
    if (err) throw err;

    files.forEach(function(file) {

      // Ignore .DS_Store files as well as files that start with _.
      if((file.indexOf('.DS_Store') < 1) && (file.indexOf('_') < 1)) {

        file = file.replace(__dirname + '/templates/', '');

        _this.copy(file, file);
      }
    });

    cb();
  }.bind(this));

}

ChaplinGenerator.prototype.generateRequests = function(){
   var cb = this.async(),
      prompts = [];

    if( this.generateControllers ){
      prompts.push({
        name: 'controllerNames',
        message: 'Name your controllers ( Ex: users posts items/comments )'
      });
    }

    if( this.generateModels ){
      prompts.push({
        name: 'modelNames',
        message: 'Name your models ( Ex: user post items/comment )'
      });
    }

    if( this.generateViews ){
      prompts.push({
        name: 'viewNames',
        message: 'Name your views ( Ex: home cart items/comments )'
      });
    }

    // Run callback if there were no prompts added
    if( !prompts.length ){
      cb();
      return;
    }

    this.prompt( prompts, function( props ){
      var fileCount = 1,
        onFinished = function(){
          fileCount--;
          if( !fileCount ){
            cb();
          }
        },
        createFiles = function( name, args, appendStr ) {
          var appendName = appendStr || '';

          if( args && args.length ){
            var arr = args.split(' ');
            fileCount += arr.length;
            for( var cur = 0; cur < arr.length; cur ++){
              this.invoke('chaplin:'+name, { args: [ arr[cur]+ appendName ] }, onFinished );
            }
          }
        }.bind( this );

      createFiles( 'view', props.viewNames );
      createFiles( 'model', props.modelNames );
      createFiles( 'controller', props.controllerNames ); //Append -controller to all controllers

      // Run this first once in case no filenames were passed
      onFinished();

    }.bind(this));

};

ChaplinGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
