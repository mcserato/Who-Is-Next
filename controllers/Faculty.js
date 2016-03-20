var db = require(__dirname + '/../lib/Mysql');

/* Shows the list of all faculty members */
exports.viewAll = function(req, res, next) {
	db.query("SELECT * FROM FACULTY", function (err, rows) {
        if (err) {
            return next(err);
        }
        
        res.send(rows);
	});
}

/* Shows the details of one faculty member */
exports.viewOne = function(req, res, next) {
	db.query("SELECT * FROM FACULTY WHERE emp_num = ?", [req.body.emp_num],
		function (err, rows) {
		    if (err) {
		        return next(err);
		    }
		    if (rows.length === 0) {
                res.send(404, "Error: Faculty not found!");
			} else {
			    res.send(rows);
			}
	});
}

/* Searches a faculty member */
exports.search = function(req, res, next) {
	db.query("SELECT * FROM FACULTY WHERE emp_num = ?", [req.body.emp_num],
		function (err, rows) {
		    if (err) {
		        return next(err);
		    }
		    if (rows.length === 0) {
                res.send(404, "Error: Faculty not found!");
			} else {
			    res.send(rows[0]);
			}
	});
}
