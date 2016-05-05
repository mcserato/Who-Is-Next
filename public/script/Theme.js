'use strict';
var temp = 0;
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
                        $("a#randomize").css({
                            "background-color":"rgb(240, 216, 0)"
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
                        $("#user-name").css({
                            "color":"white"
                        });
                        $("a#randomize").css({
                            "background-color":"rgb(240, 216, 0)"
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
                        $("#user-name").css({
                            "color":"white"
                        });
                        $("#user-name").css({
                            "color":"white"
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
                        $("#user-name").css({
                            "color":"white"
                        });

                         string2 = "rgb(41,44,55)";
                         temp = 4;

                    }else {
                    	//default
                    	//console.log(data);
                    }

                },
                error: function(err){
                    return Materialize.toast(err.responseText,2500);
                }
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
    if ($(document).scrollTop()<11){
        var size1 = (11-$(document).scrollTop()).toString() + "vw";
        var size2 = (9.2-$(document).scrollTop()).toString() + "vw";

   // console.log(size1);
   // console.log(size2);

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
        "width":"8vw",
        "height":"8vw"
     });
     $(".logo").css({
        "width":"6vw",
        "height":"6vw"
     });  
    }
});



});


