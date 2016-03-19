var db = require(__dirname + '/../lib/Mysql');

exports.removeFaculty = function (req, res, next) {
    if (!req.body.emp_num) {
        res.status(400).send({message: 'Missing employee number'});
    }

    db.query('DELETE FROM FACULTY WHERE emp_num = ?',
        [req.body.emp_num],
        callback);

    function callback(err, rows) {
        if (err) {
            return next(err);
        }

        if (!rows.affectedRows) {
            res.status(400).send({message: 'No faculty was deleted'});
        }

        return res.send(rows);
    }

}
