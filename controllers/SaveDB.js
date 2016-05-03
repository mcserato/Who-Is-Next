var db = require(__dirname + './../lib/Mysql');
var logs = require(__dirname + '/Log').write;

exports.viewAll = function (req, res, next) {
	if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("SELECT * FROM SAVEPOINT s WHERE s.emp_num like ?",
		[req.session.emp_num],
		function (err, rows) {
			if(err) {
				return next(err);
			}
			res.send(rows);
		}
	);
}

exports.viewOne = function (req, res, next) {
	if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("SELECT * FROM SAVE_STUDENT ss, STUDENT st WHERE st.emp_num = ? AND " +
		"ss.student_number = st.student_number AND ss.save_id = ?",
		[req.session.emp_num, req.params.save_id],
		function (err, rows) {
			if(err) {
				return next(err);
			}
			res.send(rows);
		}
	);
}

exports.rename = function (req, res, next) {
	if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("UPDATE SAVEPOINT SET save_name = ? WHERE save_id like ?",
		[req.body.save_name, req.body.save_id],

		function (err, rows) {
			if (err) {
				return next(err);
			}
			res.send(rows);
		}
	);
}

exports.remove = function (req, res, next) {
	if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("DELETE FROM SAVEPOINT WHERE save_id = ? AND " +
		"class_id = ? AND emp_num = ?",
		[req.body.save_id, req.body.class_id, req.session.emp_num],

		function (err, rows) {
			if (err) {
				return next(err);
			}
			res.send(rows);
		}
	);
}

/* This function adds an empty save point with no volunteers selected yet*/
exports.save = function (req, res, next) {
	db.query("INSERT INTO SAVEPOINT VALUES(DEFAULT, ?, ?, ?)",
		[req.body.save_name, req.session.emp_num, req.body.class_id],

		function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
        }
	);
}

/* This function adds a student to a save point */
exports.savestudent = function (req, res, next) {
	db.query("INSERT INTO SAVE_STUDENT VALUES(LAST_INSERT_ID(), ?)",
		[req.body.student_number],

		function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
        }
    );
}

/*------------------*/


/* This function searches for a certain save point */
exports.find = function (req, res, next) {
	db.query("SELECT * FROM SAVEPOINT WHERE save_name = ? AND " +
		"class_id = ? AND emp_num = ?",
		[req.body.save_name, req.body.class_id, req.session.emp_num],

		function (err, rows) {
			if(err){
				return next(err);
			}
			res.send(rows);
		}
	);
}
