'use strict';

$(document).ready( function () {
    document.title += document.title
        ? ' - ' + config.TITLE
        : config.TITLE;

    if(localStorage.user){

        var user = JSON.parse(localStorage.user);
        
        if(user.role == 'ADMIN'){
            window.location.href = '/views/faculty';
        }
        if(user.role == 'FACULTY'){
            if(!user.is_validated){
                window.location.href = '/not_validated'
            }else{
                window.location.href = '/views/class';
            }
        }

    }

    $("#log-in-page").hide();
    $("#sign-up-page").hide();

    $('#log-in-link')
        .hover(hoverIn,hoverOut);

    $('#sign-up-link')
        .hover(hoverIn,hoverOut);

    $('#log-in-logo-link')
        .hover(hoverIn,hoverOut);

    $('#main-logo-link')
        .hover(hoverIn,hoverOut);

    $('#sign-up-logo-link')
        .hover(hoverIn,hoverOut);

    $("#log-in-link").click(function () {
        $("#log-in-page").slideDown();
        $("#landing").slideUp();
        return false;
    });

    $(".landing-link").click(function () {
        $("#sign-up-page").slideUp();
        $("#log-in-page").slideUp();
        $("#landing").slideDown();
        return false;
    });

    $("#sign-up-link").click(function () {
        $("#sign-up-page").slideDown();
        $("#landing").slideUp();
        return false;
    });    

    function hoverIn(){
        $('#main-logo-link').attr("src", '/icon/logo1.gif');
        $('#sign-up-logo-link').attr("src", '/icon/logo1.gif');
        $('#log-in-logo-link').attr("src", '/icon/logo1.gif');
    }
    function hoverOut(){
        $('#main-logo-link').attr("src", '/icon/logo1.png');
        $('#sign-up-logo-link').attr("src", '/icon/logo1.png');
        $('#log-in-logo-link').attr("src", '/icon/logo1.png');

    }

    $('#login-btn')
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
            window.location.href = '/views/faculty';
        }
        if(user.role == "FACULTY"){
            if(!user.is_validated){
                window.location.href = '/not_validated'
            }else{
                window.location.href = '/views/class';
            }
        }
    }


});
