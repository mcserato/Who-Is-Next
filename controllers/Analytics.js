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

/*Gets the section frequency in a specific class*/
exports.getSectionFrequency = function (req, res, next) {
    db.query("SELECT SUM(CLASS_STUDENT.no_of_times_called) as frequency FROM " +
        "CLASS_STUDENT, STUDENT WHERE CLASS_STUDENT.student_number = " +
        "STUDENT.student_number AND CLASS_STUDENT.class_id = ? AND " +
        "STUDENT.student_number IN (SELECT STUDENT.student_number FROM " +
        "CLASS_STUDENT, STUDENT WHERE CLASS_STUDENT.student_number = " +
        "STUDENT.student_number AND CLASS_STUDENT.class_id = ?)",
        [req.params.class_id, req.params.class_section],

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

/* Gets the top ten most called females in a given class */
exports.getTopTenMostCalledFemales = function (req, res, next) {
    db.query("SELECT * FROM CLASS_STUDENT,STUDENT where gender = " +
        "'F' and CLASS_STUDENT.student_number = STUDENT.student_number and "+
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
    db.query("SELECT  SUM(no_of_times_called) as frequency FROM STUDENT, CLASS_STUDENT " +
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
