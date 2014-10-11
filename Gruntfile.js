'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            main: {
                options: {
                    hostname : '127.0.0.1',
                    port: 9400,
                    open : true
                }
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: ['ngJsTree.js','dist/**/*','demo/**/*'],
                tasks: ['jshint','test']
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'ngJsTree.js'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        copy: {
            main: {
                files: [
                    {src:'ngJsTree.js',dest:'dist/'}
                ]
            }
        },
        uglify: {
            main: {
                files: [
                    {src:'ngJsTree.js',dest:'dist/ngJsTree.min.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint','test']);
    grunt.registerTask('serve', ['jshint','connect', 'watch']);
    grunt.registerTask('build',['uglify','copy']);
    grunt.registerTask('test',['build','karma']);
};