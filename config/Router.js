var authenticate = require('../controllers/Authenticate.js'),
    admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');

module.exports = function (router) {
    
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