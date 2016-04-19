'use strict';

$(document).ready( function () {
	const content = $('#class-list');

    function add_class (data) {

        var color_flag = 0; // For alternating the color
        var num_flag = 0;   // For althernating number per row
        for (var class_ in data){
            var subject = $("<span></span").text(data[class_].course_code);
            subject.attr("course_code", data[class_].course_code);
            subject.addClass("title courses");

            var delete_class = $("<a title='Delete Class'><i class='material-icons options-text'>delete</i></a>");
            delete_class.addClass("remove");
            delete_class.attr("course_code", data[class_].course_code);

            var edit_class = $("<a title='Edit Class' href='#edit_modal'><i class='material-icons options-text'>mode_edit</i></a>");
            edit_class.addClass("modal-trigger edit");
            edit_class.attr("course_code", data[class_].course_code);

            var options_div = $("<div class='options'></div>");
            options_div.append(edit_class);
            options_div.append(delete_class);

            if (color_flag % 2 == 0) {
                var subject_div = $("<div class='hex z-depth-2 hexagon-red'></div>");
                
            } else {
                var subject_div = $("<div class='hex z-depth-2 hexagon-grey'></div>");
            }
            subject_div.attr("id", data[class_].course_code.replace(' ', ''));
            subject_div.append(subject);

            if (num_flag < 3) {
                var row_div = $("<div class='three'></div>");   
                row_div.append(subject_div);
                content.append(row_div);  
            } else  content.append(subject_div);
            
            content.append(options_div);

            color_flag++;   
            num_flag++;
            if (num_flag == 7) num_flag = 0;
        }

        $('.options').hide();

        $('.courses')
            .click(function(){
                localStorage.course_code = $(this).attr("course_code");
                window.location.href = "/views/section";
            });

        $('.hex').hover(function() {
           $('.options').show();
           $('.options').mouseleave(function() {
                $('.options').hide();
            });
        });
            
        /* Delete Class*/
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

        /* Edit Class */
        $('.edit')
            .click(function(){
                console.log($(this).attr("course_code"));
                localStorage.class_id = $(this).attr("course_code");
                $('#edit_modal').openModal();
            });

        /* Link to View Sections of the class clicked */
        $('.title')
            .click(function(){
                console.log($(this).attr("course_code"));
                localStorage.course_code = $(this).attr("course_code");
                window.location.href = "/views/section";
            });
    }

    $('#search-class').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
        content.empty();

        
        if($(this).val() === ''){
            $.ajax({
                url: '/api/class',
                method: 'GET',
                success: function(data){
                    if(!data){
                        return Materialize.toast("Error in fetching data",2500);
                    }

                    add_class(data);
                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
            }); 
            return;
        }

        $.ajax({
            url: '/api/class/search/' + $(this).val(),
            method: 'GET',
            success: function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }

                content.empty();

                add_class(data);

                $('.courses')
                    .click(function(){
                        localStorage.course_code = $(this).attr("course_code");
                        window.location.href = "/views/section";

                    });
            },
            error: function(err){
                if(e.keyCode == 13){
                    return Materialize.toast(err.responseText,2500);    
                }
            }
        });
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
        console.log(localStorage.course_code);
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

	config.checkAuth("FACULTY");
		$.ajax({
            url: '/api/class',
            method: 'GET',
            success: function(data){
            	if(!data){
                	return Materialize.toast("Error in fetching data",2500);
            	}

                add_class(data);
            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

});
