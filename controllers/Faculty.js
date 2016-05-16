var db = require(__dirname + './../lib/Mysql');
var logs = require(__dirname + '/Log').write;

/* Edits a specific faculty's credentials */
exports.edit = function (req, res, next) {
    if ( !req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

    // Limits the password length (8-50)
	var name = req.body.name;
	var old_password = req.body.old_password;
	var password = req.body.password;
	var email = req.body.email;

    db.query("SELECT username from FACULTY where password = "+
    	"PASSWORD(?)", [old_password], function (err, rows) {
            if (err) {
                logs(req, "FAILED", "MySQL Query failed.");
                return next(err);
            }

            if(rows.length){

            	if( password == "" || password.trim()=="" ){
            		password = old_password;
            	}else if( password.length > 50 || password.length < 8 ){
            	    logs(req, "FAILED", "Password length is invalid");
			        return res.status(400).send("Password length is invalid!");
            	}

            	db.query("UPDATE FACULTY SET name = ?, password = "+
            		"PASSWORD(?), email = ? WHERE emp_num = ?",
			        [name,password,email, req.session.emp_num],
			        function (err1, rows1) {
			            if (err1) {
			                logs(req, "FAILED", "MySQL Query failed.");
			                return next(err1);
			            }

                        logs(req, "SUCCESS", "Updated password");
			            return res.send(rows1);
			    });
            }else{
                logs(req, "FAILED", "Incorrect Password !");
                return res.status(400).send("Incorrect Password !");
            }
    });
}

/* Removes a faculty employee from the database */
exports.remove = function (req, res, next) {
	if (!req.session) {
        logs(req, "ERROR", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }
    if (!req.body.emp_num) {
    	logs(req, "ERROR", "Error: Missing employee number.");
        return res.status(400).send("Error: Missing employee number.");
    }
    db.query('DELETE FROM FACULTY WHERE emp_num = ?', [req.body.emp_num],
        function (err, rows) {
            if (err) {
            	logs(req, "ERROR", "Error: MySQL Query FAILED.");
                return next(err);
            }
            if (!rows.affectedRows) {
            	logs(req, "ERROR", "Error: No faculty was deleted.");
                return res.status(400).send("Error: No faculty was deleted.");
            }
            logs(req, "SUCCESS", "DELETED employee "+req.body.emp_num
            	+" from schema.");
            res.send(rows);
    });
}
/* Sign-up for user */
exports.signup = function (req, res, next) {
	var emp_num = req.body.emp_num;
	var username = req.body.username;
	var name = req.body.full_name;
	var password = req.body.password;
	var email = req.body.email;
	db.query("SELECT * FROM FACULTY WHERE username = ?", [username], 
	    function (err, rows) {
		    if(err) {
		    	logs(req, "ERROR", "Error: MySQL Query FAILED.");
		        return next(err);
		    }
		    if(rows.length > 0){
		    	logs(req, "ERROR", "Error: Username already exists.");
                return res.status(400).send("Error: Username already exists.");
		    } else {	
	            db.query("SELECT * FROM FACULTY WHERE emp_num = ?", [emp_num],
	                function (err2, rows2) {
				        if(err2) {
				        	logs(req, "ERROR", "Error: MySQL Query FAILED.");
				            return next(err2);
				        }	        
				        if (rows2.length>0) {
					        logs(req, "ERROR","Error: Employee number already exists.");
					        return res.status(400).send("Error: Employee number already exists.");
				        } else {
					        db.query("INSERT INTO FACULTY (emp_num,username," + 
					        "name,password,email) VALUES (?, ?, ?, PASSWORD(?), ?)",
					        [emp_num, username, name, password, email], 
					        function(err3, rows3){
						        if(err3) {
						        	logs(req, "ERROR", "Error: MySQL Query FAILED.");
							        return next(err3);
							    }
							    if(rows3){
							    	logs(req, "SUCCESS", "SIGNUP successful.");
						        	return res.send(rows3);
						        }
					        });
				        }
			    });
		    }	
	});
}

/* Shows the list of all faculty members */
exports.viewAll = function(req, res, next) {
    if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("SELECT * FROM FACULTY", function (err, rows) {
        if (err) {
            logs(req, "FAILED", "MySQL Query FAILED.");
            return next(err);
        }
        
        logs(req, "SUCCESS", "Viewed all faculty");
        res.send(rows);
	});
}

/* Shows the details of one faculty member */
exports.viewOne = function(req, res, next) {
    if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("SELECT * FROM FACULTY WHERE emp_num = ?", [req.params.emp_num],
		function (err, rows) {
		    if (err) {
		        logs(req, "FAILED", "MySQL Query FAILED.");
		        return next(err);
		    }
		    if (rows.length === 0) {
		        logs(req, "FAILED", "Faculty not found");
                return res.status(404).send("Error: Faculty not found!");
			} else {
				delete rows[0].password;
				logs(req, "SUCCESS", "Viewed " + req.params.emp_num);
			    res.send(rows);
			}
	});
}

/* Searches a faculty member */
exports.search = function(req, res, next) {
    if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("SELECT name FROM FACULTY WHERE name like ?", ['%'+req.params.name+'%'],
		function (err, rows) {
		    if (err) {
		        logs(req, "FAILED", "MySQL Query FAILED.");
		        return next(err);
		    }
		    if (rows.length === 0) {
		        logs(req, "FAILED", "Faculty not found.");
                res.status(404).send("Error: Faculty not found!");
			} else {
			    logs(req, "SUCCESS", "Searched " + req.params.name);
			    res.send(rows);
			}
	});
}

/* Gets the current theme */
exports.getTheme = function (req, res, next) {
    if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("SELECT current_theme FROM FACULTY WHERE username = ?",
	    [req.session.username], function (err, rows) {
		    if(err) {
		        logs(req, "FAILED", "MySQL Query FAILED.");
		        return next(err);
		    }

		    logs(req, "SUCCESS", "Retrieved theme");
		    return res.send(rows);
	});
}

/* Switches the theme */
exports.switchTheme = function (req, res, next) {
    var themes = [
        'default',
        'Pointy Green',
        'Lightning Yellow',
        'Purple Triangle',
        'Red Donut'        
    ]

    if (!req.session) {
        logs(req, "FAILED", "No one is logged in");
        return res.status(401).send("No one is logged in");
    }

	db.query("UPDATE FACULTY SET current_theme = ? WHERE username = ?", 
	    [req.body.current_theme, req.session.username], function (err, rows) {
		    if(err) {
		        logs(req, "FAILED", "MySQL Query FAILED.");
		        return next(err);
		    }

		    logs(req, "SUCCESS", "Updated theme to " + themes[req.body.current_theme]);
		    return res.send(rows);
	});
}
