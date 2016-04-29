'use strict';

$(document).ready( function () {
	config.checkAuth("ADMIN");
    const content = $('#faculty-list');

    function add_data (data) {

        var color_flag = 0; // For alternating the color
        var num_flag = 0;   // For althernating number per row
        for (var faculty in data){
            var subject = $("<span></span").text(data[faculty].name);
            subject.attr("name", data[faculty].name);
            subject.addClass("title courses");

            var delete_faculty = $("<a title='Delete Faculty'><i class='material-icons options-text'>delete</i></a>");
             delete_faculty.addClass("remove");
            delete_faculty.attr("name", data[faculty].name);

            var validate_faculty = $("<a title='Validate Registration'><i class='material-icons options-text'>verified_user</i></a>");
            validate_faculty.addClass("validate");
            validate_faculty.attr("name", data[faculty].name);            

            var options_div = $("<div class='options'></div>");
            options_div.append(delete_faculty);
            options_div.append(validate_faculty);
            

            if (color_flag % 2 == 0) {
                var subject_div = $("<div class='hex z-depth-2 hexagon-red'></div>");
                
            } else {
                var subject_div = $("<div class='hex z-depth-2 hexagon-grey'></div>");
            }
            subject_div.attr("id", data[faculty].name.replace(' ', ''));
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

        $('.courses').click(function(){ // Redirect to View Section in a Class
            localStorage.course_code = $(this).attr("course_code");
            window.location.href = "/views/section";
        });

        $('.hex').hover(function() {
           $('.options').show();
           $('.hex').mouseleave(function() {
                $('.options').hide();
            });
        });

    }
/*
    function add_data(data){
        for (var faculty in data){
                var row = $("<li></li>");
                    row.text(data[faculty].name);
                content.append(row);
            }
    }
*/
    function Refresh(){
    	$.ajax({
	        url: '/api/faculty',
	        method: 'GET',
	        success: function(data){
	        	if(!data){
	            	return Materialize.toast("Error in fetching data",2500);
	        	}
                data = jQuery.grep(data, function(value){
                    return value.is_validated == 0;
                });
	            add_data(data);
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
            success: 
            function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }
                content.empty();
                add_data(data);

            },
            error: 
            function(err){
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