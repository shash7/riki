
/* jslint undef: true, vars: true */
/* global window, document, $ */

/*
 * config.js
 * 
 * Configures express
 * Also provides global options
 * 
 */


/* ----------------------------------------------------------------
Dependencies
---------------------------------------------------------------- */
/*var twig           = require("twig");
var session        = require('cookie-session');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var session        = require('cookie-session');
var methodOverride = require('method-override');
var morgan         = require('morgan');
var multer         = require('multer');*/


/* ----------------------------------------------------------------
Options
---------------------------------------------------------------- */
var options = {
	uploadsFolder : './downloads',
	avatarFolder  : './avatars',
	cookieSecret  : 'gg',
	jwtSecret     : 'huzza'
};


/* ----------------------------------------------------------------
Express configuration
---------------------------------------------------------------- */
exports.setup = function(app, express) {
	app.disable('x-powered-by');
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.engine("html", twig.__express);
	app.use(cookieParser());
	app.use(session({
		key : 'app',
		secret : options.cookieSecret,
		cookie : {maxAge : 1920000}
	}));
	app.use(bodyParser({ keepExtensions: true, uploadDir: "uploads" }));
	app.use(multer({
		dest: './uploads/',
		rename : function(fieldName, fileName) {
			return fileName;
		}
	}));
	//app.use(express.router);
	app.use(morgan({ immediate: true, format: 'dev' }));
	app.use(methodOverride());
	app.use('/group', express.static('./public'));
	app.use(express.static('./public'));
};

exports.options = options;
