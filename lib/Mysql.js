var mysql = require('mysql');

module.exports = mysql.createConnection({
	host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'Teletubbies',
    password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD ||  'ab1l',
    database: 'whoisnext' || 'WHOISNEXT'
});
