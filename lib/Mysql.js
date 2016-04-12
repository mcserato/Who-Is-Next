var mysql = require('mysql');

module.exports = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'cmsc127',
	database: 'WHOISNEXT'
});
