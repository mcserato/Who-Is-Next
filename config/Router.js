var admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');
    analytics = require('../controllers/Analytics.js');

module.exports = function (router) {
    router.route('/api/class')
        .post(class_.add)
        .put(class_.edit);

    router.route('/api/student')
        .post(student.add)
        .put(student.edit);

    router.route('/api/class_student')
        .post(class_student.add);

    router.route('/api/faculty')
        .put(faculty.edit);

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


    router.route('*')
    .all(function (req, res) {
        return res.status(404).send({ message: 'Nothing to do here.' });
    });

    return router;
};
