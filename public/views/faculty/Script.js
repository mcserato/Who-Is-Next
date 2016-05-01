'use strict';

$(document).ready( function () {
	config.checkAuth("ADMIN");
    const content = $('#faculty-list');

    navbar.init('#navbar');
    sidebar.init('#sidebar');
    
    function add_data (data) {

        var color_flag = 0; // For alternating the color
        var num_flag = 0;   // For althernating number per row
        for (var faculty in data){
            var subject = $("<span></span").text(data[faculty].name);
            subject.attr("name", data[faculty].name);
            subject.addClass("title courses");

            var delete_class = $("<a title='Delete Faculty'><i class='material-icons options-text'>delete</i></a>");
             delete_class.addClass("remove");
            delete_class.attr("name", data[faculty].name);

            var edit_class = $("<a title='Edit Faculty' href='#edit_modal'><i class='material-icons options-text'>mode_edit</i></a>");
            edit_class.addClass("modal-trigger edit");
            edit_class.attr("name", data[faculty].name);

            var options_div = $("<div class='options'></div>");
            options_div.append(edit_class);
            options_div.append(delete_class);

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

	            add_data(data);
	        },
	        error: function(err){
	            util.errorHandler(err);
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
                    util.errorHandler(err);    
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
	                util.errorHandler(err);
	            }
	        });

		});

	Refresh();

});