var db = require(__dirname + './../lib/Mysql');

/* sign-up */
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
