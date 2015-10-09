'use strict';

var env = process.env.NODE_ENV || 'dev';

var Imagemin = require('imagemin'),
		clc = require('cli-color');
 
var args = process.argv.slice(2);

console.log('open files > ' + clc.white.underline(args[0] + '*.{gif,jpg,png,svg}'))

new Imagemin()
    .src(args[0] + '*.{gif,jpg,png,svg}')
    .dest(args[1])
    .use(Imagemin.jpegtran({progressive: true}))
    .use(Imagemin.gifsicle({interlaced: true}))
    .use(Imagemin.optipng({optimizationLevel: 3}))
    .use(Imagemin.svgo())
    .run(function (err, files) {
    	if (err) {
				throw err;
			}else {
    		console.log(clc.green('No error result'));
    		for (var i = files.length - 1; i >= 0; i--) {
    			console.log('write ' + clc.white.underline(files[i].path));
    		};
    		
			}
    });