
'use strict';

const importer = require('anytv-node-importer');
const path = require('path');

module.exports = function (router) {

    const __ =importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.post('/api/validate',                                               __.Admin.validate);

    router.get('/api/analytics/:class_id',                                     __.Analytics.getTopTenMostCalledStudents);
    router.get('/api/analyticsMale/:class_id',                                 __.Analytics.getTopTenMostCalledMales);
    router.get('/api/analyticsFemale/:class_id',                               __.Analytics.getTopTenMostCalledFemales);
    router.get('/api/analyticsLab/:class_section',                             __.Analytics.getSectionFrequency);
    router.get('/api/analyticsGender/:class_id/:gender',                       __.Analytics.getGenderFrequency);
    router.get('/api/analyticsGetSection/:class_id',                           __.Analytics.getSection);

    router.post('/api/login',                                                  __.Authenticate.login);
    router.post('/api/logout',                                                 __.Authenticate.logout);
    router.get('/api/session',                                                 __.Authenticate.checkSession);

    router.get('/api/class',                                                   __.Class.viewAll);
    router.post('/api/class',                                                  __.Class.add);
    router.put('/api/class',                                                   __.Class.edit);
    router.del('/api/class',                                                   __.Class.removeClass);

    router.get('/api/class2',                                                  __.Class.viewClasses);
    router.put('/api/class2',                                                  __.Class.editClass);

    router.get('/api/class/:course_code',                                      __.Class.viewOne);
    router.post('/api/class/:course_code',                                     __.Class.addSection);
    router.del('/api/class/:course_code',                                      __.Class.removeSection);
        
    router.get('/api/class/search/:course_code',                               __.Class.search);

    router.post('/api/class_student/',                                         __.ClassStudent.add)
    router.del('/api/class_student/',                                          __.ClassStudent.remove);

    router.get('/api/class_student/:class_id',                                 __.ClassStudent.view);

    router.get('/api/class_student/search/:class_id/:last_name',               __.ClassStudent.search);

    router.post('/api/import',                                                 __.ClassStudent.import);

    router.get('/api/faculty',                                                 __.Faculty.viewAll);
    router.put('/api/faculty',                                                 __.Faculty.edit);
    router.del('/api/faculty',                                                 __.Faculty.remove);
 
    router.get('/api/faculty/search/:name',                                    __.Faculty.search);

    router.get('/api/faculty/:emp_num',                                        __.Faculty.viewOne);

    router.get('/api/faculty/:name',                                           __.Faculty.search);

    router.put('/api/signup',                                                  __.Faculty.signup);

    router.get('/api/switch_theme',                                            __.Faculty.getTheme)
    router.put('/api/switch_theme',                                            __.Faculty.switchTheme);

    router.post('/api/randomizer/:class_id',                                   __.Randomizer.getVolunteers);

    router.get('/api/student',                                                 __.Student.viewAll);
    router.post('/api/student',                                                __.Student.add);
    router.put('/api/student',                                                 __.Student.edit);
    router.del('/api/student',                                                 __.Student.remove);
        
    router.get('/api/student/search/:last_name',                               __.Student.search);

    router.get('/api/student/:student_number',                                 __.Student.viewOne);

    router.get('/api/logs',                                                    __.Log.read);

    router.all('*', function(req, res){
        if (req.get('Accept').match(/application\/json/) === null) {
            res.status(404).sendFile(path.resolve(__dirname + '/../public/404.html'));
        }
    });

    return router;
};
