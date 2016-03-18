var db = require(__dirname + '/../lib/Mysql');

exports.removeLetterSection = function(req, res, next){
    if (!req.body.class_section) {
        res.status(400).send({message: 'Missing class section'});
    }
    
    db.query('DELETE from CLASS where class_section = ?', [req.body.class_section], function cb(err, rows){});

    function cb(err, rows) {
        if (err) return err;
        
        if (!rows.affectedRows) {
            res.status(400).send({message: 'No section was deleted'});
        }
        
        res.send(rows);
    }
};

exports.removeNumberSection = function(req, res, next){
    if (!req.body.class_section) {
        res.status(400).send({message: 'Missing class section'});
    }
    if (!req.body.section_number) {
        res.status(400).send({message: 'Missing section number'});
    }
    
    db.query('DELETE from CLASS where class_section = ? AND section_number = ?', [req.body.class_section, req.body.section_number], function cb(err, rows){});

    function cb(err, rows) {
        if (err) return err;
        
        if (!rows.affectedRows) {
            res.status(400).send({message: 'No section was deleted'});
        }
        
        res.send(rows);
    }
};

exports.removeClass = function(req, res, next){
    if (!req.body.class_id) {
        res.status(400).send({message: 'Missing class id'});
    }
    
    db.query('DELETE from CLASS where class_id = ?', [req.body.class_id], function cb(err, rows){});
	
    function cb(err, rows) {
        if (err) return err;
        
        if (!rows.affectedRows) {
            res.status(400).send({message: 'No class was deleted'});
        }
        
        res.send(rows);
    }
}
