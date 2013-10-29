_ = require('lodash');

module.exports = helpers = {

  capitalize: function(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);

  },

  creators: {

    nameAndPath: function(type) {

      var name = helpers.slugify(this.name);

      if(this.path) {
        this.template('_' + type + '.coffee', 'app/' + type + 's/' + this.path + '/' + name + '.coffee');
      }

      else {
        this.template('_' + type + '.coffee', 'app/' + type + 's/' + name + '.coffee');
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

  slugify: function (string) {

    return string
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-')
      ;

  }

}
