'use strict';

var env = process.env.NODE_ENV || 'dev';

var fs = require("fs"),
		postcss = require("postcss"),
		cssnano = require("cssnano"),
		cssnext = require("cssnext"),
		clc = require('cli-color');

var args = process.argv.slice(2);

var input = fs.readFileSync(args[0], "utf8")
console.log('open file > ' + clc.white.underline(args[1]))

postcss([cssnano()])
  .use(cssnext())
  .process(input, {
		from: args[0],
		to: args[1],
		map: { inline: false },
	})
  .then(function (result) {
  	console.log(clc.green('write file > ') + clc.white.underline(args[1]))
  	fs.writeFileSync(args[1], result.css);
  	console.log(clc.green('write file > ') + clc.white.underline(args[1] + '.map'))
    fs.writeFileSync(args[1] + '.map', result.map);
  });