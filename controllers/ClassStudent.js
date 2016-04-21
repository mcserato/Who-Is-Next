var db = require(__dirname + './../lib/Mysql');

/* Adds a student to a class */
exports.add = function (req, res, next) {
    db.query("INSERT INTO CLASS_STUDENT VALUES (?, ?, ?, ?)",
        [req.body.class_id, req.body.student_number, 
        req.session.emp_num, req.body.no_of_times_called],

        function (err, rows) {
            if (err) {
                return next(err);
            }
            
            res.send(rows);
        }
    );
}

/* Deletes a student from class */
exports.remove = function(req, res, next){
    if (!req.body.class_id) {
        res.send(400, "Error: Missing class id.");
    }
    
    if (!req.body.student_number) {
        res.send(400, "Error: Missing student number.");
    }
    
    db.query("DELETE from CLASS_STUDENT where class_id = ? AND " +
        "student_number = ? AND emp_num = ?",
        [req.body.class_id, req.body.student_number, req.session.emp_num], 

        function (err, rows){
            if (err) {
                return next (err);
            }
            
            if (!rows.affectedRows) {
                res.send(400, "Error: No student was deleted'.");
            }

            res.send(rows);
        }
    );        
}

/* Searches a student in a class by last name */
exports.search = function(req, res, next) {
	db.query("SELECT s.first_name, s.middle_name, s.last_name FROM STUDENT s,"+
	"CLASS_STUDENT cs WHERE cs.class_id = ? and s.last_name like '%?%'",
	[req.params.class_id, req.params.student_number], 

        function (err, rows) {
            if (err) {
                return next (err);
            }
            
            res.send(rows);
	   }
    );
}

/* Shows a list of student in a class */
exports.view = function(req, res, next) {
    db.query("SELECT * FROM STUDENT s, CLASS_STUDENT cs, CLASS c " + 
        "WHERE s.student_number = cs.student_number AND " +
        "s.emp_num = cs.emp_num AND " +
        "c.class_id = cs.class_id AND c.class_id = ? AND s.emp_num = ?", 
        [req.params.class_id, req.session.emp_num], 

        function (err, rows) {
            if (err) {
                return next(err);
            }
            
            res.send(rows);
	   }
    );
}

/* Imports a student */
exports.import = function(req, res, next) {
    db.query("INSERT INTO CLASS_STUDENT(class_id, student_number, emp_num) " +
        "VALUES(?, ?, ?)", 
        [req.body.class_id, req.body.student_number, req.session.emp_num],
        
        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
        }
    );
}
