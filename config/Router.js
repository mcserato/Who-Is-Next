var admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');
    analytics = require('../controllers/Analytics.js');


module.exports = function (router) {
    /* sample
    router.route('/api/admin')
        .get(admin.find)
        .post(admin.add)
        .put(admin.update)
        .delete(admin.delete);
    */

    router.route('/class')
        .post(class_.add)
        .put(class_.edit);

    router.route('/student')
        .post(student.add)
        .put(student.edit);

    router.route('/class_student')
        .post(class_student.add);

    router.route('/faculty')
        .put(faculty.edit);

    router.route('/analytics/:class_id')
        .get(analytics.getTopTenMostCalledStudents);

    router.route('/analyticsMale/:class_id')
        .get(analytics.getTopTenMostCalledMales);

    router.route('/analyticsFemale/:class_id')
        .get(analytics.getTopTenMostCalledFemales);

    router.route('/analyticsLab/:class_id/:class_section')
        .get(analytics.getSectionFrequency);

    router.route('/analyticsGender/:class_id/:gender')
        .get(analytics.getGenderFrequency);


    router.route('*')
    .all(function (req, res) {
        return res.status(404).send({ message: 'Nothing to do here.' });
    });

    return router;
};
