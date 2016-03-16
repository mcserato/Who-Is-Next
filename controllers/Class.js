var db = require(__dirname + '/../lib/Mysql');

exports.removeLetterSection = function(req, res, next){
    db.query('DELETE from CLASS where class_section = ?', [req.body.class_section], function cb(err, rows){});

    function cb(err, rows) {
        if (err) return err;
        
        res.send(rows);
    }
};

exports.removeNumberSection = function(req, res, next){
    db.query('DELETE from CLASS where class_section = ? AND section_number = ?', [req.body.class_section, req.body.section_number], function cb(err, rows){});

    function cb(err, rows) {
        if (err) return err;
        
        res.send(rows);
    }
};

exports.removeClass = function(req, res, next){
	db.query('DELETE from CLASS where class_id = ?', [req.body.class_id], function cb(err, rows){});
	
	function cb(err, rows) {
        if (err) return err;
        
        res.send(rows);
    }
}
