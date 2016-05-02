'use strict';

$(document).ready( function () {
    navbar.init('#navbar');
    sidebar.init('#sidebar');

    var content = $('#student-list');

    function addItem (data) {
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
                image.addClass("circle")
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
                    headers: util.headers,
                    success: function(data_student){
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
                        util.errorHandler(err);
                    }
                });
            });
    }

    function Refresh(){

        content.empty();

        $.ajax({
            url: '/api/class_student/' + localStorage.class_id,
            method: 'GET',
            headers: util.headers,
            success: function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }
                //localStorage.clear();
                //Materialize.toast(data,2500);
                //window.location.href = '/';
                //console.log(data);

                addItem(data);

            },
            error: function(err){
                util.errorHandler(err);
            }
        });
    }

    if (localStorage.section_number.length == 0 || localStorage.section_number == "undefined") {
        $("#course-id").append($("<h2></h2>")
            .text(
                localStorage.course_code + ' ' +
                localStorage.class_section
            )
        );
    } else {
        $("#course-id").append($("<h2></h2>")
            .text(
                localStorage.course_code + ' ' +
                localStorage.class_section + '-' + localStorage.section_number
            )
        );
    }

    $('#search-class-student').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            //window.location.href = "/search/class";
        }
            content.empty();


            if($(this).val() == ''){
                return;
            }

            $.ajax({
                url: '/api/class_student/search/' + localStorage.class_id +'/' + $(this).val(),
                method: 'GET',
                headers: util.headers,
                success: function(searchdata){
                    if(!searchdata){
                        Refresh();
                        return Materialize.toast("Error in fetching data",2500);
                    }

                    addItem(searchdata);
                },
                error: function(err){
                    if(e.keyCode == 13){
                        Refresh();
                        util.errorHandler(err);
                    }
                }
            });
    });

    /* View Students in a Class*/
    //Refresh();

    //const content = $('#student-list');
    //config.checkAuth("FACULTY");

    /* View Students in a Class*/
    $.ajax({
        url: '/api/class_student/' + localStorage.class_id,
        method: 'GET',
        headers: util.headers,
        success: function (data) {
            if(!data) {
                return Materialize.toast("Error in fetching data",2500);
            }

            for (var student in data) {
                var row = $("<li></li>");

                var student_header = $("<div></div>").addClass("collapsible-header");
                if(data[student].picture == null) {
                    var image = $('<img />', {
                        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                        float: 'left',
                        position: 'relative',
                        width: '10%'
                    });
                }

                else{
                    var image = $('<img />', {
                        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                        float: 'left',
                        position: 'relative',
                        width: '10%'
                    });
                }

                image.addClass("circle");

                var text = $("<span></span>").html(data[student].last_name + ", " + data[student].first_name + " " + data[student].middle_name );
                text.addClass("center-align student-data modal-trigger");
                text.attr("id", data[student].student_number);
                text.attr("href", "#student_modal");

                var edit_student = $("<a title='Edit Student' href='#edit_student_modal'><i class='material-icons options-text'>mode_edit</i></a>");
                edit_student.addClass("modal-trigger edit-student-button right");
                edit_student.attr("student_number", data[student].student_number);

                student_header.append(image);
                student_header.append(text);
                student_header.append(edit_student);
                row.append(student_header);
                content.append(row);
            }

            $('.student-data').click(function () {
                $.ajax({
                    url: '/api/student/' + $(this).attr("id"),
                    method: 'GET',
                    headers: util.headers,
                    success: function (data_student) {
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
                    error: function (err) {
                        util.errorHandler(err);
                    }
                });
            });

            /* Edit Student */
            $('.edit-student-button').click(function () {
                localStorage.student_number = $(this).attr("student_number");

                $.ajax({
                    url: '/api/student/' + $(this).attr("student_number"),
                    method: 'GET',
                    headers: util.headers,
                    success: function(data_student){

                        $('#student_number_edit').val(data_student[0].student_number);
                        $('#first_name_edit').val(data_student[0].first_name);
                        $('#middle_name_edit').val(data_student[0].middle_name);
                        $('#last_name_edit').val(data_student[0].last_name);
                        $('#course_edit').val(data_student[0].course);
                        $('#college_edit').val(data_student[0].college);
                        $('#birthday_edit').val(data_student[0].birthday);

                        $('#edit_student_modal').openModal();

                    },
                    error: function(err){
                        util.errorHandler(err);
                    }
                });
            });
        },
        error: function (err) {
            util.errorHandler(err);
        }
    });

    /* Edit Student */
    $('#edit-student-form').submit(function (event) {
        // Get data from input fields of edit student form
        var student_number = $("#student_number_edit").val();
        var first_name = $("#first_name_edit").val();
        var middle_name = $("#middle_name_edit").val();
        var last_name = $("#last_name_edit").val();
        var college = $("#college_edit").val();
        var course = $("#course_edit").val();
        var gender;
        if($("#male_edit").val()) {
            gender = "M";
        }
        else{
            gender = "F";
        }
        var birthday = $("#birthday_edit").val();
        $.ajax({
            type: "PUT",
            url: "/api/student",
            headers: util.headers,
            data: {
                student_number_new: student_number,
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                college: college,
                course: course,
                gender: gender,
                birthday: birthday,
                student_number: localStorage.student_number
            },
            success: function () {
                Materialize.toast(student_number + " successfully edited!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/class_student";

        return false;
    });

   /* Add Student */
    $('#add-student-form').submit(function (event) {
        // Get data from input fields of add student form
        var student_number = $("#student_number").val();
        var first_name = $("#first_name").val();
        var middle_name = $("#middle_name").val();
        var last_name = $("#last_name").val();
        var college = $("#college").val();
        var course = $("#course").val();
        var gender;

        if ($("#male").is(':checked')) {
            gender = "M";
        } else {
            gender = "F";
        }

        var birthday = $("#birthday").val();
        if (!student_number.match(/^[0-9]{4}-[0-9]{5}$/)) {
            Materialize.toast("Invalid student number", 1000);
        } else {
            /* Add Student */
            $.ajax({
                type: "POST",
                url: "/api/student",
                headers: util.headers,
                data: {
                    student_number: student_number,
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                    college: college,
                    course: course,
                    gender: gender,
                    birthday: birthday
                },
                success: function() {
                     /* Add Student to a class */

                    $.ajax({
                        type: "POST",
                        url: "/api/class_student",
                        headers: util.headers,
                        data: {
                            class_id: localStorage.class_id,
                            student_number: student_number,
                            no_of_times_called: 0
                        },
                        success: function (result) {
                            Materialize.toast(student_number + " is added!", 1000);
                            window.location.href = "/views/class_student";
                        },
                        dataType: "JSON"
                    });
                },
                dataType: "JSON"
            });
        }

        return false;
    });

});
