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

                for (var class_ in data){
                    var row = $("<li></li>");
                    var class_header = $("<div></div>").addClass("collapsible-header");                    
                    var head = $("<span></span>").text(data[class_].course_code);
                    var body = $("<i>delete</i>");
                    body.addClass("material-icons right");
                    row.attr("course_code", data[class_].course_code);
                    row.addClass("courses");
                    head.addClass("title");
                    
                    class_header.append(body);
                    class_header.append(head);
                    row.append(class_header);
                    content.append(row);
                }

                $('.courses')
                    .click(function(){
                        console.log($(this).attr("course_code"));
                        localStorage.course_code = $(this).attr("course_code");
                        window.location.href = "/views/section";

                    });

            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

});
