var db = require(__dirname + '/../lib/Mysql');

//Removes a student from the database
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

            return res.send(rows);
    });
}
