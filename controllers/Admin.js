var db = require(__dirname + './../lib/Mysql');

//validate user
/**
 * INPUTS: username
 * OUTPUTS: returns a validated user(is_validated = true) with given username
 *
 */
 
exports.validate = function (req, res, next) {
	var username = req.body.username;

	db.query("UPDATE FACULTY SET is_validated = true where	username = '"+username+"'", function (err, rows) {
		if(err) return(err);
	});
}
