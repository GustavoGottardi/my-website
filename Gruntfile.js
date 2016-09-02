module.exports = function(grunt) {

  // Project configuration.
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      jshint: {
         build: ['Gruntfile.js', './app/assets/scripts/main.js','./app/assets/scripts/init.js','./app/assets/scripts/router.js'],
         options: {
            "curly": true,
            "eqeqeq": true,
            "undef": true,
            "unused": "vars",
            "esnext":true,
            "devel":true,
            "node":true,
            "noyield":true
         }
      },

      browserify: {
         development: {
            src: ["./app/assets/scripts/main.js"],
            dest: './app/assets/scripts/main.min.js',
            options: {
               browserifyOptions: { debug: true },
               transform: [["babelify", { "presets": ["es2015"] }]]
            }
         }
      },

      uglify: {
         my_target: {
            files: {
               './dist/assets/scripts/main.min.js': ['./app/assets/scripts/main.min.js']
            }
         }
      },

       // Compiles Sass to CSS and generates necessary files if requested
      compass: {
         build: {
            options: {
               sassDir: './app/assets/styles/', //Get all SASS
               cssDir: './app/assets/css', //Dist finish CSS
               outputStyle:"compressed", //Compact CSS
               relativeAssets:true,
               raw: "preferred_syntax = :sass\n",
            }
         }
      },

      cssmin: {
         build: {
           files: {
             './dist/assets/css/main.min.css': ['./app/assets/css/main.css']
           }
         }
      },

       imagemin: {
         build: {
            options: {
               optimizationLevel: 3
            },
            files: [{
               expand: true,
               cwd: './app/assets/images/', //Optimization of images
               src: ['*.{png,jpg,gif,svg}'], //Get all extension
               dest: './dist/assets/images/' //Dist finish of optimization
            }]
         }
       },

       htmlmin: {                                     // Task
         build: {                                      // Target
           options: {                                 // Target options
             removeComments: true,
             collapseWhitespace: true
           },
           files: {                                       // Dictionary of files - 'destination': 'source'
             './dist/views/index.html': './app/views/index.html'
           }
         }
       },

       copy: {
         images: {
           expand: true,
           cwd: './app/assets/images/',
           src:['*.{png,jpg,gif}'],
           dest:'./dist/assets/images/'
         },
         fonts: {
           expand: true,
           cwd: './app/assets/fonts/',
           src:['**/*'],
           dest:'./dist/assets/fonts/'
         }
       },

       watch: {
         sass: {
           files: ['./app/assets/**/*.scss'], //View all files SASS
           tasks: ['compass','cssmin'],
         },
         js: {
           files: ['./app/assets/**/*.js'], //View all files JS
           tasks: ['browserify','uglify','jshint'],
         },    
         html: {
           files: ['./app/views/*.html'],
           tasks: ['htmlmin'],
         },
         images: {
           files: ['./app/assets/images/*'],
           tasks: ['sprites','imagemin'],
         },
         copy: {
             files: ['./app/assets/**/*'],
             tasks: ['copy'],
         },
         options: {
           livereload: true,
         },
       }


   });

   // Load all plugins tasks for grunt.
   // grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-compass');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-imagemin');
   grunt.loadNpmTasks('grunt-contrib-htmlmin');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-watch');


   // Default task(s).
   grunt.registerTask('default', ['watch']);
   grunt.registerTask('build', ['browserify','uglify','jshint','compass','cssmin','imagemin','htmlmin','copy']);

};