var db = require(__dirname + './../lib/Mysql');

exports.add = function (req, res, next) {
    db.query("SELECT student_number FROM STUDENT WHERE student_number=?",
    [req.body.student_number], function(err, rows) {
        if (rows.length === 0) {
        	db.query("INSERT INTO STUDENT VALUES (?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'))",
                [req.body.student_number, req.body.first_name, req.body.middle_name,
                req.body.last_name, req.body.college, req.body.course,
                req.body.gender, req.body.picture, req.body.birthday],
                function (err, rows) {

                    if (err) {
                        return(err);
                    }
                    res.send(rows);
        	});
        }
        else {
            res.send(400, "Error: Student already exists!");
        }
    });
}
