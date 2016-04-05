var db = require(__dirname + './../lib/Mysql');

/* Adds the student to the database */
exports.add = function (req, res, next) {
    // Checks if the student number is null
    if(req.body.student_number == null || req.body.student_number == "") {
        res.send(400, "Error: Bad Argument!");
    }

    db.query("SELECT student_number FROM STUDENT WHERE student_number = ?",
    [req.body.student_number], function(err, rows) {

        // Checks if the student already exists
        if (rows.length === 0) {
            db.query("INSERT INTO STUDENT VALUES (?, ?, ?, ?, ?, ?, ?, ?, " +
                "STR_TO_DATE(?, '%Y-%m-%d'))",
                [req.body.student_number, req.body.first_name,
                req.body.middle_name, req.body.last_name, req.body.college,
                req.body.course, req.body.gender, req.body.picture,
                req.body.birthday],
                function (err, rows) {

                    if (err) {
                        return next(err);
                    }

                    res.send(rows);
            });
        } else {
            res.send(400, "Error: Student already exists!");
        }
    });
}

/* Edits a specific student in the database */
exports.edit = function (req, res, next) {
    db.query("UPDATE STUDENT SET student_number = ?, first_name = ?, " +
        "middle_name = ?, last_name = ?, college = ?, course = ?, " +
        "gender = ?, picture = ?, birthday = STR_TO_DATE(?, '%Y-%m-%d') " +
        "WHERE student_number = ?",
        [req.body.student_number_new, req.body.first_name,
        req.body.middle_name, req.body.last_name, req.body.college,
        req.body.course, req.body.gender, req.body.picture,
        req.body.birthday, req.body.student_number],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 

/* Removes a student from the database */
exports.removeStudent = function (req, res, next) {
    if (!req.body.student_number) {
        res.send(400, "Error: Missing student number.");
    }

    db.query('DELETE FROM STUDENT WHERE student_number = ?',
        [req.body.student_number], function (err, rows) {
            if (err) {
                return next(err);
            }
            
            if (!rows.affectedRows) {
                res.send(400, "Error: No student was deleted.");
            }

            res.send(rows);
    });
}

/* Shows a list of all students */
exports.viewAll = function(req, res, next) {
    db.query("SELECT * FROM STUDENT", function (err, rows) {
        if (err) {
            //return next(err);
            res.render('400');
        }
        
        if (rows.length === 0) {
            //res.send(404, "Error: Classes not found.");
            res.render('404');
        } else {
            //res.send(rows);
            res.render('Students', {students:rows});
        }
    });
}

/* Shows the details of a student */
exports.viewOne = function(req, res, next) {
    db.query("SELECT * FROM STUDENT WHERE student_number = ?",
        [req.params.student_number], function (err, rows) {
        if (err) {
            //return next(err);
            res.render('400');
        }
        
        if (rows.length === 0) {
            //res.send(404, "Error: Classes not found.");
            res.render('404');
        } else {
            //res.send(rows);
            res.render('Student', {student:rows[0]});
        }
    });
}

/* Searches a student */
exports.search = function(req, res, next) {
    db.query("SELECT * FROM STUDENT WHERE last_name = ?",
            [req.params.last_name], function (err, rows) {
        if (err) {
            //return next(err);
            res.render('400');
        }
        
        if (rows.length === 0) {
            //res.send(404, "Error: Classes not found.");
            res.render('404');
        } else {
            //res.send(rows);
            res.render('Students', {students:rows});
        }
    });
}
