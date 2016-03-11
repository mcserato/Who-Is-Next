var db = require(__dirname + '/../lib/Mysql');



// exports.sign_up = function(req, res, next) {
// 	function start(){
// 		db.query("INSERT FACULTY VALUES(DEFAULT,? ,? ,? ,? ,DEFAULT,DEFAULT,DEFAULT, ?)",
// 			[req.body.username, req.body.name, req.body.password, req.body.email, req.body.admin_username],
// 			callBack
// 		);
// 	}
	
// 	function callBack(err, rows, next) {
// 		if (err) return next(err);
// 		res.send(rows);
// 	}

// 	start();
// }


exports.view = function(req, res, next) {
	function start(){
		db.query("SELECT * FROM FACULTY", callBack);	
	}	 
	
	function callBack(err, rows, next) {
		if (err) return next(err);
		res.send(rows);
	}

	start();
};


exports.search = function(req, res, next) {
	function start(){
		db.query("SELECT * FROM FACULTY WHERE emp_num = ?",
			[req.params.emp_num],
		 	callBack);
	}
	
	function callBack(err, rows, next) {
			if (err) return next(err);
			if (rows.length === 0)
				res.status(404).send('FACULTY Not Found!');
			else res.send(rows[0]);
	}

	start();
};


exports.view_logs = function(req, res, next) {
 	function start(){
 		db.query("SELECT * FROM LOG WHERE log_type = 0", 
 			callBack);	
 	}
 
 	function callBack(err, rows, next) {
 		if (err) return next(err);
 		res.send(rows);
 	}

 	start();
};


// exports.edit = function(req, res, next) {
//     function start(){
//         db.query("UPDATE FACULTY SET ? WHERE emp_num = ?",
//             [req.body, req.body.emp_num], 
//             callBack);
//     }
    
//     function callBack(err, rows, next) {
//             if (err) return next(err);
//             res.send(rows);
//     }

//     start();
// };

/*
exports.login = function(req, res, next) {
    function start(){
        db.query("UPDATE FACULTY SET ? WHERE emp_num = ?",
            [req.body, req.params.id], 
            callBack);
    }
    
    function callBack(err, rows, next) {
            if (err) return next(err);
            res.send(rows);
    }

    start();
};
*/

// exports.view_logs = function(req, res, next) {
// 	function start(){
// 		db.query("SELECT * FROM LOG WHERE log_type = 0", 
// 			callBack);	
// 	}
	 
// 	function callBack(err, rows, next) {
// 		if (err) return next(err);
// 		res.send(rows);
// 	}

// 	start();
// };