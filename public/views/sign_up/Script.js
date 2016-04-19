'use strict';


$(document).ready( function () {
    $('#sign-up')
        .click(sign_up);

    $(':input','#sign-up-form')
        .keypress(function (e) {
            if (e.keyCode == 13) {
                sign_up();
            }
        });

    function sign_up( ) {
        console.log("check");
        var full_name = $('#full-name').val(),
            emp_number = $('#emp-num').val(),
            email = $('#email').val(),
            username = $('#sign-up-username').val(),
            password = $('#sign-up-password').val(),
            confirm_password = $('#confirm-password').val();

        if(!full_name){
            return Materialize.toast("Full Name is missing!", 2500);
        }

        if(!emp_number){
            return Materialize.toast("Employee Number is missing!", 2500);
        }

        if(!emp_number.match(/[0-9]{9}/)){
            return Materialize.toast("Employee Number should be numbers only!", 2500);
        }

        if((emp_number.toString()).length != 9){
            return Materialize.toast("Employee Number should be 9 digits!", 2500);
        }

        if(!email){
            return Materialize.toast("Email Address is missing!", 2500);
        }

        if(!email.match(/\S+@\S+/)){
            return Materialize.toast("Invalid Email Address", 2500);
        }
		
		if(!username.match(/^[a-zA-Z0-9]+$/)){
            return Materialize.toast("Invalid username", 2500);
        }
        if(!username){
            return Materialize.toast("Username is missing! ", 2500);
        }
		
		if(!password.match(/[^\s]/)){
            return Materialize.toast("Invalid Password", 2500);
        }
        if(!password){
            return Materialize.toast("Password is missing! ", 2500);
        }
        if(password.length < 8){
            return Materialize.toast("Password too short! ", 2500);
        }
        if(password.length > 50){
            return Materialize.toast("Password too long! ", 2500);
        }

        if(!confirm_password){
            return Materialize.toast("Please confirm password. ", 2500);
        }

        if(password != confirm_password){
            console.log(password);
            console.log(confirm_password);
            return Materialize.toast("Password confirmation did not match!", 2500);
        }

        //add ajax here
        $.ajax({
            url: '/api/signup',
            method: 'PUT',
            data: {
                full_name: full_name,
                emp_num: emp_number,
                email: email,
                username: username,
                password: password

            },
            dataType: 'json',
            success: function(data){
                console.log("tama");
                return Materialize.toast("Successfully signed up. Wait to be validated.",2500,"",function(){
                    return window.location.href = "http://127.0.0.1:8000/";
                });

            },
            error: function(err){
                console.log("mali");
                return Materialize.toast(err.responseText,2500);
            }
        });

    }
});
