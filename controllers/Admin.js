var db = require(__dirname + './../lib/Mysql');

/* Validates the registration of a user */
exports.validate = function (req, res, next) {
	db.query("UPDATE FACULTY SET is_validated = true where emp_num = ?", 
	    [req.body.emp_num], function (err, rows) {
		    if(err) {
		        return next(err);
		    }
		    
		    res.send(rows);
	});
}
