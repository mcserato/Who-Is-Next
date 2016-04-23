'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;

    if(localStorage.user){
        var user = JSON.parse(localStorage.user);
        
        if(user.role == 'ADMIN'){
            window.location.href = 'views/faculty';
        }

        if(user.role == 'FACULTY'){
            window.location.href = '/views/class';
        }

    }
});
