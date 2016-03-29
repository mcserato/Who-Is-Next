var db = require(__dirname + './../lib/Mysql');
var cli_color = require('cli-color');

var SUCCESS = cli_color.green,
	ERROR = cli_color.red,
	WARNING = cli_color.yellow;

exports.attempt = function (username, action, ip_address) {
	username = username || '<GUEST>';

	var message = username + ' attempts to ' + action;

	return console.log(message + ' at ' + ip_address);
}

exports.success = function (username, action, ip_address) {
	username = username || '<GUEST>';

	var message =  SUCCESS(username + ' successfully ' + action);

	db.query('INSERT INTO LOG(username, action, status, ip_address) VALUES(?, ?, \'SUCCESS\', ?);',
			[username, action, ip_address],
			callback);

	function callback(err, result) {
		if (err) {
			console.log(ERROR('ERROR in writing to LOG while SUCCESS!'));
			return err;
		}

		return console.log(message + ' at ' + ip_address);
	}

}

exports.error = function (username, action, error_code, ip_address) {
	username = username || '<GUEST>';

	var message =  ERROR(username + ' failed to ' + action + ' [' + error_code + ']');

	db.query('INSERT INTO LOG(username, action, status, ip_address) VALUES(?, ?, \'FAILED\', ?);',
			[username, action, ip_address],
			callback);

	function callback(err, result) {
		if (err) {
			console.log(ERROR('ERROR in writing to LOG while ERROR!'));
			return err;
		}

		return console.log(message + ' at ' + ip_address);
	}
}