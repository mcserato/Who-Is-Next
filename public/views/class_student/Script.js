'use strict';

$(document).ready( function () {
     //$('select').material_select();
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

	const content = $('#student-list');
	//config.checkAuth("FACULTY");

    /* View Students in a Class*/
    $.ajax({
        url: '/api/class_student/' + localStorage.class_id,
        method: 'GET',
        success: function(data){
        	if(!data){
            	return Materialize.toast("Error in fetching data",2500);
        	}
        	//localStorage.clear();
            //Materialize.toast(data,2500);
            //window.location.href = '/';
            //console.log(data);

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
                            return Materialize.toast(err.responseText,2500);
                        }
                    });
                });

        },
        error: function(err){
            return Materialize.toast(err.responseText,2500);
        }
    });
    
   /* Add Student */
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
            /* Add Student */
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
                /* Add Student to a class */
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

        window.location.href = "/views/class_student"

        return false;
    });
        
    $('.modal-trigger').leanModal();
});