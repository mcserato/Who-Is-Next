var db = require(__dirname + '/../lib/Mysql');

//Removes an entire Class and all of its sections
exports.removeClass = function(req, res, next){
    if (!req.body.class_section) {
        res.status(400).send({message: 'Missing class section'});
    }
    
    if (!req.body.course_code) {
        res.status(400).send({message: 'Missing course code'});
    }
    
    db.query('DELETE from CLASS where course_code = ? and class_section = ?',
             [req.body.course_code, req.body.class_section],
             function cb(err, rows){});

    function cb(err, rows) {
        if (err) return err;
        
        if (!rows.affectedRows) {
            res.status(400).send({message: 'No class was deleted'});
        }
        
        res.send(rows);
    }
}

//Removes an entire section from a class
exports.removeSection = function(req, res, next){
    if (!req.body.class_id) {
        res.status(400).send({message: 'Missing class id'});
    }
    
    db.query('DELETE from CLASS where class_id = ?', [req.body.class_id],
             function cb(err, rows){});
	
    function cb(err, rows) {
        if (err) return err;
        
        if (!rows.affectedRows) {
            res.status(400).send({message: 'No section was deleted'});
        }
        
        res.send(rows);
    }
}
