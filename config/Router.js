var authenticate = require('../controllers/Authenticate.js'),
    admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');
    analytics = require('../controllers/Analytics.js');

module.exports = function (router) {
    router.route('/api/class')
        .post(class_.add)
        .put(class_.edit)
        .get(class_.viewAll)
        .get(class_.viewOne)
        .get(class_.search)
        .delete(class_.removeClass)
        .delete(class_.removeSection);

    router.route('/api/student')
        .post(student.add)
        .put(student.edit)
        .get(student.viewAll)
        .get(student.viewOne)
        .get(student.search)
        .delete(student.removeStudent);

    router.route('/api/class_student')
        .post(class_student.add)
        .get(class_student.searchStudentInClass)
        .get(class_student.viewStudentsInClass)
        .delete(class_student.removeStudentFromClass);

    router.route('/api/faculty')
        .put(faculty.edit)
        .get(faculty.viewAll)
        .get(faculty.viewOne)
        .get(faculty.search)
        .delete(faculty.removeFaculty);

    router.route('/api/analytics/:class_id')
        .get(analytics.getTopTenMostCalledStudents);

    router.route('/api/analyticsMale/:class_id')
        .get(analytics.getTopTenMostCalledMales);

    router.route('/api/analyticsFemale/:class_id')
        .get(analytics.getTopTenMostCalledFemales);

    router.route('/api/analyticsLab/:class_id/:class_section')
        .get(analytics.getSectionFrequency);

    router.route('/api/analyticsGender/:class_id/:gender')
        .get(analytics.getGenderFrequency);

    router.route('/api/login')
        .post(authenticate.login);
    
    router.route('/api/logout')
        .post(authenticate.logout);
    
    router.route('/api/validate')
        .post(admin.validate);    
    
    router.route('/api/signup')
        .put(faculty.signup);
    
    router.route('*')
    .all(function (req, res) {
        return res.status(404).send({ message: 'Nothing to do here.' });
    });
        
    return router;
};
