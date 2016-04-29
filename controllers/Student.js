var db = require(__dirname + './../lib/Mysql');

/* Adds the student to the database */
exports.add = function (req, res, next) {
    // Checks if the student number is null
    if(req.body.student_number == null || req.body.student_number == "") {
        res.status(400).send("Error: Bad Argument!");
    }

    db.query("SELECT student_number, emp_num FROM STUDENT WHERE " +
        "student_number = ? AND emp_num = ?",
        [req.body.student_number, req.session.emp_num],

        function(err, rows) {
            // Checks if the student already exists
            if (rows.length === 0) {
                db.query("INSERT INTO STUDENT VALUES " +
                    "(?, ?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'))",
                    [req.body.student_number, req.session.emp_num,
                    req.body.first_name, req.body.middle_name, req.body.last_name,
                    req.body.college, req.body.course, req.body.gender,
                    req.body.picture, req.body.birthday],

                    function (err, rows) {
                        if (err) {
                            return next(err);
                        }

                        res.send(rows);
                    }
                );
            } else {
                res.send(400, "Error: Student already exists!");
            }
        }
    );
}

/* Edits a specific student in the database */
exports.edit = function (req, res, next) {
    db.query("UPDATE STUDENT SET student_number = ?, first_name = ?, " +
        "middle_name = ?, last_name = ?, college = ?, course = ?, " +
        "gender = ?, picture = ?, birthday = STR_TO_DATE(?, '%Y-%m-%d') " +
        "WHERE student_number = ? AND emp_num = ?",
        [req.body.student_number_new, req.body.first_name,
        req.body.middle_name, req.body.last_name, req.body.college,
        req.body.course, req.body.gender, req.body.picture,
        req.body.birthday, req.body.student_number, req.session.emp_num],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
        }
    );
}

/* Removes a student from the database */
exports.remove = function (req, res, next) {
    if (!req.body.student_number) {
        res.status(400).send("Error: Missing student number.");
    }

    db.query("DELETE FROM STUDENT WHERE student_number = ? AND emp_num = ?",
        [req.body.student_number, req.session.emp_num],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            if (!rows.affectedRows) {
                res.status(400).send("Error: No student was deleted.");
            }

            res.send(rows);
        }
    );
}

/* Shows a list of all students */
exports.viewAll = function(req, res, next) {
    db.query("SELECT s.first_name, s.middle_name, s.last_name, " +
        "s.student_number FROM STUDENT s, CLASS_STUDENT cs, CLASS c WHERE " +
        "s.student_number = cs.student_number AND s.emp_num = cs.emp_num AND " +
        "c.class_id = cs.class_id AND c.emp_num = ?",
        [req.session.emp_num],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
        }
    );
}

/* Shows the details of a student */
exports.viewOne = function(req, res, next) {
    db.query("SELECT * FROM STUDENT WHERE student_number = ? AND emp_num = ?",
        [req.params.student_number, req.session.emp_num],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            if (rows.length === 0) {
                res.send(404, "Error: Student not found!");
            } else {
                res.send(rows);
            }
        }
    );
}

/* Searches a student by last name from all classes */
exports.search = function(req, res, next) {
    db.query("SELECT s.first_name, s.middle_name, s.last_name FROM " +
        "STUDENT s, CLASS_STUDENT cs where s.last_name like '%?%' AND emp_num = ?",
        [req.params.last_name, req.session.emp_num],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            if (rows.length === 0) {
                res.send(404, "Error: Student not found!");
            } else {
                res.send(rows);
            }
        }
    );
}
