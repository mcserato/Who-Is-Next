var db = require(__dirname + './../lib/Mysql');

/* Edits a specific faculty's credentials */
exports.edit = function (req, res, next) {
    // Limits the password length (8-50)
    if (req.body.password.length > 50 || req.body.password.length < 8){
        res.send(400, "Error: Password length is invalid!");
    }

    db.query("UPDATE FACULTY SET username = ?, name = ?, password = " +
        "PASSWORD(?), email = ? WHERE emp_num = ?",
        [req.body.username, req.body.name, req.body.password,
        req.body.email, req.body.emp_num], function (err, rows) {
            if (err) {
                return next(err);
            }

            return res.send(rows);
    });
}

//Removes a faculty employee from the database
exports.removeFaculty = function (req, res, next) {
    if (!req.body.emp_num) {
        res.send(400, "Error: Missing employee number.");
    }

    db.query('DELETE FROM FACULTY WHERE emp_num = ?', [req.body.emp_num],
        function (err, rows) {
            if (err) {
                return next(err);
            }

            if (!rows.affectedRows) {
                res.send(400, "Error: No faculty was deleted.");
            }

            res.send(rows);
    });
}
