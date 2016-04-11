var db = require(__dirname + './../lib/Mysql');

/* Edits a specific faculty's credentials */
exports.edit = function (req, res, next) {
    // Limits the password length (8-50)
    if (req.body.password.length > 50 || req.body.password.length < 8){
        res.send(400, "Error: Password length is invalid!");
    }

    db.query("UPDATE FACULTY SET username = ?, name = ?, password = " +
        "PASSWORD(?), email = ? WHERE emp_num = ?",
        [req.body.username, req.body.name, req.body.password,
        req.body.email, req.body.emp_num], function (err, rows) {
            if (err) {
                return next(err);
            }

            return res.send(rows);
    });
}

/* Removes a faculty employee from the database */
exports.remove = function (req, res, next) {
    if (!req.body.emp_num) {
        res.send(400, "Error: Missing employee number.");
    }

    db.query('DELETE FROM FACULTY WHERE emp_num = ?', [req.body.emp_num],
        function (err, rows) {
            if (err) {
                return next(err);
            }

            if (!rows.affectedRows) {
                res.send(400, "Error: No faculty was deleted.");
            }

            res.send(rows);
    });
}

/* Sign-up for user */
exports.signup = function (req, res, next) {
	var emp_num = req.body.emp_num;
	var username = req.body.username;
	var name = req.body.name;
	var password = req.body.password;
	var email = req.body.email;
	var picture = req.body.picture;
	
	db.query("SELECT * FROM FACULTY WHERE username = ?", [username], 
	    function (err, rows) {
		    if(err) {
		        return next(err);
		    }
		
		    if(rows.length > 0){
                return res.send(400, "Error: Username already exists.");
		    } else {	
	            db.query("SELECT * FROM FACULTY WHERE emp_num = ?", [emp_num],
	                function (err2, rows2) {
				        if(err2) {
				            return next(err2);
				        }
				        
				        if (rows2.length>0) {
					        return res.send(400, "Error: Employee number already exists.");
				        } else {
					        db.query("INSERT INTO FACULTY (emp_num,username," + 
					        "name,password,email,picture) VALUES (?, ?, ?, ?, ?, ?)",
					        [emp_num, username, name, password, email, picture], 
					        function(err3, rows3){
						        if(err3) {
							        return next(err3);
							    }
							    
						        return res.send(rows3);
					        });
				        }
			    });
		    }	
	});
}

/* Shows the list of all faculty members */
exports.viewAll = function(req, res, next) {
	db.query("SELECT name FROM FACULTY", function (err, rows) {
        if (err) {
		    //return next(err);
            res.render('400');
		}
		
		if (rows.length === 0) {
		    //res.send(404, "Error: Classes not found.");
            res.render('404');
		} else {
			//res.send(rows);
            res.render('Faculties', {faculties:rows});
		}
	});
}

/* Shows the details of one faculty member */
exports.viewOne = function(req, res, next) {
	db.query("SELECT * FROM FACULTY WHERE emp_num = ?", [req.params.emp_num],
		function (err, rows) {
		    if (err) {
		    //return next(err);
            res.render('400');
		}
		
		if (rows.length === 0) {
		    //res.send(404, "Error: Classes not found.");
            res.render('404');
		} else {
			//res.send(rows);
            res.render('Faculty', {faculty:rows[0]});
		}
	});
}

/* Searches a faculty member */
exports.search = function(req, res, next) {
	db.query("SELECT name FROM FACULTY WHERE name like '%?%'", [req.params.name],
		function (err, rows) {
		    if (err) {
		    //return next(err);
            res.render('400');
		}
		
		if (rows.length === 0) {
		    //res.send(404, "Error: Classes not found.");
            res.render('404');
		} else {
			//res.send(rows);
            res.render('Faculties', {faculties:rows});
		}
	});
}

/* Gets the current theme */
exports.getTheme = function (req, res, next) {	
	db.query("SELECT current_theme FROM FACULTY WHERE username = ?",
	    [req.session.username], function (err, rows) {
		    if(err) {
		        return next(err);
		    }
		    
		    return res.send(rows);
	});
}

/* Switches the theme */
exports.switchTheme = function (req, res, next) {
	db.query("UPDATE FACULTY SET current_theme = ? WHERE username = ?", 
	    [req.body.current_theme, req.session.username], function (err, rows) {
		    if(err) {
		        return next(err);
		    }
		    
		    return res.send(rows);
	});
}
