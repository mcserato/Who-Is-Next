var db = require(__dirname + '/../lib/Mysql');

//Deletes a student from class
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
                return next(err);
            }
            
            if (!rows.affectedRows) {
                res.send(400, "Error: No student was deleted'.");
            }
            
            res.send(rows);
    });
}
