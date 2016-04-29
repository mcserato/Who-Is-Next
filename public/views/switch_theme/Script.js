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
                    	//green
                    	$('body').css({
                    		"background-color":"rgb(196,237,104)"
                    		});
                        $('.btn').css({
                            "background-color":"#CFF09E"
                            });
                        $('nav').css({
                            "background-color":"rgb(89,168,15)"
                            });
                    	
                    }else if( data[0].current_theme == 2){
                    	//yellow
                    	$('body').css({
                            "background-color":"rgb(240,240,72)"
                            });
                        $('.btn').css({
                            "background-color":"rgb(240,216,0)"
                            });
                        $('.btn.black.right').css({
                            "background-color":"rgb(240,216,0)"
                            });
                         $('a.btn-floating.black').css({
                            "background-color":"rgb(240,216,0)"
                            });
                        $('nav').css({
                            "background-color":"rgb(72,48,0)"
                            });
                        $('.center').css({
                        	"color":"rgb(96,72,24)"
                        });
                    }else if (data[0].current_theme == 3){
                    	//violet
                    	$('body').css({
                    		"background-color":"rgb(92,101,192)"
                    		});
                         $('nav').css({
                            "background-color":"rgb(28,11,43)"
                            });
                         $('.center').css({
                            "color":"rgb(48,28,65)"
                            });
                        
                    }else if (data[0].current_theme == 4){
                    	//red
                    	$('body').css({
                    		"background-color":"rgb(177,22,35)"
                    		});
                         $('nav').css({
                            "background-color":"rgb(41,44,55)"
                            });
                         $('.center').css({
                         	color:"rgb(41,44,55)"
                         })
                    }else {
                    	//default
                    	console.log(data);
                    }

                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
            });



   $('#green').click(function() {
		switch_theme(1);
	});

	$('#yellow').click(function() {
		switch_theme(2);
	});
	
	$('#violet').click(function() {
		switch_theme(3);
	});
	
	$('#red').click(function() {
		switch_theme(4);
	});
    $('#default').click(function() {
        switch_theme(0);
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
                 
                return Materialize.toast("You had successfully changed the theme. Wait for the page to reload",1000,"",function(){
                 location.reload();
                });
                

            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

    }

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
});
