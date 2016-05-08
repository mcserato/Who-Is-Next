'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;

    if(!localStorage.user &&
        window.location.href != config.FRONTEND_URL){
        window.location.href = '/';
    }
    
    $(document).ready( function () { //to prevent many redirects
        if (localStorage.user) {   
            if (JSON.parse(localStorage.user).role === 'ADMIN') {
                $('.brand-logo').attr('href', '/views/faculty');
            }

            if (JSON.parse(localStorage.user).role === 'FACULTY') {
                $('.brand-logo').attr('href', '/views/get_volunteers');
            }
        }
    });

});

    $('#test5').click(function(){
    
        if ($('.check_box').is(':checked')){
            $('#password').attr('type', 'text');
        }
        else
            $('#password').attr('type', 'password');
    });
