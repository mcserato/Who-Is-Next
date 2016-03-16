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
    router.route('/api/letter_section')
        .delete(class_.removeLetterSection);
        
    router.route('/api/number_section')
        .delete(class_.removeNumberSection);
        
    router.route('/api/remove_class')
    	.delete(class_.removeClass);
        
    router.route('/api/remove_student_from_class')
        .delete(class_student.removeStudentFromClass);

    router.route('/api/student')
        .delete(student.remove);

    router.route('*')
        .all(function (req, res) {
            return res.status(404).send({ message: 'Nothing to do here.' });
        });

    return router;
};

