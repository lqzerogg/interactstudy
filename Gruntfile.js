module.exports = function(grunt) {      // Project configuration.

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-requirejs');



    grunt.initConfig({       
        //Read the package.json (optional)
        pkg: grunt.file.readJSON('package.json'),

        // 变量       
        meta: {
            basePath: "./", 
            sassPath: "web/module/sass/", 
            cssPath: "web/public/css/",
            tplPath: "web/module/view/",
            pagePath: "web/view/",
            jsModPath: 'web/module/js/',
            jsPath: 'web/public/js/',
            pubPath: 'web/public',
            proCss: 'production/web/public/css/',
            proJs: 'production/web/public/js/',
            proPublic: 'production/web/public/',
            proPage: 'production/web/view/',
            proPath: 'production/',
        },          
        // banner
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
        // sass编译
        sass: {
            bootstrap: {
                files: { 
                    "<%= meta.cssPath %>lib/bootstrap.css": "<%= meta.sassPath %>lib/bootstrap/bootstrap.scss",
                    "<%= meta.cssPath %>lib/bootstrap-ie7.css": "<%= meta.sassPath %>lib/bootstrap/ie/bootstrap-ie7.css",
                }, 
                options: { 
                    sourcemap: "true",
                    trace: true,
                    loadPath: ["<%= meta.sassPath %>lib/bootstrap"]
                    ,style: 'compressed'
                }
            },
            // mutiple compile
            page: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.sassPath %>page/',
                    src: ['*.scss'],
                    dest: '<%= meta.cssPath %>',
                    ext: '.css',
                    loadPath: ["<%= meta.sassPath %>pagelet/"]
                }],

                options: { 
                    sourcemap: "true",
                    trace: true,
                    loadPath: ["<%= meta.sassPath %>pagelet/"]
                    ,style: 'compressed'
                }
            }
        },
        // html和js libary编译
        includes: {
            html: {
                cwd: '<%= meta.tplPath %>page',
                src: [ '*.html'],
                dest: '<%= meta.pagePath %>',
                options: {
                    flatten: true,
                    includePath: '<%= meta.tplPath %>pagelet/',
                    filenameSuffix: '.html',
                    includeRegexp: /^(\s*)\{{2}>\s+(\S+)\s*\}{2}$/,
                    banner: ''
                }
            },
            //js libary
            jsLib: {
                cwd: '<%= meta.jsModPath %>lib/',
                src: [ '*.js'],
                dest: '<%= meta.jsPath %>lib/',
                options: {
                    flatten: true,
                    filenameSuffix: '.js',
                    includeRegexp: /^(\s*)\{{2}>\s+(\S+)\s*\}{2}$/,
                    banner: ''
                }
            },
            //for ie fix
            htc: {
                cwd: '<%= meta.jsModPath %>lib/',
                src: [ '*.htc'],
                dest: '<%= meta.jsPath %>lib/',
                options: {
                    flatten: true,
                    filenameSuffix: '.htc',
                    includeRegexp: /^(\s*)\{{2}>\s+(\S+)\s*\}{2}$/,
                    banner: ''
                }
            },
            //js
            js: {
                cwd: '<%= meta.jsModPath %>page',
                src: [ '*.js'],
                dest: '<%= meta.jsPath %>',
                options: {
                    flatten: true,
                    filenameSuffix: '.js',
                    includePath: '<%= meta.jsModPath %>pagelet/',
                    includeRegexp: /^(\s*)\{{2}>\s+(\S+)\s*\}{2}$/,
                    banner: ''
                }
            }
        },

        uglify: {
            index: {
              options: {
                sourceMap: true,
                sourceMapName: '<%= meta.proJs %>index.map'
              },
              files: {
                '<%= meta.proJs %>index.js': ['<%= meta.jsPath %>index.js'],
                '<%= meta.proJs %>parameter.js': ['<%= meta.jsPath %>parameter.js']
              }
            },
            lib: {
              options: {
                sourceMap: true,
                sourceMapName: '<%= meta.proJs %>lib/lib.map'
              },
              files: {
                '<%= meta.proJs %>lib/bootstrap.js': ['<%= meta.jsPath %>lib/bootstrap.js'],
                '<%= meta.proJs %>lib/doT.js': ['<%= meta.jsPath %>lib/doT.js'],
                '<%= meta.proJs %>lib/jquery.js': ['<%= meta.jsPath %>lib/jquery.js'],
                '<%= meta.proJs %>lib/modernizr.js': ['<%= meta.jsPath %>lib/modernizr.js'],
                '<%= meta.proJs %>lib/require.js': ['<%= meta.jsPath %>lib/require.js'],
                '<%= meta.proJs %>lib/jquery.pack.js': ['<%= meta.jsPath %>lib/jquery.SuperSlide.js']
              }
            }
        },
        copy: {
          main: {
            files: [
                {expand: true, src: ['web/**/*', 'web/***/*'], dest: 'production/'}
                // {expand: true, src: ['<%= meta.jsPath %>lib/*'], dest: '<%= meta.proJs %>lib/'},
                // {expand: true, src: ['<%= meta.cssPath %>*'], dest: '<%= meta.proCss %>/'},
                // {expand: true, src: ['<%= meta.cssPath %>lib/*'], dest: '<%= meta.proCss %>lib/'},
                // {expand: true, src: ['<%= meta.pagePath %>*'], dest: '<%= meta.proPage %>/'},
                // {expand: true, src: ['<%= meta.pubPath %>img/*'], dest: '<%= meta.proPublic %>img/'},
                // {expand: true, src: ['<%= meta.pubPath %>fonts/*'], dest: '<%= meta.proPublic %>fonts/'}
                
            ]
            
          },
        },
        

        //requirejs
        // requirejs: {
        //   index: {

        //     options: {
        //       baseUrl: "<%= meta.jsModPath %>/",
        //       // mainConfigFile: "../index.js",
        //       name: "page/index", // assumes a production build using almond
        //       out: "<%= meta.jsPath %>index.js"
        //     }
        //   }
        // },

        // watch 更变
        watch: { 
            css: {  
                files: [ 
                    "<%= meta.sassPath %>*.scss",
                    "<%= meta.sassPath %>*/*.scss",
                    "<%= meta.sassPath %>*/*/*.css" 
                ],
                tasks: ["sass"]
            },
            html: {
                files: [
                    "<%= meta.tplPath %>*.html",
                    "<%= meta.tplPath %>*/*.html"
                ],
                tasks: ["includes"]
            },
            js: {
                files: [
                    "<%= meta.jsModPath %>*/*.js",
                    "<%= meta.jsModPath %>*/*.htc"
                ],
                tasks: ["includes"]
            }
        }     
    });        

}
