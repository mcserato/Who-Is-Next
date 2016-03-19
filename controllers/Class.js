var db = require(__dirname + '/../lib/Mysql');

//Removes an entire class and all of its sections
exports.removeClass = function(req, res, next){
    if (!req.body.class_section) {
        res.send(400, "Error: Missing class section.");
    }
    
    if (!req.body.course_code) {
        res.send(400, "Error: Missing course code.");
    }
    
    db.query('DELETE from CLASS where course_code = ? and class_section = ?', 
        [req.body.course_code, req.body.class_section], function (err, rows){
            if (err) {
                return next(err);
            }
        	
            if (!rows.affectedRows) {
                res.send(400, "Error: No class was deleted.");
            }
		    
		    res.send(rows);
    });
}

//Removes an entire section from a class
exports.removeSection = function(req, res, next){
    if (!req.body.class_id) {
        res.send(400, "Error: Missing class id.");
    }
    
    db.query('DELETE from CLASS where class_id = ?', [req.body.class_id],
        function (err, rows){
            if (err) {
                return next(err);
            }
		    
            if (!rows.affectedRows) {
                res.send(400, "Error: No section was deleted.");
            }
		    
            res.send(rows);
    });
}
