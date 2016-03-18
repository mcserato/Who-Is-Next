var db = require(__dirname + '/../lib/Mysql');

exports.removeStudentFromClass = function(req, res, next){
    if (!req.body.class_id) {
        res.status(400).send({message: 'Missing class id'});
    }
    
    if (!req.body.student_number) {
        res.status(400).send({message: 'Missing student number'});
    }
    
    db.query('DELETE from CLASS_STUDENT where class_id = ? AND student_number = ?', [req.body.class_id, req.body.student_number], function cb(err, rows){});

    function cb(err, rows) {
        if (err) return err;
        
        if (!rows.affectedRows) {
            res.status(400).send({message: 'No student was deleted'});
        }
        
        res.send(rows);
    }
};
