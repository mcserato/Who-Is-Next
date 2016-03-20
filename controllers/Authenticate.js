var db = require(__dirname + './../lib/Mysql');

/* Log-in
 INPUTS:  username, password
 OUTPUT:  case (account found in ADMIN): admin_username, password
          case (account found in FACULTY): emp_num , username, name ,password,
          email , picture , is_validated , is_logged_in , admin_username,
          case (account found but incorrect password): message
          case (account not found): message
*/
exports.login = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (req.session.username) {
        return res.send(401, "Already logged in.");
    }

    if (!username) {
        return res.send(400, "Error: Usename cannot be blank.");
    }

    if (!password) {
        return res.send(400, "Error: Password cannot be blank.");
    }
    
    db.query("SELECT * FROM ADMIN a,FACULTY f WHERE a.admin_username=? OR f.username=?", 
        [username, username], function (err, rows) {
        if(err) {
            return next(err);
        }
        
        if(rows.length) {
            db.query("SELECT * FROM ADMIN WHERE admin_username = ? AND password = ?",
                [username, password], function (err2, rows2) {
                if(err2) {
                    return next(err2);
                }
                
                if (rows2.length) {
                    req.session.username = rows2[0].admin_username;
                    req.session.role = 'ADMIN';

                    delete rows2[0].password;
                    return res.send(rows2);
                } else {
                    db.query("SELECT * FROM FACULTY WHERE username = ? AND password = ?",
                        [username, password], function (err3, rows3) {
                        
                        if(err3) {
                            return next(err3);
                        }
                        
                        if (rows3.length) {
                            req.session.username = rows3[0].username;
                            req.session.role = 'FACULTY';

                            delete rows3[0].password;
                            return res.send(rows3);
                        } else {
                            return res.send(404, "Error: Incorrect Password!");
                        }
                    });
                }
            });
        } else {
            return res.send(404, "Error: Username not Found!");
        }
    });
}

/* Log-out */
exports.logout = function (req, res, next) {
    if (!req.session.username) {
        return res.send(401, "Error: No one is logged in.");
    }

    req.session.destroy();

    return res.send("Successfully logged out!");
}
