var config = {
    TITLE: 'Who Is Next! - A Classroom Selector of Volunteers',
    FRONTEND_URL: process.env.OPENSHIFT_FRONTEND_URL || 'http://localhost:8000/',
    checkAuth: function(expected_role){
    	if(!localStorage.user ||
    			JSON.parse(localStorage.user).role != expected_role){
	        window.location.href = '/';
    	}
    }
};