
/* jslint undef: true */
/* global window, document, $ */

/* ----------------------------------------------------------------
 * cmd-parser.js
 * 
 * Parses command line arguments
 * ---------------------------------------------------------------- */

(function() {
	
	'use strict';
	
	var reg = /^-/;
	
	function containsHyphen(str) {
		if(reg.exec(str)) {
			return true;
		} else {
			return false;
		}
	}
	
	exports.parse = function(argv) {
		
		var arr = argv.slice(2);
		var obj = {};
		
		for(var len = arr.length, i = 0; i < len; i++) {
			
			if(containsHyphen(arr[i])) {
				if(containsHyphen(arr[i + 1])) {
					obj[arr[i]] = true;
				} else {
					if(arr[i + 1]) {
						obj[arr[i]] = arr[i + 1];
					} else {
						obj[arr[i]] = true;
					}
				}
			}
			
		}
		
		return obj;
	};
	
})();