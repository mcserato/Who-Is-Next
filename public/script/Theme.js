'use strict';
var temp = 0;
var string1 = 'linear-gradient(to bottom,   rgba(192,192,192,30)  ,    rgba(192,192,192,0)  )';
var string2 = 'rgb(192,192,192)';

$(document).ready( function () {
    if (JSON.parse(localStorage.user).role === 'ADMIN') {
        return;
    }

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
                            "background-color":"rgb(89, 168, 15)"
                            });
                        $('nav').css({
                            "background-color":"rgb(89,168,15)"
                            });
                        $("a.brand-logo").css({
                            "background-color":"rgb(87,166,17)"
                            });
                        $(".hexagon-red").css({
                            "background": "rgb(240, 216, 0)"
                        });
                        $("#class-list.row div .three").css({
                            "background-color": "rgb(240, 216, 0)"
                        });
                        $(".hexagon-red:after").css({
                            "background-color": "rgb(240, 216, 0)"
                        });
                        $("i#add-icon").css({
                            "background-color": "rgb(89, 168, 15)",
                            "color": "rgb(72,48,0)"
                        });
                        $("#add_modal").css({
                            "background":"rgb(89, 168, 15)"
                        });
                        $("a#randomize,#randomize-btn").css({
                            "background-color": "rgb(89, 168, 15)",
                            "color":"white",
                            "border-radius":" 0.5vw",
                            "box-shadow": "0 0.5vw 0 rgb(62, 117, 10)"
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
                      $(".hexagon-red").css({
                          "background": "rgb(240, 216, 0)"
                      });
                      $("#class-list.row div .three").css({
                          "background-color": "rgb(240, 216, 0)"
                      });
                      $(".hexagon-red:after").css({
                          "background-color": "rgb(240, 216, 0)"
                      });
                      $("i#add-icon").css({
                          "background-color": "rgb(240, 216, 0)",
                          "color": "rgb(72,48,0)"
                      });
                      $("span.courses").css({
                          "color":"brown"
                      });
                      $("#add_modal").css({
                          "background":"rgb(240, 216, 0)"
                      });
                      $("#add_modal h2").css({
                        "color": "rgb(72,48,0)"
                      });
                      $("label").css({
                          "color": "rgb(72,48,0)"
                      });
                      $("a#randomize,#randomize-btn").css({
                          "background-color": "rgb(240, 216, 0)",
                          "color":"white",
                          "border-radius":" 0.5vw",
                          "box-shadow": "0 0.5vw 0 rgb(204, 184, 0)"
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
                      $(".hexagon-red").css({
                          "background": "rgb(240, 216, 0)"
                      });
                      $("#class-list.row div .three").css({
                          "background-color": "rgb(240, 216, 0)"
                      });
                      $(".hexagon-red:after").css({
                          "background-color": "rgb(240, 216, 0)"
                      });
                      $("i#add-icon").css({
                          "background-color": "rgb(28, 11, 43)",
                          "color": "white"
                      });
                      $("span.courses").css({
                          "color":"brown"
                      });
                      $("#add_modal").css({
                          "background":"rgb(28, 11, 43)"
                      });
                      $("#add_modal h2").css({
                        "color": "white"
                      });
                      $(".btn").css({
                          "background": "rgb(28, 11, 43)"
                      });
                      $("a#randomize,#randomize-btn").css({
                          "background-color": "rgb(53, 21, 81)",
                          "color":"white",
                          "border-radius":" 0.5vw",
                          "box-shadow": "0 0.5vw 0 rgb(27, 10, 41)"
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
                    $(".hexagon-red").css({
                        "background": "rgb(240, 216, 0)"
                    });
                    $("#class-list.row div .three").css({
                        "background-color": "rgb(240, 216, 0)"
                    });
                    $(".hexagon-red:after").css({
                        "background-color": "rgb(240, 216, 0)"
                    });
                    $("i#add-icon").css({
                        "background-color": "rgb(41,44,55)",
                        "color": "white"
                    });
                    $(".btn").css({
                        "background-color": "rgb(41,44,55)"
                    });
                    $("a#randomize,#randomize-btn").css({
                        "background-color": "rgb(41,44,55)",
                        "color":"white",
                        "border-radius":" 0.5vw",
                        "box-shadow": "0 0.5vw 0 rgb(22, 24, 29)"
                    });
                    $("span.courses").css({
                        "color":"brown"
                    });
                    $("#add_modal").css({
                        "background":"rgb(41,44,55)"
                    });
                    $("#add_modal h2").css({
                      "color": "white"
                    });
                    $("label").css({
                        "color": "rgb(72,48,0)"
                    });

                         string2 = "rgb(41,44,55)";
                         temp = 4;

                    }else {
                    	//default
                      $(".hexagon-red,.hexagon-red:before,.hexagon-red:after").css({
                        "background": "#b42529"
                      });
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
