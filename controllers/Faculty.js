var db = require(__dirname + './../lib/Mysql');

exports.edit = function (req, res, next) {
    db.query("UPDATE FACULTY SET username = ?, name = ?, password = ?, " +
    	"email = ? WHERE emp_num = ?",
        [req.body.username, req.body.name, req.body.password,
        req.body.email, req.body.emp_num],

        function (err, rows) {
            if (err) {
                return(err);
            }
            res.send(rows);
    });
}