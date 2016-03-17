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

    router.route('/analytics')
        .get(analytics.view);

    router.route('*')
    .all(function (req, res) {
        return res.status(404).send({ message: 'Nothing to do here.' });
    });

    return router;
};
