var db = require(__dirname + './../lib/Mysql');
var logs = require(__dirname + '/Log');

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
        logs.write(req, "FAILED", 'Someone is already logged in.');
        return res.status(400).send("Someone is already logged in.");
    }

    if (!username) {
        logs.write(req, "FAILED", 'Username cannot be blank.');
        return res.status(400).send("Username cannot be blank.");
    }

    if (!password) {
        logs.write(req, "FAILED", 'Password cannot be blank.');
        return res.status(400).send("Password cannot be blank.");
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
                    rows2[0].role = 'ADMIN';
                    logs.write(req, "SUCCESS", 'Successfully logged in.');
                    return res.send(rows2);
                } else {
                    db.query("SELECT * FROM FACULTY WHERE username = ? AND password = ?",
                        [username, password], function (err3, rows3) {
                        
                        if(err3) {
                            return next(err3);
                        }
                        
                        if (rows3.length) {
                            req.session.username = rows3[0].username;
                            req.session.emp_num = rows3[0].emp_num;
                            req.session.role = 'FACULTY';

                            delete rows3[0].password;
                            rows3[0].role = 'FACULTY';
                            logs.write(req, "SUCCESS", 'Successfully logged in.');
                            return res.send(rows3);
                        } else {
                        logs.write(req, "FAILED", 'Incorrect Password!');
                            return res.status(400).send("Incorrect Password!");
                        }
                    });
                }
            });
        } else {
            logs.write(req, "FAILED", 'Username not Found!');
            return res.status(400).send("Username not Found!");
        }
    });
}

/* Log-out */
exports.logout = function (req, res, next) {
    if (!req.session.username) {
        logs.write(req, "FAILED", "No one is logged in.");
        return res.status(400).send("No one is logged in.");
    }

    logs.write(req, "SUCCESS", 'Successfully logged out.');
    req.session.destroy();

    return res.send("Successfully logged out!");
}
