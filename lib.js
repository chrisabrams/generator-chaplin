var _    = require('lodash'),
    fs   = require('fs'),
    exec = require('child_process').exec

module.exports = helpers = {

  capitalize: function(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);

  },

  creators: {

    nameAndPath: function(type) {

      var name     = helpers.slugify(this.name),
          pathType = type;

      if(type == 'collection') {
        pathType = 'model';
      }

      if(type == 'collectionview') {
        pathType = 'view';
      }

      if(this.path) {

        if(type == 'template') {
          this.copy('index.hbs', 'app/templates/' + this.path + '/' + name + '.hbs')
        }

        else {
          this.template('_' + type + '.coffee', 'app/' + pathType + 's/' + this.path + '/' + name + '.coffee');
        }

      }

      else {

        if(type == 'template') {
          this.copy('index.hbs', 'app/templates/' + name + '.hbs')
        }

        else {
          this.template('_' + type + '.coffee', 'app/' + pathType + 's/' + name + '.coffee');
        }

      }

    }

  },

  generators: {

    nameAndPath: function() {

      if(this.name.indexOf('/') > -1) {

        var s = this.name.lastIndexOf('/'),
            p = this.name.substring(0, s),
            n = this.name.split('/').pop()

        this.name = n;
        this.path = p;
      }

      else {
        this.path = null;
      }

    }
  },

  deleteCurrentFolder: function() {

    var currentFolder = process.cwd().split('/').pop()

    exec('rm -rf ' + process.cwd() + '/*')

  },

  slugify: function (str) {

    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return str;

  }

}
