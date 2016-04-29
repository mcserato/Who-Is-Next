'use strict';

$(document).ready( function () {
    config.checkAuth("FACULTY");

	const content = $('#student-list');
    var timeoutID = null;


    function add_data(data){
        for (var student in data){
                var row = $("<li></li>");
                    row.attr("id", data[student].student_number);
                    row.addClass("student-data");
                    row.addClass("modal-trigger");
                    row.attr("href", "#student_modal");
                    var student_header = $("<div></div>").addClass("collapsible-header");
                        if(data[student].picture == null){
                            var image = $('<img />',{
                                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                float: 'left',
                                position: 'relative',
                                width: '10%'
                            });
                        }else{
                            var image = $('<img />',{
                                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                float: 'left',
                                position: 'relative',
                                width: '10%'
                            });
                        }
                        image.addClass("circle");
                        var text = $("<span></span>").html(data[student].last_name + ", " + data[student].first_name + " " + data[student].middle_name );
                        text.addClass("center-align");
                    student_header.append(image);
                    student_header.append(text);
                row.append(student_header);
                content.append(row);
            }

            $('.student-data')
                .click(function(){
                    $.ajax({
                        url: '/api/student/' + $(this).attr("id"),
                        method: 'GET',
                        success: function(data_student){
                            console.log(data_student[0]);
                            $('#student_header').empty();
                            $('#student_number').empty();
                            $('#student_name').empty();
                            $('#student_course').empty();
                            $('#student_college').empty();
                            $('#student_gender').empty();
                            $('#student_birthday').empty();

                            $('#student_header').append($("<span></span>").html(data_student[0].last_name + ", " + data_student[0].first_name + " " + data_student[0].middle_name));
                            $('#student_number').append($("<span></span>").html("Student number: " + data_student[0].student_number));
                            $('#student_course').append($("<span></span>").html("Course: " + data_student[0].course));
                            $('#student_college').append($("<span></span>").html("College: " + data_student[0].college));
                            $('#student_gender').append($("<span></span>").html("Gender: " + data_student[0].gender));
                            $('#student_birthday').append($("<span></span>").html("Birthday: " + data_student[0].birthday));

                            $('#student_modal').openModal();

                        },
                        error: function(err){
                            return Materialize.toast(err.responseText,2500);
                        }
                    });
            });
    }

    function refresh () {
        $.ajax({
            url: '/api/student',
            method: 'GET',
            success: function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }
                add_data(data);
            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });
    }

    function search(str){
        $.ajax({
            url: '/api/student/search/' + str,
            method: 'GET',
            success: function(data_student){
                content.empty();
                add_data(data_student);
            },
            error: function(err){
                refresh();
                return Materialize.toast(err.responseText,2500);
            }
        });
    }

    $('#logout-btn')
        .click(function(){

            $.ajax({
                url: '/api/logout',
                method: 'POST',
                success: function(data){
                    if(!data){
                        return Materialize.toast("Error in Logout. Please try again !",2500);
                    }

                    localStorage.clear();
                    Materialize.toast(data,2500);
                    window.location.href = '/';
                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
            });

        });


    $('#search-student').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();

        }
        content.empty();

        if($(this).val() === ''){
            refresh();
            return;
        }

        search($(this).val());

    });
<<<<<<< HEAD


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
        var name = $("#name_edit").val();
        var email = $("#email_edit").val();
        var username = $("#username_edit").val();
        var old_password = $("#current_password").val();
        var new_password = $("#new_password_edit").val();
        var cnew_password = $("#cnew_password_edit").val();

        if(new_password != cnew_password){
            Materialize.toast("Password does not match !");
            return false;
        }
        else if(old_password !== orig_password){
            alert(orig_password);
            Materialize.toast("Wrong password!");
            return false;
        }
        else if(new_password == "" || new_password == null){
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
                    Materialize.toast(course_code + " edited!", 1000);
                },
                dataType: "JSON"
            });
             return true;
        }

        else{
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
                    Materialize.toast(course_code + " edited!", 1000);
                },
                dataType: "JSON"
            });
             return true;
        }

    });

    $('.modal-trigger').leanModal();


=======

    refresh();
>>>>>>> Dipsy
});
