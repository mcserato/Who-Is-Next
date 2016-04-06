'use strict';

$(document).ready( function () {

	const content = $('#class-list');

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

    $('#add-class-form').submit(function (event) {
        var course_code = $("#course_code").val();
        var course_title = $("#course_title").val();
        var class_section = $("#class_section").val();
        var section_number = $("#section_number").val();

        $.ajax({
            type: "POST",
            url: "/api/class",
            data: {
                course_code: course_code,
                course_title: course_title,
                class_section: class_section,
                section_number: section_number,
                emp_num: emp_num
            },
            success: function(){
                Materialize.toast("Yey!", 1000);
            },
            dataType: "JSON"
        });

        return false;
    });


    $('.modal-trigger').leanModal();


	//config.checkAuth("FACULTY");
		$.ajax({
            url: '/api/class',
            method: 'GET',
            success: function(data){
            	if(!data){
                	return Materialize.toast("Error in fetching data",2500);
            	}

            	//localStorage.clear();
                //Materialize.toast(data,2500);
                //window.location.href = '/';
              	

                console.log(data[1]);
                for (var class_ in data){

                    var row = $("<li></li>");

                    var class_header = $("<div></div>").addClass("collapsible-header");

                    if(data[class_].section_number == null){
                        var head = $("<span></span>").text(data[class_].class_section);
                    }else{
                        var head = $("<span></span>").text(data[class_].class_section + "-" + data[class_].section_number);
                    }
                    head.addClass("title")

                    class_header.append(head);

                    var class_body = $("<div></div>").addClass("collapsible-body");

                    var class_info = $("<ul></ul>").addClass("collection");
                    
                    var class_number = $("<li></li>").addClass("collection-item");
                    class_number.text("Course Number: " + data[class_].course_code);

                    var class_college = $("<li></li>").addClass("collection-item");
                    class_college.text("Course Title: " + data[class_].course_title);

                    var class_is_archived = $("<li></li>").addClass("collection-item");
                    if(data[class_].is_archived == 1){
                        class_is_archived.text("Course is archived: True");
                        
                    }else{
                        class_is_archived.text("Course is archived: False");
                    }

                    class_info.append(class_number);
                    class_info.append(class_college);
                    class_info.append(class_is_archived);
                    class_body.append(class_info);

                    
                    row.append(class_header);
                    row.append(class_body);

                    content.append(row);
                };

            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

});