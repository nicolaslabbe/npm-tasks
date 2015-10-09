'use strict';

var env = process.env.NODE_ENV || 'dev';

var fs = require("fs"),
		spritesmith = require('spritesmith'),
		read = require('fs-readdir-recursive');

var args = process.argv.slice(2);
var dir = __dirname.replace('/tasks', '') + args[0];
var dest = __dirname.replace('/tasks', '') + args[1];
var algo = args[2] || 'top-down';

var sprites = read(dir);

for (var i = sprites.length - 1; i >= 0; i--) {
	sprites[i] = dir + sprites[i];
};

spritesmith({
  src: sprites,
  algorithm: algo
}, function handleResult (err, result) {
  // If there was an error, throw it 
  if (err) {
    throw err;
  }
 
  // Output the image 
  fs.writeFileSync(dest, result.image, 'binary');
  // result.coordinates, result.properties; // Coordinates and properties 
});