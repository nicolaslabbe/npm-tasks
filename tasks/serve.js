'use strict';

var env = process.env.NODE_ENV || 'dev';

var nodestatic = require('node-static'),
		clc = require('cli-color');

var args = process.argv.slice(2);
var file = new nodestatic.Server(args[0]);

console.error(clc.green("serve file " + args[0] + " at http://localhost:" + args[1]));
require('http').createServer(function (request, response) {
    file.serve(request, response, function (err, res) {
      if (err) { // An error as occured
        console.error(clc.red.bold("Error serving ") + clc.white.underline(request.url) + " - " + err.message);
        response.writeHead(err.status, err.headers);
        response.end();
      } else { // The file was served successfully
         console.log("serve asset " + clc.white.underline(request.url) + " - " + res.message);
      }
    });
}).listen(args[1]);