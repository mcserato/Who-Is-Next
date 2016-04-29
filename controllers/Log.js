'use strict;'

var db = require(__dirname + './../lib/Mysql');
var cli_color = require('cli-color');

var SUCCESS = cli_color.green,
	ERROR = cli_color.red,
	WARNING = cli_color.yellow;

exports.read = function (req, res, next) {
	if (!req.session) {
		res.status(401).send("No one is logged in");
	}

	if (req.session.role === "ADMIN") {
		db.query("SELECT * FROM LOG ORDER BY log_number DESC", [], callback);

		function callback(error, result) {
			if (error) return next(error);

			
			return res.send(result);
		}
	}
}

exports.write = function (req, status, message) {
	var color = cli_color.white;
	var username;

	if (req.session) {
		username = req.session.username || "<GUEST>";
	}

	else {
		username = "<GUEST>";
	}

	if (status === 'SUCCESS') {
		color = SUCCESS;
	}

	else if (status === 'FAILED') {
		color = ERROR;
	}

	else if (status === 'WARNING') {
		color = WARNING;
	}
	
	else {
	    return console.error(status, 'is not a valid status');
	}

	console.log(color(new Date(), req.ip, username, req.method, req.originalUrl, message));
	db.query('INSERT INTO LOG(ip_address, username, method, url, message, status) VALUES (?, ?, ?, ?, ?, ?)',
        [req.ip, username, req.method, req.originalUrl, message, status],
        callback);
    
    function callback(error, result) {
	    if (error) {
		    console.log(error)
		    return console.log('[X] NOT LOGGED');
	    }

	    return console.log('[!] LOGGED');
    }
}

exports.save = function (filters, volunteers) {
	for (var i in volunteers) {
		console.log(volunteers[i].first_name, volunteers[i].last_name);
	}

}
