'use strict';

$(document).ready( function () {
    $('#search-class').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            content.empty();

            console.log($(this).val());

            $.ajax({
                url: '/api/class/search/' + $(this).val(),
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


        }
    });

    /* Add Class */
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
                section_number: section_number
            },
            success: function(){
                Materialize.toast(course_code + " added!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/class"

        return false;
    });

    $('#edit-class-form').submit(function (event) {
        var course_code = $("#course_code_edit").val();
        var course_title = $("#course_title_edit").val();

        $.ajax({
            type: "PUT",
            url: "/api/class2",
            data: {
                course_code: course_code,
                course_title: course_title,
                course_code_o: localStorage.course_code
            },
            success: function(){
                Materialize.toast(course_code + " edited!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/class"

        return false;
    });

    $('.modal-trigger').leanModal();
    
	const content = $('#class-list');

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
                    var body = $("<a class='edit modal-trigger' href='#edit_modal'><i>mode_edit</i></a>");
                    body.addClass("material-icons right");
                    body.attr("course_code", data[class_].course_code);
                    row.attr("course_code", data[class_].course_code);
                    head.attr("course_code", data[class_].course_code);
                    row.addClass("courses");
                    head.addClass("title");

                    class_header.append(body);
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

                $('.edit')
                    .click(function(){
                        console.log($(this).attr("course_code"));
                        localStorage.class_id = $(this).attr("course_code");
                        $('#edit_modal').openModal();
                    });
            $('.title')
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
