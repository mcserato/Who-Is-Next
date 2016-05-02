'use strict';

/* Adds a student to a class */
exports.add = function (req, res, next) {
    if(!req.session){
        logs(req, "FAILED", "No one is logged in.");
        return res.status(401).send("No one is logged in.");
    }
    db.query("INSERT INTO CLASS_STUDENT VALUES (?, ?, ?, ?)",
        [req.body.class_id, req.body.student_number, 
        req.session.emp_num, req.body.no_of_times_called],

        function (err, rows) {
            if (err) {
                logs(req, "FAILED", "Error: MysSQL Query Failed.");
                return next(err);
            }   
            logs(req, "SUCCESS", "INSERTED new class with "
                +[req.body.class_id, req.body.student_number, 
                req.session.emp_num, req.body.no_of_times_called]
                .join(' '));
            res.send(rows);
        }
    );
}
/* Deletes a student from class */
exports.remove = function(req, res, next){
    if(!req.session){
        logs(req, "FAILED", "No one is logged in.");
        return res.status(401).send("No one is logged in.");
    }
    if (!req.body.class_id) {
        logs(req, "FAILED", "Error: Missing class id.");
        res.status(400).send("Error: Missing class id.");
    }
    if (!req.body.student_number) {
        logs(req, "FAILED", "Error: Missing student number");
        res.status(400).send("Error: Missing student number.");
    }
    db.query("DELETE from CLASS_STUDENT where class_id = ? AND " +
        "student_number = ? AND emp_num = ?",
        [req.body.class_id, req.body.student_number, req.session.emp_num], 
        function (err, rows){
            if (err) {
                logs(req, "Failed", "Error: MySQL Query FAILED.");
                return next (err);
            }
            if (!rows.affectedRows) {
                logs(req, "Failed", "Error: Mo student was deleted.");
                res.status(400).send("Error: No student was deleted.");
            }
            logs(req, "SUCCESS", "DELETED "
                +req.body.student_number+" from class "
                +req.body.class_id);
            res.send(rows);
        }
    );        
}
/* Searches a student in a class by last name */
exports.search = function(req, res, next) {
	if(!req.session){
        logs(req, "FAILED", "No one is logged in.");
        return res.status(401).send("No one is logged in.");
    }
    db.query("SELECT s.first_name, s.middle_name, s.last_name FROM STUDENT s,"+
	"CLASS_STUDENT cs WHERE cs.class_id = ? and s.student_number = cs.student_number and s.last_name like ?",
	[req.params.class_id, '%' + req.params.last_name + '%'], function (err, rows) {
            if (err) {
                logs(req, "FAILED", "Error: MySQL Query FAILED.");
                return next (err);
            }
            logs(req, "SUCCESS", "SEARCHED "+req.params.last_name
                +" from class "+req.params.class_id);
            res.send(rows);
	   }
    );
}

/* Shows a list of student in a class */
exports.view = function(req, res, next) {
    if(!req.session){
        logs(req, "FAILED", "No one is logged in.");
        return res.status(401).send("No one is logged in.");
    }
    db.query("SELECT * FROM STUDENT s, CLASS_STUDENT cs, CLASS c " + 
        "WHERE s.student_number = cs.student_number AND " +
        "s.emp_num = cs.emp_num AND " +
        "c.class_id = cs.class_id AND c.class_id = ? AND s.emp_num = ?", 
        [req.params.class_id, req.session.emp_num], 
        function (err, rows) {
            if (err) {
                logs(req, "FAILED", "Error: MySQL Query FAILED.");
                return next(err);
            }
            logs(req, "SUCCESS", "RETRIEVED all students from class"
                +req.params.class_id);
            res.send(rows);
	   }
    );
}
/* Imports a student */
exports.import = function(req, res, next) {
    if(!req.session){
        logs(req, "FAILED", "No one is logged in.");
        return res.status(401).send("No one is logged in.");
    }
    db.query("INSERT INTO CLASS_STUDENT(class_id, student_number, emp_num) " +
        "VALUES(?, ?, ?)", 
        [req.body.class_id, req.body.student_number, req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "FAILED", "Error: MySQL Query FAILED.");
                return next(err);
            }
            logs(req, "SUCCESS", "IMPORTED "+req.body.student_number
                +" to class "+req.body.class_id);
            res.send(rows);
        }
    );
}
