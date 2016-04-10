'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;

    if(localStorage.user){

        var user = JSON.parse(localStorage.user);
        
        if(user.role == 'ADMIN'){
            window.location.href = '/admin';
        }
        if(user.role == 'FACULTY'){
            window.location.href = '/faculty';
        }

    }

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
        .click(login);

    $(':input','#log-in-form')
        .keypress(function (e) {
            if (e.keyCode == 13) {
                login();
            }
        });

    function login(){
        var username = $('#username').val(),
            password = $('#password').val();

        if(!username){
            return Materialize.toast("Username is missing !", 2500);
        }
        if(!password){
            return Materialize.toast("Password is missing !", 2500);
        }

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            success: login_success,
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });
    }

    function login_success(data){
        var user = data[0];
        
        if(!user || !user.role){
            return Materialize.toast("Login failed. Please try again !", 2500);
        }

        localStorage.user = JSON.stringify(user);

        if(user.role == "ADMIN"){
            window.location.href = '/admin';
        }
        if(user.role == "FACULTY"){
            window.location.href = '/faculty';
        }
    }
});
