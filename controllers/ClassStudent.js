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
exports.remove = function(req, res, next){
    if (!req.body.class_id) {
        res.status(400).send("Error: Missing class id.");
    }
    
    if (!req.body.student_number) {
        res.status(400).send("Error: Missing student number.");
    }
    
    db.query('DELETE from CLASS_STUDENT where class_id = ? AND student_number = ?',
        [req.body.class_id, req.body.student_number], function (err, rows){
            if (err) {
                return next (err);
            }
            
            if (!rows.affectedRows) {
                res.status(400).send("Error: No student was deleted'.");
            }

            res.send(rows);
    });        
}

/* Searches a student in a class by last name */
exports.search = function(req, res, next) {
	db.query("SELECT s.first_name, s.middle_name, s.last_name FROM STUDENT s,"+
	"CLASS_STUDENT cs WHERE cs.class_id = ? and s.last_name like ?",
	[req.session.class_id, '%' + req.params.student_number + '%'], function (err, rows) {
            if (err) {
                return next (err);
            }
            
            res.send(rows);
	});
}

/* Shows a list of student in a class */
exports.view = function(req, res, next) {
    db.query("SELECT * FROM STUDENT s, CLASS_STUDENT cs, CLASS c "
        + "WHERE s.student_number = cs.student_number " +
        "and c.class_id = cs.class_id and c.class_id = ?", 
        [req.params.class_id], function (err, rows) {
            if (err) {
                return next(err);
            }
            
            res.send(rows);
	});
}

/* Imports a student */
exports.import = function(req, res, next) {
    db.query("INSERT INTO CLASS_STUDENT(class_id, student_number) VALUES " +
        "(?,?)", [req.body.class_id, req.body.student_number],
        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}
