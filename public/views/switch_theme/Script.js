'use strict';


$(document).ready( function () {
	 $.ajax({
                url: '/api/switch_theme',
                method: 'GET',
                success: function(data){
                    if(!data){
                        return Materialize.toast("Error in fetching data",2500);
                    }
					if( data[0].current_theme == 1){
                    	//dipsy
                    	console.log("pasok");
                    	$('body').css({
                    		"background-color":"#CFF09E"
                    		});
                    	
                    }else if( data[0].current_theme == 2){
                    	//laalaa
                    	$('body').css({
                    		"background-color":"#FFF077"
                    		});
                    }else if (data[0].current_theme == 3){
                    	//po
                    	$('body').css({
                    		"background-color":"#5D4157"
                    		});
                    }else if (data[0].current_theme == 4){
                    	//tinkywinky
                    	$('body').css({
                    		"background-color":"#7D1A0C"
                    		});
                    }else {
                    	//default
                    	console.log(data);
                    }
                    

                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
            });



   $('#dipsy').click(function() {
		switch_theme(1);
	});

	$('#laalaa').click(function() {
		switch_theme(2);
	});
	
	$('#po').click(function() {
		switch_theme(3);
	});
	
	$('#tinkywinky').click(function() {
		switch_theme(4);
	});
    function switch_theme(theme) {	
        $.ajax({
            url: '/api/switch_theme',
            method: 'PUT',
            data: {
                current_theme: theme
            },
            dataType: 'json',
            success: function(data){
            location.reload();
                return Materialize.toast("You had successfully changed the theme.",2500,"",function(){
                
                });

            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

    }
});
