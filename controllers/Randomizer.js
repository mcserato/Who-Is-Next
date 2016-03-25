var db = require(__dirname + '/../lib/Mysql');

/* Gets all the males in a given class/section */
exports.getMales = function (req, res, next) {
    db.query("SELECT * FROM CLASS_STUDENT,STUDENT where gender = " +
        "'M' and CLASS_STUDENT.student_number = STUDENT.student_number and "+
        "class_id  = ? order by no_of_times_called",
        [req.params.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}

/* Gets all the females in a given class/section */
exports.getFemales = function (req, res, next) {
    db.query("SELECT * FROM CLASS_STUDENT,STUDENT where gender = " +
        "'F' and CLASS_STUDENT.student_number = STUDENT.student_number and "+
        "class_id  = ? order by no_of_times_called",
        [req.params.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}

/* Gets people with no basis in a given class/section */
exports.getNormal = function (req, res, next) {
    db.query("SELECT * FROM CLASS_STUDENT,STUDENT where " + 
        "CLASS_STUDENT.student_number = STUDENT.student_number and "+
        "class_id  = ? order by no_of_times_called",
        [req.params.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}
