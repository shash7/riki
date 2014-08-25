
/* jslint undef: true */
/* global window, document, $ */

/* ----------------------------------------------------------------
 * socket.js
 * 
 * Handles socket connection
 * ---------------------------------------------------------------- */

(function() {
	
	'use strict';
	
	var net = require('net');
	
	exports.start = function(opts) {
	
		var HOST = opts.url  || '127.0.0.1';
		var PORT = opts.port || 8080;

		var client = new net.Socket();
		
		client.connect(PORT, HOST, function() {
			setInterval(function() {
				console.log('gg');
			}, 1000);
			prompt.get(['username', 'email'], function (err, result) {
				client.write(result.username);
			});

		});
		
		return {
			client  : client,
			connect : client.connect,
			on      : client.on
		};
	}

})();