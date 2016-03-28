var config = {
    TITLE: 'Who Is Next! - A Classroom Selector of Volunteers',
    FRONTEND_URL: 'localhost:8000/',
    checkAuth: function(expected_role){
    	var user = JSON.parse(localStorage.user);
    	if(user.role != expected_role){
	        window.location.href = '/';
	    }
    }
};