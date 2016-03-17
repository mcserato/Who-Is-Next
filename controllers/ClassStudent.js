var db = require(__dirname + './../lib/Mysql');


/* Adds a student to a class */
exports.add = function (req, res, next) {
	db.query("INSERT INTO CLASS_STUDENT VALUES (?, ?, ?)",
        [req.body.class_id, req.body.student_number, req.body.no_of_times_called],
        function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
	});
}
