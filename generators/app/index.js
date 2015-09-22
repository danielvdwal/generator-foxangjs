'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.generators.Base.apply(this, arguments);
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the praiseworthy ' + chalk.red('foxangjs') + ' generator! ' +
      'With this generator you will be able to scaffold a Firefox OS App with AngularJS.'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What do you want to call your app',
      default: this.appname // Default to current folder name
    }, {
      type: 'input',
      name: 'appVersion',
      message: 'What is the current version of your app',
      default: '0.1.0'
    }, {
      type: 'input',
      name: 'appDeveloper',
      message: 'Who is the app developer',
      default: 'John Doe'
    }];

    this.prompt(prompts, function (answers) {
      this.appName = answers.appName;
      this.appVersion = answers.appVersion;
      this.appDeveloper = answers.appDeveloper;
  
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('app/icons'),
        this.destinationPath('app/icons')
      );

      this.fs.copy(
        this.templatePath('app/styles'),
        this.destinationPath('app/styles')
      );

      this.fs.copy(
        this.templatePath('app/views'),
        this.destinationPath('app/views')
      );

      this.fs.copyTpl(
        this.templatePath('app/scripts/_app.js'),
        this.destinationPath('app/scripts/app.js'),
        {
          appName: this.appName
        }
      );
      this.fs.copy(
        this.templatePath('app/scripts/controllers'),
        this.destinationPath('app/scripts/controllers')
      );

      this.fs.copyTpl(
        this.templatePath('app/_manifest.webapp'),
        this.destinationPath('app/manifest.webapp'),
        {
          appName: this.appName,
          appVersion: this.appVersion,
          appDeveloper: this.appDeveloper
        }
      );
      this.fs.copyTpl(
        this.templatePath('app/_index.html'),
        this.destinationPath('app/index.html'),
        {
          appName: this.appName
        }
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('.bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('.jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('.travis.yml'),
        this.destinationPath('.travis.yml')
      );

      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
          appName: this.appName,
          appVersion: this.appVersion
        }
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          appName: this.appName,
          appVersion: this.appVersion
        }
      );
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      callback: function () {
        this.spawnCommand('grunt', ['default']);
      }.bind(this) // bind the callback to the parent scope
    });
  }
});
