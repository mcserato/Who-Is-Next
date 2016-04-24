var db = require(__dirname + '/../lib/Mysql');

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
        query += " AND course = " + req.body.course + " ";
    }
    if(req.body.college!=""){
        query += " AND college = " + req.body.college + "";
    }
    if(req.body.batch!=""){
        query += " AND student_number like '" + req.body.batch + "%' ";
    }
    
    db.query("SELECT first_name, last_name FROM STUDENT s, CLASS_STUDENT cs, " + 
    "CLASS c WHERE s.student_number = cs.student_number AND s.emp_num = " + 
    "cs.emp_num AND c.class_id = cs.class_id AND c.class_id = ?" + query +
    "ORDER BY rand() limit " + req.body.number, [req.body.class_id], 

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}
