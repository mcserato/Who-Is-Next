var db = require(__dirname + '/../lib/Mysql');

/*
Filters:
1. Gender
M F

2. Last Name Starts With
Type
3. First Name Starts With
Type
4. Birthday Month
Dropdown
5. Course
Dropdown
6. College
Dropdown
7. Batch
Type
       
var sample = [
    " gender = 'params' ",
    " last_name like params% ",
    " first_name like params% ",
    " MONTH(birthday) = params ",
    " course = params ",
    " college = params ",
    " student_number like params% "
]*/

/* Gets people in a given class/section */
exports.getVolunteers = function (req, res, next) {
    var i = 0;
    var query = "";

    for (i = 0; i < 7; i++) {
        if(sample[i]) {            //replace with req.body.filter
            query += " AND ";
            query += sample[i];
        }
    }

    db.query("SELECT first_name, last_name FROM CLASS_STUDENT,STUDENT where " + 
        "CLASS_STUDENT.student_number = STUDENT.student_number and "+
        "class_id  = ? " + query + " order by no_of_times_called",
        [req.params.class_id],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
}
