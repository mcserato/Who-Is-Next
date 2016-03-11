var admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');

module.exports = function (router) {
    /* sample
    router.route('/api/admin')
        .get(admin.find)
        .post(admin.add)
        .put(admin.update)
        .delete(admin.delete);
    */
    router.get   ('/student',                               student.view);
    router.get   ('/students/:student_number',              student.search);
    router.post  ('/students',                              student.add);
    //router.put   ('/students',                              student.edit);
    //router.delete('/students',                              student.delete);
    router.get   ('/students/:student_number/:class_id',    class_student.search_students_in_class);
    
    router.get   ('/class/:id',                             class_student.view_students_in_class);
    router.get   ('/class',                                 class_.view);
    router.get   ('/class/:class_id',                       class_.search);
    router.post  ('/class',                                 class_.add);

    router.get   ('/faculty',                               faculty.view);
    router.get   ('/faculty/:emp_num',                      faculty.search);
    router.get   ('/faculty',                               faculty.view_logs);

    router.get   ('/admin',                                 admin.view_websiteLogs);    
    
    router.route('*')
        .all(function (req, res) {
            return res.status(404).send({ message: 'Nothing to do here.?' });
        });

    return router;
};

