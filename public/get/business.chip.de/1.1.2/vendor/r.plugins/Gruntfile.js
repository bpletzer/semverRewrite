module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		bower: {
			install: {
				//just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
			}
		},

		copy: {
			dist: {
				files: {
					'dist/': 'src/**'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('FEA-grunt-tag');

	grunt.registerTask('install', ['bower']);
	grunt.registerTask('build', ['copy']);
	grunt.registerTask('tag', ['FEA-grunt-tag', 'build']);

};
