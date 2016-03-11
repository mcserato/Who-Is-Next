var db = require(__dirname + '/../lib/Mysql');



exports.add = function(req, res, next) {
    function start(){
         db.query("INSERT CLASS VALUES(DEFAULT, ?, ?, ?, ?, DEFAULT, 0)",
             [req.body.course_code, req.body.course_title, req.body.class_section, req.body.class_number],
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
		db.query("SELECT * FROM CLASS", 
			callBack);	
	}
	 
	function callBack(err, rows, next) {
            if (err) return next(err);

            if (rows.length === 0)
                res.status(404).send('CLASS Not Found!');
            else res.send(rows[0]);
    }

	start();
};


exports.search = function(req, res, next) {
    function start(){
        db.query("SELECT * FROM CLASS WHERE class_id = ?",
            [req.params.class_id], 
            callBack);  
    }
     
    function callBack(err, rows, next) {
            if (err) return next(err);
            if (rows.length === 0)
                res.status(404).send('CLASS Not Found!');
            else res.send(rows[0]);
    }

    start();
};





// exports.edit_class = function(req, res, next) {
//     function start(){
//         db.query("UPDATE CLASS SET ? WHERE class_id = ?",
//             [req.body, req.params.class_id], 
//             callBack);
//     }
    
//     function callBack(err, rows, next) {
//             if (err) return next(err);
//             res.send(rows);
//     }

//     start();
// };


// exports.edit_section = function(req, res, next) {
//     function start(){
//         db.query("UPDATE CLASS SET ? WHERE class_section = ? AND class_number = ?",
//             [req.body, req.params.class_section, req.params.class_number], 
//             callBack);
//     }
    
//     function callBack(err, rows, next) {
//             if (err) return next(err);
//             res.send(rows);
//     }

//     start();
// };