var mysql = require('mysql');

module.exports = mysql.createConnection({
	host: 'localhost',
	user: 'Teletubbies',
	password: 'ab1l',
	database: 'WHOISNEXT'
});
