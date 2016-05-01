var config = {
    TITLE: 'Who Is Next! - A Classroom Selector of Volunteers',
    FRONTEND_URL: 'http://whoisnext-teletubbies.rhcloud.com/',
    checkAuth: function(expected_role){
    	if(!localStorage.user ||
    			JSON.parse(localStorage.user).role != expected_role){
	        window.location.href = '/';
    	}
    }
};