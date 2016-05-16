var config = {
    TITLE: 'Who Is Next! - A Classroom Selector of Volunteers',
    FRONTEND_URL: 'http://localhost:8000/',
    ROLES: [
        'ADMIN',
        'FACULTY'
    ],

    checkAuth: function(expected_role){
        var user = JSON.parse(localStorage.user);

        if(!expected_role) {
            if ( this.ROLES.indexOf(user.role) < 0 ) {
                return window.location.href = '/';
            }

            return;
        }

    	if(!user || user.role != expected_role){
	        return window.location.href = '/';
    	}
    }
};
