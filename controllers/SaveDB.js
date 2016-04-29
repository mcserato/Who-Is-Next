var db = require(__dirname + './../lib/Mysql');

/* This functions views all students in a save file */
exports.view = function (req, res, next) {
	db.query("SELECT * FROM STUDENT s, CLASS_STUDENT cs, CLASS c, SAVEPOINT sp " +
		"WHERE s.student_number = cs.student_number AND " +
		"s.emp_num = cs.emp_num AND " +
		"c.class_id = cs.class_id AND c.class_id = ? AND s.emp_num = ? AND " +
		"sp.emp_num = cs.emp_num AND sp.class_id = cs.class_id AND " +
		"sp.save_id = ?",
		[req.params.class_id, req.session.emp_num, req.params.save_id],

		function (err, rows) {
			if(err) {
				return next(err);
			}

			res.send(rows);
		}
	);
}