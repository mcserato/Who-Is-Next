var db = require(__dirname + '/../lib/Mysql');

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

            return res.send(rows);
    });
}
