'use strict';

$(document).ready( function () {

	const content = $('#student-list');
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


        $.ajax({
            url: '/api/student',
            method: 'GET',
            success: function(data){
            	if(!data){
                	return Materialize.toast("Error in fetching data",2500);
            	}
            	//localStorage.clear();
                //Materialize.toast(data,2500);
                //window.location.href = '/';
                for (var student in data){

                    var row = $("<li></li>");

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
                    student_header.append(image);

                    var text = $("<span></span>").html(data[student].last_name + ", " + data[student].first_name + " (" + data[student].student_number + ")");
                    text.addClass("center-align");

                    student_header.append(text);

                    var student_body = $("<div></div>").addClass("collapsible-body");

                    var student_info = $("<ul></ul>").addClass("collection");
                    
                    var student_number = $("<li></li>").addClass("collection-item");
                    student_number.text("Student Number: " + data[student].student_number);

                    var student_name = $("<li></li>").addClass("collection-item");
                    student_name.text("Name: " + data[student].last_name + ", " + data[student].first_name + " " + data[student].middle_name);

                    var student_college = $("<li></li>").addClass("collection-item");
                    student_college.text("College: " + data[student].college);

                    var student_course = $("<li></li>").addClass("collection-item");
                    student_course.text("Course: " + data[student].course);

                    var student_gender = $("<li></li>").addClass("collection-item");
                    student_gender.text("Gender: " + data[student].gender);

                    student_info.append(student_number);
                    student_info.append(student_name);
                    student_info.append(student_college);
                    student_info.append(student_course);
                    student_info.append(student_gender);
                    student_body.append(student_info);

                    
                    row.append(student_header);
                    row.append(student_body);

                    content.append(row);
                };

            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

});