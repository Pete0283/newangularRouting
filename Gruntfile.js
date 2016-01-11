/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['dist/js/jquery/dist/*.**', 
              'dist/js/angular/*.js',
              'dist/js/angular-ui-router/release/*.**',
              'dist/js/*.js/',
              'dist/js/services/*.**',
              'dist/js/controllers/*.**'],

        dest: 'js/concat.js'
      },
      css: {
        src: ['dist/css/app.css'],
        dest: 'dist/css/concat.css'
      }
    },
    uglify: {
      options: {
          stripBanners: true
      },
      dist: {
        src: ['dist/js/concat.js'],
        dest: 'dist/js/main.min.js'
      }
    },
    cssmin: {
      options: {
          stripBanners: true
      },
      dist: {
        src: ['dist/css/concat.css'],
        dest: 'dist/css/main.min.css'
      }
    },

    clean: {
      js: ["dist/js/*", "!dist/js/concat.js"],
      css: ["dist/css/*", "!dist/css/*.min.css"]
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          angular: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src_js: {
        src: ['js/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    copy: {
      main: {
      files: [
          {expand: true, 
            cwd: 'js/', 
            src: ['controllers/*.**', 'services/*.**', '*.js'], 
            dest: 'dist/js', 
            filter: 'isFile'},

          {expand: true, 
            cwd: 'bower_components/',
            src: ['angular/angular.js', 'jquery/dist/jquery.js', 'angular-ui-router/release/*.js'],
            dest: 'dist/js',
            filter: 'isFile'},

          {expand: true,
            src: ['data/*.json'],
            dest: 'dist'
          },
          {expand: true, 
            src: ['index.html'], 
            dest: 'dist'},

          {expand: true, 
            src: ['templates/*.**'], 
            dest: 'dist'},

          {expand: true, 
            src: ['css/*.**'], 
            dest: 'dist'}
        ],
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'copy', 'concat', 'uglify', 'cssmin', 'clean']);

};
