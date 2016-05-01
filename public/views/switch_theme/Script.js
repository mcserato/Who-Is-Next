'use strict';

var string1 = 'linear-gradient(to bottom,   rgba(192,192,192,30)  ,    rgba(192,192,192,0)  )';
var string2 = 'rgb(192,192,192)';

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
                        string1 = 'linear-gradient(to bottom,   rgba(89,168,15,30)  ,    rgba(89,168,15,0)  )';
                    	$('body').css({
                    		"background-color":"rgb(196,237,104)"
                    		});
                        $('.btn').css({
                            "background-color":"#CFF09E"
                            });
                        $('nav').css({
                            "background-color":string1
                            });
                        string2 = "rgb(89,168,15)";
                    	
                    }else if( data[0].current_theme == 2){
                    	//yellow
                        string1 = 'linear-gradient(to bottom,   rgba(72,48,0,30)  ,   rgba(72,48,0,0))';
                    	$('body').css({
                            "background":"url(../../images/yellow.jpg)",
                            "background-image":"no repeat",
                            "background-size":"100% 100%"
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
                            "background-color":string1
                            });
                        $('.center').css({
                        	"color":"rgb(96,72,24)"
                        });
                        string2 = "rgb(72,48,0)";

                    }else if (data[0].current_theme == 3){
                    	//purple
                        string1 = 'linear-gradient(to bottom,   rgba(28,11,43,30)  ,    rgba(28,11,43,0)  )';
                    	$('body').css({
                    		"background":"url(../../images/purple.jpg)",
                            "background-image":"no repeat",
                            "background-size":"100% 100%"
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
                        
                    }else if (data[0].current_theme == 4){
                    	//red
                        string1 = 'linear-gradient(to bottom,   rgba(41,44,55,30)  ,    rgba(41,44,55,0)  )';
                    	$('body').css({
                    		"background-color":"rgb(177,22,35)"
                    		});
                         $('nav').css({
                            "background-color":string1
                            });
                         $('.center').css({
                         	color:"rgb(41,44,55)"
                         });
                         string2 = "rgb(41,44,55)";

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
/////////NAV BAR///////////////////////////
$(window).scroll(function() {
   if($(window).scrollTop()) {
      $('nav.z-depth-0').css({
        'background': string1
      });
   }else{
    $('nav.z-depth-0').css({
        'background': string2
      });

   }

});

$(window).on("scroll", function() {
    if ($(document).scrollTop()<10){
        var size1 = (16-$(document).scrollTop()).toString() + "vw";
        var size2 = (14-$(document).scrollTop()).toString() + "vw";

     $("a.brand-logo").css({
        "width":size1,
        "height":size1
     });
     $(".logo").css({
        "width":size2,
        "height":size2
     });
    }else{
      $("a.brand-logo").css({
        "width":"6vw",
        "height":"6vw"
     });
     $(".logo").css({
        "width":"4vw",
        "height":"4vw"
     });  
    }
});