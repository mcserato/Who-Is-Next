var db = require(__dirname + '/../lib/Mysql');

exports.removeStudent = function (req, res, next) {
    if (!req.body.student_number) {
        res.status(400).send({message: 'Missing student number'});
    }

    db.query('DELETE FROM STUDENT WHERE student_number = ?',
        [req.body.student_number],
        callback);

    function callback(err, rows) {
        if (err) {
            return next(err);
        }

        if (!rows.affectedRows) {
            res.status(400).send({message: 'No student was deleted'});
        }

        return res.send(rows);
    }

}
