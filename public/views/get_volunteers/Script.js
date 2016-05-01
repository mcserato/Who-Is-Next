'use strict';

$(document).ready( function () {

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
  
    $.ajax({
        url: '/api/class2/',
        method: 'GET',
        success: function(data) {
            var classes = data.classes;
            var courses = data.degree_programs;
            var college = data.colleges;

            for(var i in classes) {      
                $('#class-filter').append(
                    '<option value=' + classes[i].class_id + '>' + classes[i].course_code + ' ' + classes[i].class_section + (classes[i].section_number || '') +'</option>'
                );
            }
            
            for (var i in courses) {
                $('#course-filter').append(
                    '<option value=' + courses[i].course + '>' + courses[i].course + '</option>'
                );
            }
            
            for (var i in college) {
                $('#college-filter').append(
                    '<option value=' + college[i].college + '>' + college[i].college + '</option>'
                );
            } 
        },
        error: function(err){
            return Materialize.toast(err.responseText,2500);
        }
    });
        
    $('#logo-holder').hide();
    $('#randomize-form').hide();
    $('#header').hide();

    $("#randomize-btn").click(function(){
        $('#randomizer-holder').hide();
        $('#logo-holder').fadeIn();
        $("#randomize-form").slideDown(1000);
        $('#header').slideDown(1000);
    });

    $('#randomize')
        .click(function(){
           
            var class_id = $('#class-filter').val();
            
            $.ajax({
                url: '/api/randomizer/' + class_id,
                method: 'POST',
                data: {
                    class_id    : class_id,
                    last_name   :$('#last-name-filter').val(),
                    first_name  :$('#first-name-filter').val(),
                    birthday    :$('#birthday-filter').val(),
                    course      :$('#course-filter').val(),
                    college     :$('#college-filter').val(),
                    batch       :$('#batch-filter').val(),
                    number      :$('#number-filter').val()
                },
                success: function(data) {
                    $('#logo-holder').slideUp();
                    $('#randomize-form').slideUp();
                    $('#header').slideUp();

                    $('#randomize-form').promise().done(function(){
                        $('#randomizer-holder').show();
                        // Import animation of dice and arrow
                        $('head').append("<link id='animation-css' rel='stylesheet' type='text/css' href='css/Animation.css'>");
                        // Remove animation
                        setTimeout(function(){
                            document.getElementById("animation-css").remove();

                            for(var i in data) {
                                console.log(data[i]);
                                alert(data[i].first_name + " " + data[i].last_name);
                            }
                        }, 3100);
                    });
                },
                dataType: "JSON"
            });
    });
     
});

/* RANDOMIZER EFFECTS */

/* Honeycomb Effect */
// Creates the hexagon grid of volunteers
function insertHexagon(data) {
    var newline = true;
    var maxHexagon = parseInt(window.innerWidth/150);
    var minHexagon = maxHexagon-1;
    var limit = maxHexagon;
    var val = parseInt(window.innerWidth/150);

    for(var i = 0; i < data.length; i ++){
        $('#volunteers-grid').append(
            "<div class='card-grid' id='card-grid"+i +"'>" +
            "<div class='front'>" +
            "<div class='hexagon unflipped'>" +                            
            "<div class='hexTop'></div>"+
            "<div class='hexBottom'></div>"+
            "</div>"+
            "</div>"+
            "<div class='back'>"+
            "<div class='hexagon flipped' id='volunteer"+i+"'>"+
            "<div class='hexTop'></div>"+
            "<div class='hexBottom'></div>"+
            "</div>"+
            "<p class='volunteer-name'>"+data[i].last_name+"</p>"+

            "</div></div>"     
        );
        $("#volunteer"+i).css("background-image", "url(images/09.png)"); 

        if(i == limit){
            if(newline) newline = false;
            else newline = true;

            $("#card-grid"+i).css("clear", "left"); 
            if(val == maxHexagon) val = minHexagon;
            else val = maxHexagon;      

            limit = limit + val;            
        }

        if(newline) $("#card-grid" + i).css("left", "10%");     
        else $("#card-grid" + i).css("left", "15.5%");               
    }
}

 // Shows volunteers one by one   
function showVolunteers(data){
    var done = [];      
    var int = setInterval(function(){
    var showHex = Math.floor((Math.random() * data.length)); 
    
    while($.inArray(showHex, done)!=-1){
        showHex = Math.floor((Math.random() * data.length)); 
    }
        $("#card-grid" + showHex).flip(true);
        done.push(showHex);
        if(done.length == data.length){
            clearInterval(int);
        }
    }, 1000);

    // Enable flip.js 
    $(".card-grid").flip({         
       forceWidth: true,
       forceHeight: true,
       trigger:"manual",
    });
}


/* Zoom In Effect */
function zoomInImage(data){
    $(".pic").animate({
        width: "70%",
        heigth: "50%",
        opacity: 1,
        left: "15%",
        top:"15%",
        borderWidth: "10px"
    }, 3000);

    setTimeout(function(){
      $('#volunteers-grid').append('<h4 class=".name">' + data[0].last_name + '</h4>');
    });
}

