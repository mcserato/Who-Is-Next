var db = require(__dirname + './../lib/Mysql');

/* Gets the top ten most called student in a specific class */
exports.getTopTenMostCalledStudents = function (req, res, next) {
    db.query("SELECT * FROM CLASS_STUDENT, STUDENT WHERE " +
        "CLASS_STUDENT.class_id = ? and CLASS_STUDENT.student_number = " +
        "STUDENT.student_number ORDER BY CLASS_STUDENT.no_of_times_called " +
        "DESC LIMIT 10",
        [req.params.class_id],
        
        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}

/* Gets the top ten most called males in a given class */
exports.getTopTenMostCalledMales = function (req, res, next) {
    db.query("SELECT * FROM CLASS_STUDENT,STUDENT where gender = " +
        "'M' and CLASS_STUDENT.student_number = STUDENT.student_number and "+
        "class_id  = ? order by no_of_times_called desc limit 10;",
        [req.params.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}

/* Gets the gender frequency in a specific class */
exports.getGenderFrequency = function (req, res, next) {
    db.query("SELECT  SUM(no_of_times_called) FROM STUDENT, CLASS_STUDENT " +
        "WHERE STUDENT.student_number = CLASS_STUDENT.student_number and " +
        "gender = ? AND class_id = ?",
        [req.params.gender, req.params.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}

