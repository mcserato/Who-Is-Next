var db = require(__dirname + './../lib/Mysql');
var logs = require(__dirname + '/Log').write;

/* Adds the class to the database */
exports.add = function (req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

    db.query("SELECT * FROM CLASS WHERE course_code = ? AND emp_num = ?",
        [req.body.course_code, req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            if(rows.length){
                return res.status(400).send("Class already exist.");
            }else{
                db.query("INSERT INTO CLASS(course_code, course_title, emp_num) VALUES(?, ?, ?)",
                    [req.body.course_code, req.body.course_title, req.session.emp_num],
                    function (err, rows) {
                        if (err) {
                            logs(req, "ERROR", "Error: MySQL Query FAILED.");
                            return next(err);
                        }
                        logs(req, "SUCCESS", "Added" + req.body.course_code );
                        res.send(rows);
                });
            }
    });
}
/* Adds the section to a class to the database */
exports.addSection = function (req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

    db.query("INSERT INTO CLASS(course_code, course_title, class_section,"
        + "section_number, emp_num) VALUES(?,?,?,?,?)",
        [req.body.course_code, req.body.course_title, req.body.class_section,
            (req.body.section_number || null), req.session.emp_num],

        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            logs(req, "SUCCESS", "Added" + 
                [req.body.course_code, req.body.class_section, req.body.section_number]
                .join(' '));
            res.send(rows);
    });

}


/* Edits a specific class in the database */
exports.editSection = function (req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

    db.query("UPDATE CLASS SET class_section = ?, section_number = ? " + 
        "WHERE class_id = ? and emp_num = ?",
        [req.body.class_section,req.body.section_number,
            req.body.class_id, req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            logs(req, "SUCCESS", 
                ["Edited",req.body.class_id].join(' ') );
            res.send(rows);
    });
}
exports.editClass = function (req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }


    db.query("SELECT * FROM CLASS WHERE course_code = ? AND emp_num = ?",
        [req.body.course_code, req.session.emp_num],
        function (err, rows) {
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            if(rows.length){
                return res.status(400).send("Class already exist.");
            }else{
                db.query("UPDATE CLASS SET " +
                    "course_code = ?, course_title = ? WHERE course_code = ?",
                    [req.body.course_code,
                    req.body.course_title, req.body.course_code_o],
                    function (err, rows) {
                        if (err) {
                            logs(req, "ERROR", "Error: MySQL Query FAILED.");
                            return next(err);
                        }
                        logs(req, "SUCCESS", 
                            ["Edited",req.body.course_code].join(' ') );
                        res.send(rows);
                });
            }
    });
}
/* Removes an entire class and all of its sections */
exports.removeClass = function(req, res, next){
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    if (!req.body.course_code) {
        logs(req, "ERROR", "Error: Missing course code.");
        return res.status(400).send("Error: Missing course code.");
    }
    db.query('DELETE from CLASS where course_code = ?', 
        [req.body.course_code], function (err, rows){
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            if (!rows.affectedRows) {
                logs(req, "ERROR", "Error: No class was deleted.");
                return res.status(400).send("Error: No class was deleted.");
            }
		    logs(req, "SUCCESS", 
                ["Removed",req.body.course_code].join(' ') );
		    res.send(rows);
    });
}

//Removes an entire section from a class
exports.removeSection = function(req, res, next){
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    if (!req.body.class_id) {
        logs(req, "ERROR", "Error: Missing class id");
        return res.status(400).send("Error: Missing class id.");
    }
    db.query('DELETE from CLASS where class_id = ?', [req.body.class_id],
        function (err, rows){
            if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            if (!rows.affectedRows) {
                logs(req, "ERROR", "Error: No section was deleted.");
                return res.status(400).send("Error: No section was deleted.");
            }
            logs(req, "SUCCESS", 
                ["Removed",req.body.class_id].join(' ') );
            res.send(rows);
    });
}
/* Shows all the courses of a faculty user */
exports.viewAll = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    db.query("SELECT DISTINCT course_code, course_title FROM CLASS where emp_num = ? ORDER BY course_code",
        [req.session.emp_num], function (err, rows) {
		if (err) {
            logs(req, "ERROR", "Error: MySQL Query FAILED.");
		    return next(err);
		}
	    logs(req, "SUCCESS", "Viewed all classes.");
		res.send(rows);
    });
}
/* Shows the details of all classes from a course code of a faculty user */
exports.viewSections = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    db.query("(SELECT class_id, class_section, section_number FROM CLASS where emp_num = ?"+
    " and course_code = ? and section_number is NULL ORDER BY class_section) UNION "+
    "(SELECT class_id, class_section, section_number FROM CLASS where emp_num = ? and "+
    "course_code = ? GROUP BY class_section, section_number)",
        [req.session.emp_num, req.params.course_code,req.session.emp_num, req.params.course_code],
        function (err, rows) {
		if (err) {
            logs(req, "ERROR", "Error: MySQL Query FAILED.");
		    return next(err);
		}
		if (rows.length === 0) {
            logs(req, "ERROR", "Error: Classeses were not found");
		    return res.status(404).send("Error: Classes were not found.");
		} else {
		    logs(req, "SUCCESS", ["Viewed",req.params.course_code].join(' '));
			res.send(rows);
		}
    });
}
/* Searches a class */
exports.search = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    db.query("SELECT * FROM CLASS WHERE emp_num = ? and course_code like ?", 
        [req.session.emp_num, '%' + req.params.course_code + '%'],
        function (err, rows) {
			if (err) {
                logs(req, "ERROR", "Error: MySQL Query FAILED.");
				return next(err);
			}
			if (rows.length === 0) {
                logs(req, "ERROR", "Error: Class not found.");
				return res.status(404).send("Error: Class not found.");
			} else {
				res.send(rows);
			}
	});
}
/* Shows the details of all classes from a course code of a faculty user */
exports.viewClasses = function(req, res, next) {
    if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }   
    var data = {
        classes: '',
        degree_programs: '',
        colleges: ''
    };
    db.query("SELECT class_id, course_code, class_section, section_number " + 
    "FROM CLASS where emp_num = ?", [req.session.emp_num], function (err, rows) {
		if (err) {
            logs(req, "ERROR", "Error: MySQL Query FAILED.");
		    return next(err);
		}
		if (rows.length === 0) {
            logs(req, "ERROR", "Error: Classes were not found.");
		    return res.status(404).send("Error: Classes were not found.");
		} else {
		    logs(req, "SUCCESS", "Viewed all classes");
			data.classes = rows;


            db.query("SELECT DISTINCT course FROM STUDENT WHERE emp_num = " + 
            "?", [req.session.emp_num], function (err, rows) {
                    if (err) {
                        logs(req, "ERROR", "Error: MySQL Query FAILED.");
                        return next(err);
                    }
                
                    if (rows.length === 0) {
                        logs(req, "ERROR", "Error: Classes were not found.");
                        return res.status(404).send("Error: Classes were not found.");
                    } else {
                        logs(req, "SUCCESS", "Viewed all degree programs of students");
                        data.degree_programs = rows;

                        db.query("SELECT DISTINCT college FROM STUDENT WHERE emp_num = ?", 
                            [req.session.emp_num], function (err, rows) {
                                if (err) {
                                    logs(req, "ERROR", "Error: MySQL Query FAILED.");
                                    return next(err);
                                }
                                if (rows.length === 0) {
                                    logs(req, "ERROR", "Error: Classes were not found.");
                                    return res.status(404).send("Error: Classes were not found.");
                                } else {
                                    logs(req, "SUCCESS", "Viewed all colleges of students");
                                    data.colleges = rows;
                                    return res.send(data);
                                }
                        });
                    }
            });
		}
    });   
}
