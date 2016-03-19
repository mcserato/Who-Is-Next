var db = require(__dirname + './../lib/Mysql');

//log-in
/**
 *INPUTS:  username, password
 *OUTPUT:   case (account found in ADMIN): admin_username, password
 *          case (account found in FACULTY): emp_num , username, name ,password
 *           , email , picture , is_validated , is_logged_in , admin_username,
 *          case (account found but incorrect password): message
 *          case (account not found): message
 */

exports.login = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (req.session.username) {
        return res.status(401).send({
            message: 'Already logged in'
        });
    }

    if (!username) {
        return res.send({
            message: 'Usename cannot be blank'
        });
    }

    if (!password) {
        return res.send({
            message: 'Password cannot be blank'
        });
    }
    
    db.query("SELECT * FROM ADMIN a,FACULTY f WHERE a.admin_username=? OR f.username=?", 
        [username, username], function (err, rows) {
        if(err) return(err);
        if( rows.length ) {
            db.query("SELECT * FROM ADMIN WHERE admin_username = ? AND password = ?",
                [username, password], function (err, rows) {
                if(err) return(err);
                if ( rows.length ) {
                    req.session.username = rows[0].admin_username;
                    req.session.role = 'ADMIN';

                    delete rows[0].password;
                    return res.send(rows);

                }else {
                    db.query("SELECT * FROM FACULTY WHERE username = ? AND password = ?",
                        [username, password], function (err, rows) {
                        
                        if(err) return(err);
                        if ( rows.length ) {

                            req.session.username = rows[0].username;
                            req.session.role = 'FACULTY';

                            delete rows[0].password;
                            return res.send(rows);

                        } else {
                            return res.status(404).send({
                                message: 'Incorrect Password!'
                            });
                        }
                    });
                }
            });
        }else{
            res.status(404).send({
                message: 'Username not Found!'
            })
        }
    });

};

//log-out
/**
 *
 *
 */
 exports.logout = function (req, res, next) {
    if (!req.session.username) {
        return res.status(401).send({message: 'No one is logged in'});
    }

    req.session.destroy();

    return res.send({message: 'Successfully logged out!'});
};