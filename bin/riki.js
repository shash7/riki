#! /usr/bin/env node

/* jslint undef: true */
/* global window, document, $ */

/* ----------------------------------------------------------------
 * riki.js
 * 
 * A command line based chat app made in nodejs
 * ---------------------------------------------------------------- */

(function() {
	
	'use strict';
	
	var parser = require('../lib/cmd-parser.js');
	var config = require('../config.js');
	var main   = require('../lib/main.js');
	
	var result = parser.parse(process.argv);
	
	var obj = {
		username : result['-username'] || null,
		password : result['-password'] || null,
		url      : result['-url']      || config.url
	};
	
	main.setup(obj);
	
})();