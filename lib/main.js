
/* jslint undef: true */
/* global window, document, $ */

/* ----------------------------------------------------------------
 * main.js
 * 
 * Sets up riki for the user
 * ---------------------------------------------------------------- */

(function() {
	
	'use strict';
	
	var auth     = require('./auth.js');
	var socket   = require('./socket.js');
	var template = require('./text.js');
	var cliff    = require('cliff');
	var prompt   = require('prompt');
	var clr      = require('cli-color');

	var positive = clr.xterm(34);
	var negative = clr.xterm(160);
	var loading  = clr.xterm(105);
	
	var debug = true;
	var username = '';
	
	function log(text) {
		if(debug) {
			console.log(text);
		}
	}
	
	function connect(net, PORT, HOST) {
		prompt.get(['username'], function(err, result) {
			
			username = result.username;
			
			log('Welcome to riki');
			log('Your username is ' + result.username);
			
			net.connect(PORT, HOST, function() {
				process.stdin.resume();
				process.stdin.setEncoding('utf8');

				process.stdin.on('data', function (chunk) {
					process.stdout.write('data: ' + chunk);
					net.write(chunk);
				});
			});
			
			net.on('data', function(data) {
				data = JSON.parse(data);
				console.log(data);
				var rows = [
					[username,
					 ' ',
					 data.time,
					 ' | ',
					 data.message
					]
				];
				console.log(cliff.stringifyRows(rows, ['blue', 'blue', 'blue', 'blue', 'green']));
			});
		});
	}

	exports.setup = function(opts) {
		
		var net = require('net').Socket();

		var HOST = '127.0.0.1';
		var PORT = 6969;
		
		prompt.start();
		
		if(opts.username && opts.password) {
			// Auth
			auth.authorizeAccount(opts);
		} else {
			connect(net, PORT, HOST);
		}

	};
	
})();