var admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');
    randomizer = require('../controllers/Randomizer.js');

module.exports = function (router) {
    router.route('/api/class')
        .delete(class_.removeClass)
        .delete(class_.removeSection);
        
    router.route('/api/class_student')
        .delete(class_student.removeStudentFromClass);

    router.route('/api/student')
        .delete(student.removeStudent);
        
    router.route('/api/faculty')
        .delete(faculty.removeFaculty);
        
    router.route('/api/randomizer/')
        .get(randomizer.getVolunteers);
        
    router.route('*')
        .all(function (req, res) {
            return res.status(404).send({ message: 'Nothing to do here.' });
        });

    return router;
};
