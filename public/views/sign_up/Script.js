'use strict';


$(document).ready( function () {
    $('#sign-up')
        .click(sign_up);
    
    $(':input','#sign-up-form')
        .keypress(function (e) {
            if (e.keyCode == 13) {
                login();
            }
        });
    
    function sign_up( ) {
        var full_name = $('#full_name').val(),
            emp_number = $('#emp-number').val(),
            email = $('#email').val(),
            username = $('#username').val(),
            password = $('#password').val(),
            confirm_password = ('#confirm-password').val();
            
        if(!full_name){
            return Materialize.toast("Full Name is missing!", 2500);
        }
        
        if(!emp_number){
            return Materialize.toast("Employee Number is missing!", 2500);
        }
        
        if(!email){
            return Materialize.toast("Email Address is missing!", 2500);
        }
        
        if(!username){
            return Materialize.toast("Username is missing! ", 2500);
        }
        
        if(!password){
            return Materialize.toast("Password is missing! ", 2500);
        }
        
        if(!confirm_password){
            return Materialize.toast("Please confirm password. ", 2500);
        }
        
        if(password != confirm_password){
            return Materialize.toast("Password confirmation did not match!", 2500);
        }

        
    }
}
