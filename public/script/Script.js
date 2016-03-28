'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;

    $('.modal-trigger').leanModal();

    $('#logo')
        .hover(hoverIn,hoverOut);

    $('#sign-up')
        .hover(hoverIn,hoverOut);

    $('#log-in')
        .hover(hoverIn,hoverOut);

    function hoverIn(){
        $('#logo').attr("src", '/icon/logo1.gif');
    }
    function hoverOut(){
        $('#logo').attr("src", '/icon/logo1.png');
    }

    $('#login')
        .click(function(){
            var username = $('#username').val(),
                password = $('#password').val();

            if(!username){
                return Materialize.toast("Username is missing !", 2500);
            }
            if(!password){
                return Materialize.toast("Password is missing !", 2500);
            }

            // ajax call here
            
        });
});
