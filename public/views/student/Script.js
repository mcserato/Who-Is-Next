'use strict';

$(document).ready( function () {
    config.checkAuth();

    faculty_student.init('#main-content');
});

var faculty_student = {

    student_data : null,

    init : function( main_content ){

        navbar.init("#navbar");
        sidebar.init("#sidebar");

        $(main_content).append([
            '<h1 class="center">Students</h1>',
                '<br/><nav>',
                    '<div class="nav-wrapper row">',
                        '<div class="input-field col l12">',
                            '<input id="search-student" type="search" placeholder="Search Student" required>',
                            '<label for="search-student"><i class="material-icons">search</i></label>',
                            '<i class="material-icons waves-effect waves-light">close</i>',
                        '</div>',
                    '</div>',
                '</nav><br/>',
            '<ul id="student-list"></ul>'
        ].join(''));

        $('#search-student').keyup(function () {

            if(!faculty_student.student_data){
                document.location.reload();
            }else  if($(this).val().trim()==''){
                faculty_student.manipulateDom(faculty_student.student_data,"");
            }else{
                faculty_student.manipulateDom(faculty_student.student_data, $(this).val());
            }

        });

        $('#edit-button').click(function () {
            // Get data from input fields of edit student form
            var student_number = $("#student_number_edit").val(),
                first_name = $("#first_name_edit").val(),
                middle_name = $("#middle_name_edit").val(),
                last_name = $("#last_name_edit").val(),
                college = $("#college_edit").val(),
                course = $("#course_edit").val(),
                gender = (!$("#male_edit").is(':checked') ? "F" : "M"),
                birthday = $("#birthday_edit").val();
           
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
                dataType: "JSON",
                success: function () {
                    Materialize.toast(localStorage.student_number + " successfully edited!", 1000, "",
                        function(){
                            window.location.href = "/views/student";
                        });
                },
                error: util.errorHandler
            });


            return false;
        });

        $.ajax({
            url: '/api/student',
            method: 'GET',
            headers: util.headers,
            success: faculty_student.manipulateDom,
            error: util.errorHandler
        });
    },

    manipulateDom : function( data, search ){
        if(!data) {
            return Materialize.toast("Error in fetching data",2500);
        }

        if(!faculty_student.student_data) {
            faculty_student.student_data = data;
        }

        var content = $('#student-list'),
            search_string = 
                (search=="success" || search=="fail" || !search) ?
                    "" : search.toLowerCase(),
            search_count = data.length;

        if(!data || !data.length){
            content.append('<br/><br/><h2 class="center">No Students Found</h2>');
            return;
        } 

        content.empty();

        for (var student in data) {

            if(search_string &&
                  !new RegExp(search_string).test(
                        (data[student].last_name || '').toLowerCase()+' '+
                        (data[student].first_name || '').toLowerCase()+' '+
                        (data[student].middle_name || '').toLowerCase()
                    ) ){
                search_count--;
                continue;
            }

            var row = $("<li></li>"),
                student_header = $("<div class='row'></div>"),
                image = $('<img/>'),
                text = $("<div></div>"),
                options = $("<div></div>"),
                edit_student = $(["<a title='Edit Student'>",
                                    "<i class='material-icons options-text'>mode_edit</i>",
                                "</a>"].join('')),
                delete_student = $(["<a title='Delete Student'>",
                                    "<i class='material-icons options-text'>delete</i>",
                                "</a>"].join(''));

            image.attr("src", data[student].picture);
            image.css("width","100px");
            image.css("height","100px");
            image.css("background-color","#b42529");
            image.addClass("circle center col s2 push-s1 responsive-img");

            text.append("<h4>"+
                data[student].last_name + ", " +
                data[student].first_name + " " +
                data[student].middle_name + "</h4>"
            );
            text.addClass("center-align student-data modal-trigger col s8");
            text.attr("id", data[student].student_number);
            text.attr("href", "#student_modal");
            text.css("width", "80%");
            text.css("padding", "2%");

            edit_student.addClass("modal-trigger edit-student-button");
            edit_student.attr("student_number", data[student].student_number);

            delete_student.addClass("remove");
            delete_student.attr("student_number", data[student].student_number);

            options.attr("id", data[student].student_number + "-options");
            options.addClass("options col s1");
            options.append(edit_student);
            options.append(delete_student);
            options.css("margin","0");
            options.css("padding","0");
            
            student_header.attr("student_number", data[student].student_number);
            student_header.addClass("collapsible-header student-div");
            student_header.append(image);
            student_header.append(text);
            student_header.append(options);
            student_header.css("padding","0");

            row.append(student_header);
            content.append(row);
        }

        if(search_count==0){
            content.append('<br/><h2 class="center">No Students Found</h2>');
            return;
        }

        $('.options').hide();

        $('.student-div').hover(
            function(){
                $('#' + $(this).attr("student_number")+"-options").show();
            },function(){
                $('#' + $(this).attr("student_number")+"-options").hide();
            }
        );

        $('.student-data')
            .click(function(){
                var student_number = $(this).attr("id"),
                    data_student = faculty_student.getStudentInfo(student_number);

                $('#student-picture').attr("src",data_student.picture);

                $('#student_header').html($("<span></span>").html(data_student.last_name + ", " + data_student.first_name + " " + data_student.middle_name));
                $('#student_no').html($("<span></span>").html("Student number: " + data_student.student_number));
                $('#student_course').html($("<span></span>").html("Course: " + data_student.course));
                $('#student_college').html($("<span></span>").html("College: " + data_student.college));
                $('#student_gender').html($("<span></span>").html("Gender: " + data_student.gender));
                $('#student_birthday').html($("<span></span>").html("Birthday: " + util.dateParser(data_student.birthday)));

                $('#student_modal').openModal();
            });

        $('.edit-student-button')
            .click(function () {
                var student_number = $(this).attr("student_number"),
                    data_student = faculty_student.getStudentInfo(student_number);

                localStorage.student_number = student_number;

                $('#student_number_edit').val(data_student.student_number);
                $('#first_name_edit').val(data_student.first_name);
                $('#middle_name_edit').val(data_student.middle_name);
                $('#last_name_edit').val(data_student.last_name);
                $('#course_edit').val(data_student.course);
                $('#college_edit').val(data_student.college);
                $('#birthday_edit').val(util.dateParser(data_student.birthday));

                if(data_student.gender == "M"){
                    $('#male_edit').click();
                }else{
                    $('#female_edit').click();
                }

                $('#edit_student_modal').openModal();
            });

        $('.remove')
            .click(function () {
                var student_number = $(this).attr("student_number");

                if(confirm("Are you sure you want to remove student "+ student_number + " in all your class ?")){
                    $.ajax({
                        method: "DELETE",
                        url: "/api/student",
                        headers: util.headers,
                        data: {
                            student_number: student_number
                        },
                        dataType: "JSON",
                        success: function (result) {
                            setTimeout(function(){
                                return Materialize.toast("Successfully remove - " + student_number + " !", 1000
                                    ,"",function(){
                                        window.location.href = "/views/student";
                                });
                            },500);
                        },
                        error: util.errorHandler
                    });
                }
            });
    },

    getStudentInfo : function( student_number ){
        var data = faculty_student.student_data;

        for (var student in data) {
            if(student_number == data[student].student_number) return data[student];
        }
        return null;
    }
};
