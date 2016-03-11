var db = require(__dirname + '/../lib/Mysql');



exports.search_students_in_class = function(req, res, next) {
	function start(){
		db.query("SELECT s.* from STUDENT s, CLASS_STUDENT cl where cl.class_id like ? and s.student_number like ?",
			[req.params.class_id, req.params.student_number],
			callBack);	
	}
	 
	function callBack(err, rows, next) {
		if (err) return next(err);
		res.send(rows);
	}

	start();
};

exports.view_students_in_class = function(req, res, next) {
	function start(){
		db.query("SELECT s.* from STUDENT s, CLASS_STUDENT cl where cl.class_id like ?;",
			[req.params.class_id],
			callBack);	
	}
	 
	function callBack(err, rows, next) {
		if (err) return next(err);
		res.send(rows);
	}

	start();
};