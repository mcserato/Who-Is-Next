'use strict';

$(document).ready( function () {
    config.checkAuth("FACULTY"); 
    

    view_class_stud.init('#main-content');
    

});
    

var view_class_stud = {

    student_data : null,

    init : function( main_content ){

        navbar.init('#navbar');
        sidebar.init('#sidebar');

        $(main_content).append([
            '<h2 id="course-id"></h2>',
                '<a class="waves-effect waves-light btn-large" style="background-color: #b42529;" id="randomize"><i class="material-icons right">loop</i>RANDOMIZE</a>',
                '<br/><br/><nav>',
                    '<div class="nav-wrapper row">',
                        '<div class="input-field col l12">',
                            '<input id="search-student" type="search" placeholder="Search Student" required>',
                            '<label for="search-student"><i class="material-icons">search</i></label>',
                            '<i class="material-icons waves-effect waves-light">close</i>',
                        '</div>',
                    '</div>',
                '</nav><br/>',
            '<ul id="student-list"></ul>',
        ].join(''));

        $("#course-id").append( localStorage.course_code );
        $("#course-id").append(" " +    localStorage.class_section );
        $("#course-id").append(localStorage.section_number=="undefined" ?
            '' : '-'+localStorage.section_number);

        $('#search-student').keyup(function () {

            if(!view_class_stud.student_data){
                document.location.reload();
            }else  if($(this).val().trim()==''){
                view_class_stud.manipulateDom(view_class_stud.student_data,"");
            }else{
                view_class_stud.manipulateDom(view_class_stud.student_data, $(this).val());
            }

        });

        $('#add-button').click(function () {
            var student_number = $("#student_number").val(),
                first_name = $("#first_name").val(),
                middle_name = $("#middle_name").val(),
                last_name = $("#last_name").val(),
                college = $("#college").val(),
                course = $("#course").val(),
                birthday = $("#birthday").val(),
                gender;

            
            if(!student_number){
                return Materialize.toast("Please enter student number", 1000);
            }

            if (!student_number.match(/^[0-9]{4}-[0-9]{5}$/)) {
                return Materialize.toast("Invalid student number", 1000);
            }

            if(!first_name || !middle_name || !last_name){
                return Materialize.toast("Please enter complete name", 1000);
            }

            if(!college){
                return Materialize.toast("Please select college", 1000);
            }

            if(!course){
                return Materialize.toast("Please enter course", 1000);
            }

            if(!$("#male").is(':checked') && !$("#female").is(':checked')){
                return Materialize.toast("Please select gender", 1000);
            }

            if(!birthday){
                return Materialize.toast("Please select birthday", 1000);
            }

            gender = (!$("#male").is(':checked') ? "F" : "M");

            $('#add_modal').closeModal();

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
                dataType: "JSON",
                success: function() {
                        $.ajax({
                            type: "POST",
                            url: "/api/class_student",
                            headers: util.headers,
                            data: {
                                class_id: localStorage.class_id,
                                student_number: student_number,
                                no_of_times_called: 0
                            },
                            dataType: "JSON",
                            success: function (result) {
                                 setTimeout(function(){
                                    return Materialize.toast(student_number + " is added!", 1000,"",function(){
                                        window.location.href = "/views/class_student";
                                    });
                                },500);
                            },
                            error: util.errorHandler
                        });
                },
                error: function(err){
                    return Materialize.toast(err.responseText,800,"",function(){
                        if(!view_class_stud.getStudentInfo(student_number) && 
                            confirm("Would you like you like to import data of student "+ 
                            student_number +" to this class ?")){

                            $.ajax({
                                type: "POST",
                                url: "/api/class_student",
                                headers: util.headers,
                                data: {
                                    class_id: localStorage.class_id,
                                    student_number: student_number,
                                    no_of_times_called: 0
                                },
                                dataType: "JSON",
                                success: function (result) {
                                     setTimeout(function(){
                                        return Materialize.toast(student_number + " is added!", 1000,"",function(){
                                            window.location.href = "/views/class_student";
                                        });
                                    },500);
                                },
                                error: util.errorHandler
                            });
                        };
                    });
                }
            });
        });

        $('#edit-student-form').submit(function (event) {
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
                            window.location.href = "/views/class_student";
                        });
                },
                error: util.errorHandler
            });


            return false;
        });

        $.ajax({
            url: '/api/class_student/' + localStorage.class_id,
            method: 'GET',
            headers: util.headers,
            success: view_class_stud.manipulateDom,
            error: util.errorHandler
        });
    },

    manipulateDom : function( data, search ){
        if(!data) {
            return Materialize.toast("Error in fetching data",2500);
        }

        if(!view_class_stud.student_data) {
            view_class_stud.student_data = data;
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
                text = $("<h4></h4>"),
                edit_student = $(["<a title='Edit Student'>",
                                    "<i class='material-icons options-text'>mode_edit</i>",
                                "</a>"].join(''));

            image.attr("src", data[student].picture);
            image.css("width","100px");
            image.css("height","100px");
            image.addClass("red circle center col s2 push-s1 responsive-img");

            text.html(data[student].last_name + ", " + data[student].first_name + " " + data[student].middle_name );
            text.addClass("center-align student-data modal-trigger col s8");
            text.attr("id", data[student].student_number);
            text.attr("href", "#student_modal");
            text.css("width", "80%");

            edit_student.addClass("modal-trigger edit-student-button right col s1");
            edit_student.attr("student_number", data[student].student_number);

            student_header.addClass("collapsible-header");
            student_header.append(image);
            student_header.append(text);
            student_header.append(edit_student);
            row.append(student_header);
            content.append(row);

        }

        if(search_count==0){
            content.append('<br/><h2 class="center">No Students Found</h2>');
            return;
        }

        $('.student-data')
            .click(function(){
                var student_number = $(this).attr("id"),
                    data_student = view_class_stud.getStudentInfo(student_number);

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
                    data_student = view_class_stud.getStudentInfo(student_number);

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
    },

    getStudentInfo : function( student_number ){
        var data = view_class_stud.student_data;

        for (var student in data) {
            if(student_number == data[student].student_number) return data[student];
        }
        return null;
    }

};