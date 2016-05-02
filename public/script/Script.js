'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;

    if(!localStorage.user &&
        window.location.href != config.FRONTEND_URL){
        window.location.href = '/';
    }

});

    $('#test5').click(function(){
    
        if ($('.check_box').is(':checked')){
            $('#password').attr('type', 'text');
        }
        else
            $('#password').attr('type', 'password');
    });
