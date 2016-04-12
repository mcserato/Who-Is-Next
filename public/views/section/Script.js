'use strict';

$(document).ready( function () {
    /* Add Section */
    $('#add-section-form').submit(function (event) {
        var class_section = $("#class_section").val();
        var section_number = $("#section_number").val();

        $.ajax({
            type: "POST",
            url: "/api/class/" + localStorage.course_code,
            data: {
                class_section: class_section,
                section_number: section_number
            },
            success: function(){
                Materialize.toast(course_code + " added!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/section"

        return false;
    });

    $('#edit-class-form').submit(function (event) {
        var class_section = $("#class_section_edit").val();
        var section_number = $("#section_number_edit").val();

        $.ajax({
            type: "PUT",
            url: "/api/class",
            data: {
                class_section: class_section,
                section_number: section_number,
                class_id: localStorage.class_id
            },
            success: function(){
                Materialize.toast(course_code + " added!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/section"

        return false;
    });
    
	const content = $('#section-list');
	config.checkAuth("FACULTY");

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

        $("#course-id").append($("<span></span>").text(localStorage.course_code));
        $("#course-id").append($("<br/>"));

        $.ajax({
            url: '/api/class/' + localStorage.course_code,
            method: 'GET',
            success: function(data){
                $("#course-id").append($("<span></span>").text(data[0].course_title));
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }

                for(var class_ in data){
                    var row = $("<li></li>");
                    var class_header = $("<div></div>").addClass("collapsible-header");
                    row.attr("id", data[class_].class_id);
                    if(data[class_].section_number == null){
                        var head = $("<span></span>").text(data[class_].class_section);
                    }else{
                        var head = $("<span></span>").text(data[class_].class_section + "-" + data[class_].section_number);
                    }
                    
                    var trash = $("<a><i>delete</i></a>");
                    trash.addClass("material-icons right");
                    trash.addClass("remove");
                    trash.attr("class_id", data[class_].class_id);
                        
                    // Modal Trigger
                    var add = $("<a href='#add_student_modal'><i>add</i></a>");
                    var body = $("<a class='edit modal-trigger' href='#edit_modal'><i>mode_edit</i></a>");
                    add.addClass("add-student-button material-icons right modal-trigger");
                    add.attr("class_id", data[class_].class_id);
                    body.attr("class_id", data[class_].class_id);
                    body.addClass("material-icons right");
                    head.addClass("title");
                    head.attr("class_id", data[class_].class_id);
                    class_header.append(add);
                    class_header.append(head);
                    class_body.append(student_info);
                    class_header.append(body);
                    row.append(class_header);
                    row.append(class_body);
                    content.append(row);

                    var class_body = $("<div></div>").addClass("collapsible-body");
                    var student_info = $("<ul></ul>").addClass("collection");  

                    $.ajax({
                        url: '/api/class_student/' + data[class_].class_id,
                        method: 'GET',
                        success: function(student_data){
                            for(var student in student_data){
                                var student_name = $("<li></li>").addClass("collection-item");
                                student_name.text(student_data[student].last_name + ", " + student_data[student].first_name + " " + student_data[student].middle_name );
                                student_info.append(student_name);
                            }
                        },
                        error: function(err){
                            return Materialize.toast(err.responseText,2500);
                        } 
                    });
                }
                
                $('.remove')
                    .click(function(){
                        var class_id = $(this).attr("class_id");
                        if(!confirm("Are you sure you want to delete this section?")) return false;
                        $.ajax({
                            url: '/api/class/' + class_id,
                            method: 'DELETE',
                            data: {
                                class_id: class_id
                            },
                            dataType: "JSON",
                            success: function(data){
                                if(!data){
                                    return Materialize.toast("Error in deleting. Please try again!",2500);
                                }
                                
                                $('#' + class_id).remove();
                                return Materialize.toast("Successfully deleted section!",2500);
                            },
                            error: function(err){
                                return Materialize.toast(err.responseText,2500);
                            }
                        });
                    });

                /* Add Student */
                $('.add-student-button').click(function () {
                    localStorage.class_id = $(this).attr("class_id");
                    $('#add_student_modal').openModal();
                });

                $('.edit')
                    .click(function(){
                        console.log($(this).attr("class_id"));
                        localStorage.class_id = $(this).attr("class_id");
                        $('#edit_modal').openModal();
                    });
            },
        
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
    });

    $('#add-student-form').submit(function (event) {
        var student_number = $("#student_number").val();
        var first_name = $("#first_name").val();
        var middle_name = $("#middle_name").val();
        var last_name = $("#last_name").val();
        var college = $("#college").val();
        var course = $("#course").val();
        var gender;
        if($("#male").val()){
            gender = "M";
        }
        else{
            gender = "F";
        }
        var birthday = $("#birthday").val();
        if (!student_number.match(/^[0-9]{4}-[0-9]{5}$/)) {
            Materialize.toast("Invalid student number", 1000);
        }
        /*if (!birthday.match(/^[0-9]{4} - ([0][0-9] | [1][0-2])$/)) { //YAHHH PAANO TO???
            Materialize.toast("Invalid student number", 1000);
        }*/
        else {
            $.ajax({
                type: "POST",
                url: "/api/student",
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
                success: function(){

                },
                dataType: "JSON"
            }).done(function(data){
                $.ajax({
                    type: "POST",
                    url: "/api/class_student",
                    data: {
                        class_id: localStorage.class_id,
                        student_number: student_number,
                        no_of_times_called: 0
                    },
                    success: function(){
                        Materialize.toast(student_number + " is added!", 1000);
                    },
                    dataType: "JSON"
                });
            });
        }

        return false;
    });

    $('.modal-trigger').leanModal();
});
