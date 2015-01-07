module.exports = function(grunt) {
  var _serve            = grunt.option('serve') || false;
  var _devTasks         = ['stylus', 'concurrent'];
  var _concurrentTasks  = ['watch']
  var _watcherTasks     = {
    styles              : ['stylus']
  }

  if(_serve){ _concurrentTasks.push('connect') }

  grunt.initConfig({
    pkg             : grunt.file.readJSON('package.json'),

    concurrent      : {
      target        : {
        tasks       : _concurrentTasks,
        options     : {
          logConcurrentOutput : true
        }
      }
    },

    connect         : {
      server        : {
        options     : {
          port      : 1992,
          base      : './dist/',
          keepalive : true
        }
      }
    },

    stylus : {
      app : {
        files : {
          './dist/main.css' : './styles/main.styl'
        }
      }
    },

    watch           : {
      styles        : {
        files       : ['./styles/**/*'],
        tasks       : _watcherTasks.styles
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('dev',   _devTasks);

}
