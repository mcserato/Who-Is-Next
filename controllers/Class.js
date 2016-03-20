var db = require(__dirname + '/../lib/Mysql');

/* Shows the details of all classes */
exports.viewAll = function(req, res, next) {
    db.query("SELECT * FROM CLASS", function (err, rows) {
		if (err) {
		    return next(err);
		}
		
		if (rows.length === 0) {
		    res.send(404, "Error: Classes were not found.");
		} else {
			res.send(rows);
		}
    });
}

/* Shows the details of a class */
exports.viewOne = function(req, res, next) {
    db.query("SELECT * FROM CLASS WHERE class_id = ?", [req.body.class_id],
        function (err, rows) {
		    if (err) {
		        return next(err);
		    }
		
		    if (rows.length === 0) {
		        res.send(404, "Error: Class not found.");
		    } else {
			    res.send(rows);
		    }
    });
}

/* Searches a class */
exports.search = function(req, res, next) {
    db.query("SELECT * FROM CLASS WHERE class_id = ?", [req.body.class_id],
        function (err, rows) {
			if (err) {
				return next(err);
			}
		
			if (rows.length === 0) {
				res.send(404, "Error: Class not found.");
			} else {
				res.send(rows[0]);
			}
	});
}
