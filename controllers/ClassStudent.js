var db = require(__dirname + './../lib/Mysql');

/* Adds a student to a class */
exports.add = function (req, res, next) {
    db.query("INSERT INTO CLASS_STUDENT VALUES (?, ?, ?)",
        [req.body.class_id, req.body.student_number, req.body.no_of_times_called],
        function (err, rows) {
            if (err) {
                return next(err);
            }
            
            res.send(rows);
    });
}

/* Deletes a student from class */
exports.removeStudentFromClass = function(req, res, next){
    if (!req.body.class_id) {
        res.send(400, "Error: Missing class id.");
    }
    
    if (!req.body.student_number) {
        res.send(400, "Error: Missing student number.");
    }
    
    db.query('DELETE from CLASS_STUDENT where class_id = ? AND student_number = ?',
        [req.body.class_id, req.body.student_number], function (err, rows){
            if (err) {
                return next (err);
            }
            
            if (!rows.affectedRows) {
                res.send(400, "Error: No student was deleted'.");
            }

            res.send(rows);
    });        
}

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
