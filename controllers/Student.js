var db = require(__dirname + '/../lib/Mysql');

/* Shows a list of all students */
exports.viewAll = function(req, res, next) {
	db.query("SELECT * FROM STUDENT", function (err, rows) {
        if (err) {
            return next(err);
        }
        
        res.send(rows);
	});
}

/* Shows the details of a student */
exports.viewOne = function(req, res, next) {
	db.query("SELECT * FROM STUDENT WHERE student_number = ?",
		[req.body.student_number], function (err, rows) {
        if (err) {
            return next(err);
        }
        
        if (rows.length === 0) {
            res.send(404, "Error: Student not found!");
	    } else {
            res.send(rows);
	    }
	});
}

/* Searches a student */
exports.search = function(req, res, next) {
	db.query("SELECT * FROM STUDENT WHERE student_number = ?",
			[req.body.student_number], function (err, rows) {
        if (err) {
            return next(err);
        }
        
        if (rows.length === 0) {
            res.send(404, "Error: Student not found!");
	    } else {
            res.send(rows[0]);
	    }
	});
}
