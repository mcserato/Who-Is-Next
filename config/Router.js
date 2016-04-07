var authenticate = require('../controllers/Authenticate.js'),
    admin = require('../controllers/Admin.js'),
    class_ = require('../controllers/Class.js'),
    class_student = require('../controllers/ClassStudent.js'),
    faculty = require('../controllers/Faculty.js'),
    student = require('../controllers/Student.js');
    analytics = require('../controllers/Analytics.js');
    randomizer = require('../controllers/Randomizer.js');

var path = require('path');

module.exports = function (router) {
    router.route('/api/class')
        .post(class_.add)
        .put(class_.edit)
        .get(class_.viewAll)
        .delete(class_.removeClass);
        
    router.route('/api/class/:class_id')
        .get(class_.viewOne)
        .delete(class_.removeSection);
        
    router.route('/api/class/:course_code')
        .get(class_.search);

    //router.route('/api/archiveClass')
        //.post(class_.archiveClass);
        
    router.route('/api/student')
        .post(student.add)
        .put(student.edit)
        .get(student.viewAll)
        .delete(student.removeStudent);
        
    router.route('/api/student/:student_number')        
        .get(student.viewOne);
        
    router.route('/api/student/:last_name')
        .get(student.search);

    router.route('/api/class_student')
        .post(class_student.add)
        .get(class_student.viewStudentsInClass)
        .delete(class_student.removeStudentFromClass);

    router.route('/api/class_student/:student_number')
        .get(class_student.searchStudentInClass);
        
    router.route('/api/faculty')
        .put(faculty.edit)
        .get(faculty.viewAll)
        .delete(faculty.removeFaculty);

    router.route('/api/faculty/:emp_num')
        .get(faculty.viewOne);
    
    router.route('/api/faculty/:name')
        .get(faculty.search);
        
    router.route('/api/analytics/:class_id')
        .get(analytics.getTopTenMostCalledStudents);
        
   router.route('/api/analyticsMale/:class_id')
        .get(analytics.getTopTenMostCalledMales);     

    router.route('/api/analyticsFemale/:class_id')
        .get(analytics.getTopTenMostCalledFemales);
        
    router.route('/api/analyticsGetSection/:class_id')
       .get(analytics.getSection);
            
    router.route('/api/analyticsLab/:class_section')
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
        
    router.route('/api/randomizer/')
        .get(randomizer.getVolunteers);
    
    router.route('/api/switch_theme')
        .get(faculty.getTheme)
        .put(faculty.switchTheme);
        
    router.route('/api/import')
        .post(class_student.import);  

    router.route('*')
        .all(function (req, res) {		
            return res.status(404).sendFile(path.resolve(__dirname + '/../public/404.html'));		
        });
        
    return router;
};
