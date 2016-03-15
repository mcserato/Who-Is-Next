var db = require(__dirname + './../lib/mysql.js');

exports.removeStudentFromClass = function(req, res, next){
    db.query('DELETE from CLASS_STUDENT where class_id = ? AND student_number = ?', [req.body.class_id, req.body.student_number], function cb(err, rows){});

    function cb(err, rows) {
        if (err) return err;
        
        res.send(rows);
    }
};
