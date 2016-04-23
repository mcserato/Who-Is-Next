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

/*Gets the sections belongs to the class*/
exports.getSection = function (req, res, next) {
    db.query("SELECT DISTINCT c.class_id as id from CLASS c, CLASS_STUDENT cs "+
            "WHERE c.class_section=(SELECT class_section from CLASS WHERE " +
            "class_id = ?) AND c.course_code=(SELECT course_code FROM CLASS " +
            "WHERE class_id = ?) AND c.class_id!=?",
             [req.params.class_id,req.params.class_id,req.params.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}

/*Gets the section frequency in a specific class*/
exports.getSectionFrequency = function (req, res, next) {
    db.query("SELECT (SELECT section_number from CLASS where class_id = ?) " +
            "as section, SUM(no_of_times_called) as frequency from " +
            "CLASS_STUDENT cs where cs.class_id = ?",
             [req.params.class_section,req.params.class_section],

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
