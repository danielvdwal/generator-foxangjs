'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    ffdebug: 'firefox_debug',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep:ffdebug']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all', 'newer:copy:ffdebug']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/**/*.css'],
        tasks: ['newer:copy:ffdebug']
      },
      html: {
        files: ['<%= yeoman.app %>/**/*.html'],
        tasks: ['newer:copy:ffdebug', 'wiredep:ffdebug']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/**/*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/**/*',
            '!<%= yeoman.dist %>/.git/**/*'
          ]
        }]
      },
      ffdebug: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.ffdebug %>/**/*',
            '!<%= yeoman.ffdebug %>/.git/**/*'
          ]
        }]
      },
      tmp: '.tmp'
    },

    // Automatically inject Bower components into the app
    wiredep: {
      ffdebug: {
        src: ['<%= yeoman.ffdebug %>/index.html'],
        ignorePath: /\.\.\/app\//
      },
      tmp: {
        src: ['.tmp/index.html'],
        ignorePath: /\.\.\/app\//
      },
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/**/*.js',
          '<%= yeoman.dist %>/styles/**/*.css',
          '<%= yeoman.dist %>/styles/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '.tmp/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['concat', 'cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/**/*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/styles/images',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/icons',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/icons'
        }, {
          expand: true,
          cwd: '<%= yeoman.dist %>/styles',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/styles'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/styles/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      ffdebug: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.ffdebug %>',
          src: [
            'bower_components/**/*',
            'icons/*.png',
            'scripts/**/*.js',
            'styles/**/*.css',
            '**/*.html',
            'manifest.webapp'
          ]
        }]
      },
      tmp: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: [
            'bower_components/**/*',
            'icons/*.png',
            'scripts/**/*.js',
            'styles/**/*.css',
            '**/*.html',
            'manifest.webapp'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: '<%= yeoman.dist %>',
          src: [
            'icons/*.png',
            'views/**/*.html',
            '*.html',
            'manifest.webapp'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp/concat',
          dest: '<%= yeoman.dist %>',
          src: [
            'scripts/*.js',
            'styles/*.css'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp/bower_components/building-blocks/style',
          dest: '<%= yeoman.dist %>/styles',
          src: [
            '*/images/**/*',
          ]
        }]
      },
    },
  });

  grunt.registerTask('firefox_debug', [
    'newer:jshint',
    'clean:ffdebug',
    'copy:ffdebug',
    'wiredep:ffdebug'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:tmp',
    'wiredep:tmp',
    'useminPrepare',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'imagemin:dist',
    'svgmin:dist',
    'filerev',
    'usemin',
    'htmlmin:dist'
  ]);

  grunt.registerTask('default', [
    'firefox_debug',
    'watch'
  ]);
};
