module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'www-root'
                }
            }
        },
        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
                src: [
                    //'js/vendor/*.js',
                    'js/build/*.js'
                ],
                dest: 'js/deploy/production.js',
            }
        },
        
        jshint: {
            src: ['js/build/*.js']
        },

        uglify: {
            build: {
                src: 'js/deploy/production.js',
                dest: 'js/deploy/production.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        sass: {
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'css/build/main.css': 'scss/main.scss',       // 'destination': 'source'
                }

            }
        },

        cssmin: {
            /*combine: {
                files: {
                    'css/deploy/production.css': ['css/build/*.css']
                }
            },*/
            minify: {
                src: 'css/build/main.css',/*'css/deploy/production.css'*/
                dest: 'css/deploy/production.min.css'
            }
        },

        watch: {
            scripts: {
                files: ['js/build/*.js'],
                tasks: ['concat', 'jshint','uglify'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            },
            css: {
                files: ['scss/*/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            },

            html: {
                files: ['*.html'],
                options: {
                    livereload: true
                }
            }   
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'sass', 'cssmin', 'imagemin']);
};