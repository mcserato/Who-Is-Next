'use strict';

$(document).ready( function () {
	config.checkAuth("ADMIN");
    const content = $('#faculty-list');


    function add_class (data) {

        var color_flag = 0; // For alternating the color
        var num_flag = 0;   // For althernating number per row
        for (var class_ in data){
            var subject = $("<span></span").text(data[class_].name);
            subject.attr("name", data[class_].name);
            subject.addClass("title courses");

/*
            var delete_class = $("<a title='Delete Class'><i class='material-icons options-text'>delete</i></a>");
            delete_class.addClass("remove");
            delete_class.attr("course_code", data[class_].course_code);

            var edit_class = $("<a title='Edit Class' href='#edit_modal'><i class='material-icons options-text'>mode_edit</i></a>");
            edit_class.addClass("modal-trigger edit");
            edit_class.attr("course_code", data[class_].course_code);

            var options_div = $("<div class='options'></div>");
            options_div.append(edit_class);
            options_div.append(delete_class);
*/
            if (color_flag % 2 == 0) {
                var subject_div = $("<div class='hex z-depth-2 hexagon-red'></div>");
                
            } else {
                var subject_div = $("<div class='hex z-depth-2 hexagon-grey'></div>");
            }
            subject_div.attr("id", data[class_].name.replace(' ', ''));
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
                localStorage.name = $(this).attr("name");
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
                var course_code = $(this).attr("name");
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
                localStorage.class_id = $(this).attr("course_code");
                $('#edit_modal').openModal();
            });

        /* Link to View Sections of the class clicked */
        $('.title')
            .click(function(){
                localStorage.course_code = $(this).attr("course_code");
                window.location.href = "/views/section";
            });
    }

    function Refresh(){
    	$.ajax({
	        url: '/api/faculty',
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
    }

    $('#search-faculty').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
        content.empty();

        
        if($(this).val() === ''){
            Refresh(); 
            return;
        }

        $.ajax({
            url: '/api/faculty/search/' + $(this).val(),
            method: 'GET',
            success: function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }

                content.empty();

                add_class(data);

                $('.courses')
                    .click(function(){
                        localStorage.name = $(this).attr("name");
                        window.location.href = "/views/section";

                    });
            },
            error: function(err){
                if(e.keyCode == 13){
                	Refresh();
                    return Materialize.toast(err.responseText,2500);    
                }
            }
        });
    });

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

	Refresh();

});
