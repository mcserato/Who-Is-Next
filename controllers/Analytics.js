var db = require(__dirname + './../lib/Mysql');

/* Gets the top ten most called student in a specific class*/
exports.getTopTenMostCalledStudents = function (req, res, next) {
    db.query("SELECT * FROM CLASS_STUDENT, STUDENT WHERE " +
        "CLASS_STUDENT.class_id = ? and CLASS_STUDENT.student_number = " +
        "STUDENT.student_number ORDER BY CLASS_STUDENT.no_of_times_called " +
        "DESC LIMIT 10;",
        [req.params.class_id],
        function (err, rows) {
            if (err) {
                return next(err);
            }
            res.send(rows);
    });
}
