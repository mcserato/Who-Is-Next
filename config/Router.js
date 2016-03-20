var admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');

module.exports = function (router) {
    router.route('/api/student')
        .get(student.viewAll)
        .get(student.viewOne)
        .get(student.search);
    
    router.route('/api/class_student')
        .get(class_student.searchStudentInClass)
        .get(class_student.viewStudentsInClass);
        
    router.route('/api/class')
        .get(class_.viewAll)
        .get(class_.viewOne)
        .get(class_.search);
        
    router.route('/api/faculty')
        .get(faculty.viewAll)
        .get(faculty.viewOne)
        .get(faculty.search);
    
    router.route('*')
        .all(function (req, res) {
            return res.status(404).send({ message: 'Nothing to do here.?' });
        });

    return router;
};

