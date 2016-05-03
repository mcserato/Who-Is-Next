'use strict';
var temp = 0;
var string1 = 'linear-gradient(to bottom,   rgba(192,192,192,30)  ,    rgba(192,192,192,0)  )';
var string2 = 'rgb(192,192,192)';

$(document).ready( function () {

    navbar.init("#navbar");
    sidebar.init("#sidebar");

	 $.ajax({    
                url: '/api/switch_theme',
                method: 'GET',
                headers: util.headers,
                success: function(data){
                  
                    
                    if(!data){
                        return Materialize.toast("Error in fetching data",2500);
                    }
					if( data[0].current_theme == 1){
                    	//green
                        string1 = 'linear-gradient(to bottom,   rgba(89,168,15,30)  ,    rgba(89,168,15,0)  )';
                    	$('body').css({
                    		"background":"url(../../images/pointyGreen.png)",
                            "background-size":"30%"
                    		});
                        $('.btn').css({
                            "background-color":"#CFF09E"
                            });
                        $('nav').css({
                            "background-color":"rgb(89,168,15)"
                            });
                        $("a.brand-logo").css({
                            "background-color":"rgb(87,166,17)"
                            });

                        string2 = "rgb(89,168,15)";
                        temp = 1;
                    	
                    }else if( data[0].current_theme == 2){
                    	//yellow
                        string1 = 'linear-gradient(to bottom,   rgba(72,48,0,30)  ,   rgba(72,48,0,0))';
                    	$('body').css({
                            "background":"url(../../images/yellowL.png)",
                            "background-size":"30%"
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
                        $("a.brand-logo").css({
                            "background-color":"rgb(70,46,2)"
                            });

                        string2 = "rgb(72,48,0)";
                        temp = 2;

                    }else if (data[0].current_theme == 3){
                    	//purple
                        string1 = 'linear-gradient(to bottom,   rgba(28,11,43,30)  ,    rgba(28,11,43,0)  )';
                    	$('body').css({
                    		"background":"url(../../images/purpleTriangle.png)",
                            "background-size":"30%"
                    		});
                        $('nav').css({
                            "background-color":"rgb(28,11,43)"
                            });
                        $('.center').css({
                            "color":"rgb(48,28,65)"
                            });
                        $("a.brand-logo").css({
                            "background-color":"rgb(26,9,41)"
                            });
                        
                        string2 = "rgb(28,11,43)";
                        temp = 3;
                        
                    }else if (data[0].current_theme == 4){
                    	//red
                        string1 = 'linear-gradient(to bottom,   rgba(41,44,55,30)  ,    rgba(41,44,55,0)  )';
                    	$('body').css({
                    		"background":"url(../../images/redDonut.png)",
                            "background-size":"25%"
                    		});
                         $('nav').css({
                            "background-color":"rgb(41,44,55)"
                            });
                         $('.center').css({
                         	color:"rgb(41,44,55)"
                         });
                         $("a.brand-logo").css({
                            "background-color":"rgb(39,42,57)"
                            });

                         string2 = "rgb(41,44,55)";
                         temp = 4;

                    }else {
                    	//default
                    	console.log(data);
                    }

                },
                error: function(err){
                    util.errorHandler(err);
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
       if (temp != theme){
        $.ajax({
            url: '/api/switch_theme',
            method: 'PUT',
            headers: util.headers,
            data: {
                current_theme: theme
            },
            dataType: 'json',
            success: function(data){
                 
                return Materialize.toast("Theme changed. Wait for the page to reload",1000,"",function(){
                 location.reload();
                });
                

            },
            error: function(err){
                util.errorHandler(err);
            }
        });
    }else {
        Materialize.toast("That is the current theme. Choose another.",2500);
    }
    }
});
/////////NAV BAR///////////////////////////
