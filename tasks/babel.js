'use strict';

var env = process.env.NODE_ENV || 'dev';

var fs = require("fs"),
		browserify = require("browserify"),
		babelify = require("babelify");

var args = process.argv.slice(2);

browserify(args[0], { debug: true })
  .transform(babelify)
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(fs.createWriteStream(args[1]));