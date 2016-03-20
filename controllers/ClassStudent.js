var db = require(__dirname + '/../lib/Mysql');

/* Searches a student in a class */
exports.searchStudentInClass = function(req, res, next) {
	db.query("SELECT s.* from STUDENT s, CLASS_STUDENT cl where cl.class_id" + 
	    "like ? and s.student_number like ?", [req.body.class_id, 
	    req.body.student_number], function (err, rows) {
            if (err) {
                return next (err);
            }
            
            res.send(rows[0]);
	});
}

/* Shows a list of student in a class */
exports.viewStudentsInClass = function(req, res, next) {
    db.query("SELECT s.* from STUDENT s, CLASS_STUDENT cl where cl.class_id like ?;", 
        [req.body.class_id], function (err, rows) {
            if (err) {
                return next(err);
            }
            
            res.send(rows);
	});
}
