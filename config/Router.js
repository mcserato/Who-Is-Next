var admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');
    analytics_most_called_students = require('../controllers/Analytics.js');
    analytics_most_called_males = require('../controllers/Analytics.js');
    analytics_most_called_females

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

    router.route('analytics/:class_id')
        .get(analytics.getTopTenMostCalledStudents)
        .get(analytics.getTopTenMostCalledMales)
        .get(analytics.getTopTenMostCalledFemales);

    router.route('analytics/:class_id/:class_section')
        .get(analytics.getSectionFrequency);

    router.route('analytics/:class_id/:gender')
        .get(analytics.getGenderFrequency);


    router.route('*')
    .all(function (req, res) {
        return res.status(404).send({ message: 'Nothing to do here.' });
    });

    return router;
};
