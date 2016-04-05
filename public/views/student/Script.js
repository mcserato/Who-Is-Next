'use strict';

$(document).ready( function () {
    //document.getElementById("main-content");
    console.log(window.location.href);

	const content = $('#student-list');
	//config.checkAuth("FACULTY");
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
                	
                    console.log(data[student].middle_name);

                    var row = $("<li></li>");

                    var student_header = $("<div></div>").addClass("collapsible-header");
                    
                    if(data[student].picture == null){
                        var image = $('<img />',{
                            src: '',
                            alt: 'IMAGE'
                        });                        
                    }else{
                        var image = $('<img />',{
                            alt: 'IMAGE',
                            src: '' + data[student].picture + '' 
                        });
                    }
                    
                    image.addClass("circle")
                    student_header.append(image);

                    var head = $("<span></span>").text(data[student].student_number);
                    head.addClass("title")
                    var text = $("<p></p>").text(data[student].last_name + ", " + data[student].first_name);
                    //text.addClass("center-align");

                    student_header.append(head);
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