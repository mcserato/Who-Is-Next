var db = require(__dirname + '/../lib/Mysql');
var logs = require(__dirname + '/Log');
/*
Filters:
1. Gender
2. Last Name Starts With
3. First Name Starts With
4. Birthday Month
5. Course
6. College
7. Batch
*/

/* Gets people in a given class/section */
exports.getVolunteers = function (req, res, next) {
    var i = 0;
    var query = "";

    /*if(req.body.gender!=NULL){
        query += "AND genderlike " + req.body.gender + " ";
    }*/
    if(req.body.last_name!==""){
        query += " AND last_name like '" + req.body.last_name + "%' ";
    }
    if(req.body.first_name!=""){
        query += " AND first_name like '" + req.body.first_name + "%' ";
    }
    if(req.body.birthday!=""){
        query += " AND MONTH(birthday) = " + req.body.birthday + " ";
    }
    if(req.body.course!=""){
        query += " AND course = '" + req.body.course + "' ";
    }
    if(req.body.college!=""){
        query += " AND college = '" + req.body.college + "'";
    }
    if(req.body.batch!=""){
        query += " AND s.student_number like '" + req.body.batch + "%' ";
    }
    console.log(query);
    db.query("SELECT * FROM STUDENT s, CLASS_STUDENT cs, " +
    "CLASS c WHERE s.student_number = cs.student_number AND s.emp_num = " +
    "cs.emp_num AND c.class_id = cs.class_id AND c.class_id = ?" + query +
    "ORDER BY rand() limit " + req.body.number, [req.body.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            logs.write(req, "SUCCESS", "Randomized.");
            logs.save(req.body, rows);
            res.send(rows);
    });
}

/*Update the number of times called of a student*/
exports.update = function (req, res, next) {
    db.query("UPDATE CLASS_STUDENT SET no_of_times_called = "+
    	"no_of_times_called + 1  WHERE class_id = ?"+
        " AND student_number = ? AND emp_num = ?", [req.body.class_id,
        req.body.student_number, req.session.emp_num],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}
