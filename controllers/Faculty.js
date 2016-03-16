var db = require(__dirname + './../lib/Mysql');

exports.edit = function (req, res, next) {
    if (req.body.password.length > 50 || req.body.password.length < 8){
        res.send(400, "Error: Password length is invalid!");
    }
    db.query("UPDATE FACULTY SET username = ?, name = ?, password = " +
        "PASSWORD(?), email = ? WHERE emp_num = ?",
        [req.body.username, req.body.name, req.body.password,
        req.body.email, req.body.emp_num],

        function (err, rows) {
            if (err) {
                return(err);
            }
            res.send(rows);
    });
}
