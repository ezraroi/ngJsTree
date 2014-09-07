'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            main: {
                options: {
                    port: 9400
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
                files: ['nodeJsTree.js','dist/**/*','demo/**/*'],
                tasks: ['jshint','build']
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
        jasmine: {
            unit: {
                src: ['./bower_components/jquery/dist/jquery.js','./bower_components/angular/angular.js','./bower_components/angular-animate/angular-animate.js','./bower_components/angular-mocks/angular-mocks.js','./dist/angular-busy.js','./demo/demo.js'],
                options: {
                    specs: 'test/*.js'
                }
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

    grunt.registerTask('serve', ['jshint','connect', 'watch']);
    grunt.registerTask('build',['uglify']);
    grunt.registerTask('test',['build','jasmine']);
};