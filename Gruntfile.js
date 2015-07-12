'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-karma-coveralls');

    grunt.initConfig({
        connect: {
            options: {
                hostname : '127.0.0.1',
                port: 9400,
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true
                }
            }
        },
        watch: {
            options: {
                livereload: 35729,
                livereloadOnError: false,
                spawn: false
            },
            main :{
                files: ['ngJsTree.js','demo/**/*','test/*.js'],
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
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app : {
                files : {
                    'dist/ngJsTree.js' : ['dist/ngJsTree.js']
                }
            }
        },
        uglify: {
            main: {
                files: [
                    {src:'dist/ngJsTree.js',dest:'dist/ngJsTree.min.js'}
                ]
            }
        },

        wiredep: {
            test: {
                src: 'karma.conf.js',
                fileTypes: {
                    js: {
                        block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                },
                devDependencies: true
            }
        },

        coveralls: {
            options: {
                debug: true,
                coverageDir: 'coverage',
                dryRun: false,
                force: true,
                recursive: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('serve',['connect:livereload','watch']);
    grunt.registerTask('default',['jshint','test']);
    grunt.registerTask('build',['copy','ngAnnotate','uglify']);
    grunt.registerTask('test',['build','karma','coveralls']);
};