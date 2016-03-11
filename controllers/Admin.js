var db = require(__dirname + '/../lib/Mysql');



exports.view_websiteLogs = function(req, res, next) {
 	function start(){
 		db.query("SELECT * FROM LOG", 
 			callBack);	
	}
	 
 	function callBack(err, rows, next) {
 		if (err) return next(err);
 		res.send(rows);
 	}

 	start();
};