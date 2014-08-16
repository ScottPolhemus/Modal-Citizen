var loadTasks = require('load-grunt-tasks'),
	path = require('path'),
	loremIpsum = require('lorem-ipsum');

module.exports = function(grunt) {

	loadTasks(grunt);

	grunt.initConfig({
		less: {
			main: {
				options: {
					sourceMap: true,
					sourceMapFilename: 'styles/main.css.map',
					sourceMapBasepath: 'styles'
				},
				src: 'styles/less/main.less',
				dest: 'styles/main.css'
			}
		},

		autoprefixer: {
			main: {
				options: {
					map: true
				},
				src: 'styles/main.css',
				dest: 'styles/main.css'
			}
		},

		browserifyBower: {
			options: {
				forceResolve: {
					'mixitup': 'src/jquery.mixitup.js'
				},
				shim: {
					'mixitup': {
						depends: {
							jquery: 'jQuery'
						}
					},
					'stellar': {
						depends: {
							jquery: 'jQuery'
						}
					}
				}
			},
			main: {
				options: {
					file: 'scripts/lib.js'
				}
			}
		},

		browserify: {
			options: {
				preBundleCB: function(b) {
					b.plugin('minifyify', {
						map: 'main.min.js.map',
						output: 'scripts/main.min.js.map',
						compressPath: function(p) {
							return path.relative(path.join(__dirname, 'scripts'), p);
						}
					});
				}
			},
			main: {
				files: {
					'scripts/main.min.js': ['scripts/src/**/*.js']
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			less: {
				options: {
					livereload: false
				},
				files: ['styles/less/**/*.less'],
				tasks: ['less']
			},
			css: {
				options: {
					spawn: false
				},
				files: ['styles/*.css'],
				tasks: ['autoprefixer']
			},
			js: {
				files: ['scripts/src/**/*.js'],
				tasks: ['browserifyBower:main:nowrite', 'browserify']
			},
			html: {
				files: ['*.html']
			}
		}
	});

	grunt.registerTask('lipsum', 'Generate some Barrel-y lorem ipsum text.', function() {
		var barrelIpsum = loremIpsum({
			units: 'paragraphs',
			count: 5,
			words: grunt.file.readJSON('words.json')
		});

		grunt.log.write(barrelIpsum);
	});

	grunt.registerTask('build', [
		'browserifyBower',
		'browserify',
		'less',
		'autoprefixer'
	]);

	grunt.registerTask('default', ['build', 'watch']);

};