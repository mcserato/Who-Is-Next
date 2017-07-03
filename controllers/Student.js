var db = require(__dirname + './../lib/Mysql');
var logs = require(__dirname+'/./Log').write;
/* Adds the student to the database */
exports.add = function (req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    // Checks if the student number is null
    if(req.body.student_number == null || req.body.student_number == "") {
        logs(req, "ERROR", "Error: Bad Argument");
        res.status(400).send("Error: Bad Argument!");
    }
    db.query("SELECT student_number, emp_num FROM STUDENT WHERE " +
        "student_number = ? AND emp_num = ?",
        [req.body.student_number, req.session.emp_num],
        function(err, rows) {
            // Checks if the student already exists
            if (rows.length === 0) {
                db.query("INSERT INTO STUDENT ( student_number, emp_num, first_name, " +
                    "middle_name, last_name, college, course, gender, birthday ) VALUES " +
                    "(?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'))",
                    [req.body.student_number, req.session.emp_num,
                    req.body.first_name, req.body.middle_name, req.body.last_name,
                    req.body.college, req.body.course, req.body.gender, req.body.birthday],
                    function (err, rows) {
                        if (err) {
                            logs(req, "ERROR", "Error: MySQL Query FAILED");
                            return next(err);
                        }
                        logs(req, "SUCCESS", "ADDED student to database.");
                        res.send(rows);
                    }
                );
            }

            else {
                logs(req, "ERROR", "Error: Student already exists.");
                res.send(400, "Error: Student already exists!");
            }
        }
    );
}
/* Edits a specific student in the database */
exports.edit = function (req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

    db.query("SELECT student_number, emp_num FROM STUDENT WHERE " +
        "student_number = ? AND emp_num = ?",
        [req.body.student_number_new, req.session.emp_num],
        function(err, rows) {
            // Checks if the student already exists
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }else if (rows.length === 0 || req.body.student_number_new==req.body.student_number) {
                db.query("UPDATE STUDENT SET student_number = ?, first_name = ?, " +
                    "middle_name = ?, last_name = ?, college = ?, course = ?, " +
                    "gender = ?, birthday = STR_TO_DATE(?, '%Y-%m-%d') " +
                    "WHERE student_number = ? AND emp_num = ?",
                    [req.body.student_number_new, req.body.first_name,
                    req.body.middle_name, req.body.last_name, req.body.college,
                    req.body.course, req.body.gender, req.body.birthday, 
                    req.body.student_number, req.session.emp_num],
                    function (err, rows) {
                        if (err) {
                            logs(req, "ERROR", "Error: MySQL Query FAILED.");
                            return next(err);
                        }
                        logs(req, "SUCCESS", "UPDATED student.");
                        res.send(rows);
                    }
                );
            }
            else {
                logs(req, "ERROR", "Error: Student already exists.");
                res.send(400, "Error: Student already exists!");
            }
        }
    );


}
/* Removes a student from the database */
exports.remove = function (req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    if (!req.body.student_number) {
        logs(req, "ERROR", "Error: Missing student number.");
        res.status(400).send("Error: Missing student number.");
    }
    db.query("DELETE FROM STUDENT WHERE student_number = ? AND emp_num = ?",
        [req.body.student_number, req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            if (!rows.affectedRows) {
                logs(req, "ERROR", "Error: No student was deleted.");
                res.status(400).send("Error: No student was deleted.");
            }
            logs(req, "SUCCESS", "REMOVED student.");
            res.send(rows);
        }
    );
}
/* Shows a list of all students */
exports.viewAll = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

    if (req.session.role === 'FACULTY') {
        db.query("SELECT DISTINCT * FROM STUDENT WHERE emp_num = ? ORDER BY last_name",
            [req.session.emp_num],
            function (err, rows) {
                if (err) {
                    logs(req, "ERROR", "MySQL Query Error");
                    return next(err);
                }
                logs(req, "SUCCESS", "RETRIEVED all students.");
                res.send(rows);
            }
        );
    }

    else if (req.session.role === 'ADMIN') {
        db.query("SELECT DISTINCT student_number, first_name, middle_name, last_name, " +
            "college, course, gender, picture, birthday FROM STUDENT ORDER BY last_name;",
            [],
            function (err, rows) {
                if (err) {
                    logs(req, "ERROR", "MySQL Query Error");
                    return next(err);
                }
                logs(req, "SUCCESS", "RETRIEVED all students.");
                res.send(rows);
            }
        );
    }
}
/* Shows the details of a student */
exports.viewOne = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    db.query("SELECT DISTINCT (student_number), * FROM STUDENT WHERE student_number = ? AND emp_num = ?",
        [req.params.student_number, req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "MySQL Query Error");
                return next(err);
            }
            if (rows.length === 0) {
                logs(req, "ERROR", "Error: Student not found!");
                res.send(404, "Error: Student not found!");
            } else {
                logs(req, "SUCCESS", "RETRIEVED details of "+req.params.student_number);
                res.send(rows);
            }
        }
    );
}
/* Searches a student by last name from all classes */
exports.search = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    db.query("SELECT DISTINCT (s.student_number), s.first_name, s.middle_name, s.last_name FROM " +
        "STUDENT s, CLASS_STUDENT cs where s.last_name like '%?%' AND emp_num = ?",
        [req.params.last_name, req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "No one is logged in");
                return next(err);
            }
            if (rows.length === 0) {
                logs(req, "ERROR", "Error: Student not found!");
                res.send(404, "Error: Student not found!");
            } else {
                logs(req, "SUCCESS", "SEARCHED students "+req.params.last_name);
                res.send(rows);
            }
        }
    );
}

exports.importStud = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    db.query("SELECT DISTINCT s.student_number, s.first_name, s.last_name FROM " +
        "STUDENT s where s.emp_num = ? and s.student_number NOT IN " +
        "(SELECT st.student_number FROM STUDENT st, CLASS_STUDENT cs, CLASS c " + 
        "WHERE st.student_number = cs.student_number AND " +
        "st.emp_num = cs.emp_num AND " +
        "c.class_id = cs.class_id AND c.class_id = ? AND st.emp_num = ? ) ORDER BY "+
        "s.last_name",
        [req.session.emp_num, req.params.class_id , req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "MySQL Query Error");
                return next(err);
            }

            logs(req, "SUCCESS", "Retrieve possible imported students");
            res.send(rows);
        }
    );
}
