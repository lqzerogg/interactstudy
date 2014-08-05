module.exports = function(grunt) {      // Project configuration.

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-includes');    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('default', ['sass', 'includes', 'copy:jsLib', 'copy:production', 'uglify']);



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
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
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
                    // banner: '/*! compiling bootstrap-ie7otstrap and bootstrap-ie7 */',
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
                    ext: '.css'                    
                }],
                options: {
                    loadPath: ["<%= meta.sassPath %>pagelet/"],
                    sourcemap: "true",
                    trace: true,
                    style: 'compressed'
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
                    // banner: '/*! compiling html of every page */',
                    includePath: '<%= meta.tplPath %>pagelet/',
                    filenameSuffix: '.html',
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

        //压缩文件
        uglify: {
            compress: {
                files: [{
                    expand:true,
                    cwd:'<%= meta.jsPath %>',//js目录下
                    src:'**/*.js',//所有js文件
                    dest: '<%= meta.proJs %>'//输出到此目录下
                }]
            }
        },
        //copy文件
        copy: {
            // copy到production
          production: {
            files: [
                {
                    expand: true, 
                    src: ['web/**/*', 'web/***/*'], 
                    dest: 'production/'
                }               
            ]            
          },
          //copy jsLibary到static中
          jsLib: {
            files: [
                {   
                    cwd:'<%= meta.jsModPath %>',//js目录下
                    src: ['lib/**/*.js'],
                    dest: '<%= meta.jsPath %>/',
                    expand: true
                }
            ]
          }
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
                    "<%= meta.sassPath %>**/*.scss"
                ],
                tasks: ["sass"]
            },
            html: {
                files: [
                    "<%= meta.tplPath %>**/*.html"
                ],
                tasks: ["includes"]
            },
            js: {
                files: [
                    "<%= meta.jsModPath %>**/*.js"
                ],
                tasks: ["includes"]
            }
        }     
    });        

}
