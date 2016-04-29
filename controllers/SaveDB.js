var db = require(__dirname + './../lib/Mysql');

/* This functions views all students in a save file */
exports.view = function (req, res, next) {
	db.query("SELECT * FROM STUDENT s, CLASS_STUDENT cs, CLASS c, SAVEPOINT sp " +
		"WHERE s.student_number = cs.student_number AND " +
		"s.emp_num = cs.emp_num AND " +
		"c.class_id = cs.class_id AND c.class_id = ? AND s.emp_num = ? AND " +
		"sp.emp_num = cs.emp_num AND sp.class_id = cs.class_id AND " +
		"sp.save_id = ?",
		[req.params.class_id, req.session.emp_num, req.params.save_id],

		function (err, rows) {
			if(err) {
				return next(err);
			}

			res.send(rows);
		}
	);
}

/*
	FOR GAUVEN: Yung view, sure nakong gumagana dahil natest ko na sa mysql console.
	Di ko lang alam kung pano ayusin yung routes.

	Eto yung add function na tinry kong gawin based sa mga pinagusapan kanina
	pakicorrect nalang kung may mga mali

*/

/* This function adds an empty save point with no volunteers selected yet*/
exports.save = function (req, res, next) {
	//etong query na to is gumagawa ng save point, pero wala pang lamang students
	db.query("INSERT INTO SAVEPOINT VALUES(DEFAULT, ?, ?, ?)",
		[req.body.save_name, req.session.emp_num, req.body.class_id],

		function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
        }
	);

	//so pano gagawin para malaman kung which students ang dapat iadd sa save point na yan? 
	//INSERT INTO SAVE_STUDENT VALUES (1, '2013-00014'); ang example ng add sa SAVE_STUDENT
}

/*------------------*/

/*
	Nacheck ko na rin sa MySQL console ang remove and find functions. Gumagana naman siya ng maayos.
*/

/* This function deletes a save point */
exports.remove = function (req, res, next) {
	db.query("DELETE FROM SAVEPOINT WHERE save_id = ? AND " +
		"class_id = ? AND emp_num = ?",
		[req.body.save_id, req.body.class_id, req.session.emp_num],

		function (err, rows) {
			if (err) {
				return next(err);
			}
			res.send(rows);
		}
	);
}

/* This function searches for a certain save point */
exports.find = function (req, res, next) {
	db.query("SELECT * FROM SAVEPOINT WHERE save_name = ? AND " +
		"class_id = ? AND emp_num = ?",
		[req.body.save_name, req.body.class_id, req.session.emp_num],

		function (err, rows) {
			if(err){
				return next(err);
			}
			res.send(rows);
		}
	);
}