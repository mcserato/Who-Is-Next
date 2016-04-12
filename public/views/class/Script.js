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


	config.checkAuth("FACULTY");
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
                    var trash = $("<a><i>delete</i></a>");
                    trash.addClass("material-icons right");
                    trash.addClass("remove");
                    trash.attr("course_code", data[class_].course_code);
                    
                    head.attr("course_code", data[class_].course_code);
                    row.attr("id", data[class_].course_code.replace(' ', ''));
                    
                    head.addClass("courses");
                    head.addClass("title");
                    
                    class_header.append(trash);
                    class_header.append(head);
                    row.append(class_header);
                    content.append(row);
                }

                $('.courses')
                    .click(function(){
                        localStorage.course_code = $(this).attr("course_code");
                        window.location.href = "/views/section";
                    });
                    
                $('.remove')
                    .click(function(){
                        var course_code = $(this).attr("course_code");
                        if(!confirm("Are you sure you want to delete this class?")) return false;
                        $.ajax({
                            url: '/api/class',
                            method: 'DELETE',
                            data: {
                                course_code: course_code
                            },
                            dataType: "JSON",
                            success: function(data){
                                if(!data){
                                    return Materialize.toast("Error in deleting. Please try again!",2500);
                                }
                                
                                $('#' + course_code.replace(' ','')).remove();
                                return Materialize.toast("Successfully deleted class!",2500);
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

});
