var db = require(__dirname + './../lib/Mysql');

//log-in
/**
 *INPUTS:  username, password
 *OUTPUT:  	case (account found in ADMIN): admin_username, password
 *			case (account found in FACULTY): emp_num , username, name , password , email , picture , is_validated , is_logged_in , admin_username,
 *			case (account found but incorrect password): message
 *			case (account not found): message
 */

exports.login = function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	
	db.query("SELECT * FROM ADMIN WHERE admin_username = '"+username+"' and password = '"+password+"'", function (err, rows) {
		if(err) return(err);
		if (rows) {
			req.session.user = {
					user_id : rows.admin_username,
					role: "admin"
				};
			res.send(rows);
		}
	});
	
	db.query("SELECT * FROM FACULTY WHERE username = '"+username+"' and password = '"+password+"'", function (err, rows) {
		if(err) return(err);
		if (rows) {
			db.query("UPDATE FROM FACULTY SET is_logged_in = true WHERE username = '"+username+"'", function (err2, rows2) {
					if(err2) return(err2);
				});
			req.session.user = {
					user_id : rows.username,
					role: "faculty"
				};
			res.send(rows);
		}
	});
	
	db.query("SELECT * FROM FACULTY, ADMIN WHERE username = '"+username+"' OR admin_username = '"+username+"'", function (err, rows) {
		if(err) return(err);
		if (rows) {
			res.send({
				message: "Incorrect Password"
			});
		}
	});
	
	res.send({
			message: "Username Not Found"
		});
};

//log-out
/**
 *
 *
 */
exports.logout = function (req, res, next) {
	db.query("UPDATE FROM FACULTY SET is_logged_in = false WHERE username = '"+username+"'", function (err, rows) {
			if(err) return(err);
		});
};	

