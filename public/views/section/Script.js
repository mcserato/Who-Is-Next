'use strict';

$(document).ready( function () {

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
                //localStorage.clear();
                //Materialize.toast(data,2500);
                //window.location.href = '/';


                for(var class_ in data){
                    console.log(data[class_]);
                    var row = $("<li></li>");
                    var class_header = $("<div></div>").addClass("collapsible-header");
                        if(data[class_].section_number == null){
                            var head = $("<span></span>").text(data[class_].class_section);
                        }else{
                            var head = $("<span></span>").text(data[class_].class_section + "-" + data[class_].section_number);
                        }
                        head.addClass("title");
                    class_header.append(head);

                    var class_body = $("<div></div>").addClass("collapsible-body");
                        var student_info = $("<ul></ul>").addClass("collection");  

                            /*$.ajax({
                               url: '/api/class_student/',
                                method: 'GET',
                                success: function(student-data){

                                } 
                            });*/

                            var student_name = $("<li></li>").addClass("collection-item");
                            student_name.text("gjh");
                        student_info.append(student_name);

                    class_body.append(student_info);

                    row.append(class_header);
                    row.append(class_body);

                    content.append(row);
                }

            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

});