var db = require(__dirname + '/../lib/Mysql');



exports.add = function(req, res, next) {
     function start(){
 	    db.query("INSERT INTO STUDENT VALUES (?,?,?,?,?,?,?,DEFAULT,?,?,?)",
 			[req.body.student_number, req.body.first_name, req.body.middle_name, req.body.last_name, 
 			req.body.college, req.body.course, req.body.gender, req.body.birth_year, 
 			req.body.birth_month, req.body.birth_day],
 			callBack);
     }

 	function callBack(err, rows, next) {
 			if (err) return next(err);
 			res.send(rows);
 	}

 	start();
};


exports.view = function(req, res, next) {
	function start(){
		db.query("SELECT * FROM STUDENT", 
			callBack);	
	}
	 
	function callBack(err, rows, next) {
		if (err) return next(err);
		res.send(rows);
	}

	start();
};


exports.search = function(req, res, next) {
	function start(){
		db.query("SELECT * FROM STUDENT WHERE student_number = ?",
			[req.params.student_number],
		 	callBack);
	}
	
	function callBack(err, rows, next) {
			if (err) return next(err);
			if (rows.length === 0)
				res.status(404).send('STUDENT Not Found!');
			else res.send(rows[0]);
	}

	start();
};





// exports.edit = function(req, res, next) {
// 	function start(){
// 		db.query("UPDATE STUDENT SET ? WHERE student_number = ?",
// 			[req.body, req.body.student_number], 
// 			callBack);
// 	}
	
// 	function callBack(err, rows, next) {
// 			if (err) return next(err);
//             if(rows.affectedRows === 0)
//                 res.status(400).send('Failed to edit student');
//             else res.send(rows);
// 	}

// 	start();
// };

// exports.delete = function(req, res, next) {
// 	function start(){
//         db.query("DELETE FROM STUDENT WHERE student_number = ?",
// 		[req.body.student_number], 
//         callBack);
//     }

// 	function callBack(err, rows, next) {
// 		if (err) return next(err);
// 		res.send(rows);
// 	}

//     start();
// };