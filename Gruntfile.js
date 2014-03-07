module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jsbeautifier');

	grunt.initConfig({
		jshint: {
			files: [
				'Gruntfile.js',
				'pgspy.js',
				'src/**/*.js'
			]
		},
		jsbeautifier: {
			files: [
				'Gruntfile.js',
				'pgspy.js',
				'src/**/*.js'
			],
			options: {
				js: {
					indentWithTabs: true
				}
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'jsbeautifier']);
};
