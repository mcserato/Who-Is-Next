'use strict';

$(document).ready( function () {

    navbar.init('#navbar');
    sidebar.init('#sidebar');
    
    $.ajax({
        url: '/api/class2/',
        method: 'GET',
        success: function(data) {
            var classes = data.classes;
            var courses = data.degree_programs;
            var college = data.colleges;

            for(var i in classes) {      
                $('#class-filter').append(
                    '<option value=' + classes[i].class_id + '>' + classes[i].course_code + ' ' + classes[i].class_section + (classes[i].section_number || '') +'</option>'
                );
            }
            
            for (var i in courses) {
                $('#course-filter').append(
                    '<option value=' + courses[i].course + '>' + courses[i].course + '</option>'
                );
            }
            
            for (var i in college) {
                $('#college-filter').append(
                    '<option value=' + college[i].college + '>' + college[i].college + '</option>'
                );
            } 
        },
        error: function(err){
            return Materialize.toast(err.responseText,2500);
        }
    });
    
    $('#randomize')
        .click(function(){
           
            var class_id = $('#class-filter').val();
            
            $.ajax({
                url: '/api/randomizer/' + class_id,
                method: 'POST',
                data: {
                    class_id    : class_id,
                    last_name   :$('#last-name-filter').val(),
                    first_name  :$('#first-name-filter').val(),
                    birthday    :$('#birthday-filter').val(),
                    course      :$('#course-filter').val(),
                    college     :$('#college-filter').val(),
                    batch       :$('#batch-filter').val(),
                    number      :$('#number-filter').val()
                },
                success: function(data) {
                    for(var i in data) {
                        console.log(data[i]);
                        alert(data[i].first_name + " " + data[i].last_name);
                    }
                },
                dataType: "JSON"
            });
        
    });
    
     var emp_no = JSON.parse(localStorage.user).emp_num;
     var orig_password;
         
         /* Fills Up Areas */
         $.ajax({
                type: "GET",
                url: "/api/faculty/"+emp_no
             }).done(function(info){
                $("#name_edit").val(info[0].name);
                $("#email_edit").val(info[0].email);
                $("#username_edit").val(info[0].username);
                orig_password = info[0].password;   
             });   
            

        /*Edit User*/
    $('#edit-user-form').submit(function (event) {
        // Get data from input fields of edit user form
        var name = $("#name_edit").val();
        var email = $("#email_edit").val();
        var username = $("#username_edit").val();
        var old_password = $("#current_password").val();
        var new_password = $("#new_password_edit").val();
        var cnew_password = $("#cnew_password_edit").val();

        if (new_password != cnew_password) {
            Materialize.toast("Password does not match !");
            return false;
        } else if (old_password !== orig_password) {
            alert(orig_password);
            Materialize.toast("Wrong password!");
            return false;
        } else if (new_password == "" || new_password == null) {
            $.ajax({
                type: "PUT",
                url: "/api/faculty",
                data: {
                    name: name,
                    username: username,
                    password: info[0].password,
                    email: email,
                    emp_num: emp_no
                },
                success: function(){
                    Materialize.toast("Account successfully edited!", 1000);
                },
                dataType: "JSON"
            });

            return true;
        } else {
            $.ajax({
                type: "PUT",
                url: "/api/faculty",
                data: {
                    name: name,
                    username: username,
                    password: new_password,
                    email: email,
                    emp_num: emp_no
                },
                success: function(){
                    Materialize.toast("Account successfully edited!", 1000);
                },
                dataType: "JSON"
            });

            return true;
        }
    });
     
});
