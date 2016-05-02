'use strict';

$(document).ready( function () {

    navbar.init('#navbar');
    sidebar.init('#sidebar');

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
                    '<option value='+ college[i].college + '>' + college[i].college + '</option>'
                );
            }
        },
        error: function(err){
            util.errorHandler(err);
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

    $("#add-filter").click(function(){
        $('#filters').show();
        $("#add-filter").hide();
        $("#remove-filter").show();

    });

    $("#remove-filter").click(function(){
        $('#filters').hide();
        $("#add-filter").show();
        $("#remove-filter").hide();
        $('#last-name-filter').val("");
        $('#first-name-filter').val("");
        $('#birthday-filter').val("");
        $('#course-filter').val("");
        $('#college-filter').val("");
        $('#batch-filter').val("");
        $('#male-filter').prop('checked', true);
        $('#female-filter').prop('checked', true);
    });

    $("#start-again").click(function(){
        $('#logo-holder').show();
        $('#randomize-form').show();
        $('#header').show();
        $('#container-list').hide();

    });

 $('#randomize').click(function(){
        var checked = $('input[type=checkbox]:checked').length;

        if($('#class-filter').val() == ""){
            Materialize.toast("You must choose a class", 2000);
        }

        if(checked == 0) {
            Materialize.toast("You must check at least one checkbox at the Gender section", 2000);
        }

        if($('#number-filter').val() == ""){
            Materialize.toast("You must choose the number of volunteers", 2000);
        }

        else {
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
                    for(var i in data) {
                        console.log(data[i]);
                        $.ajax({
                            url: '/api/randomizer',
                            method: 'PUT',
                            data: {
                                class_id        : class_id,
                                student_number  : data[i].student_number
                            },
                            success: function(data2){
                                console.log(data2);
                            },
                            dataType: "JSON"
                        });
                    }

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
                            /*$('#randomizer-holder').hide();
                            $('#logo-holder').hide();
                            $("#container-list").show();
                            jumbleWords(data);*/

                            /*$('#randomizer-holder').hide();
                            $('#logo-holder').hide();
                            $("#container-list").show();
                            insertHexagon(data);*/

                            $('#randomizer-holder').hide();
                            $('#logo-holder').hide();
                            $("#container-list").show();
                            zoomInImage(data);

                        }, 3100);
                    });

                    $('randomize-btn').click(function(){
                        document.getElementById('animation-css').remove();
                    });
                },
                dataType: "JSON"
            });
        }
    });

});


/* RANDOMIZER EFFECTS */

/* Honeycomb Effect */
// Creates the hexagon grid of volunteers
function insertHexagon(data) {
    var newline = true;
    var maxHexagon = 6;
    var minHexagon = maxHexagon-1;
    var limit = maxHexagon;
    var val = 6;

    $('#list').html("");
    for(var i = 0; i < data.length; i ++){
        $('#list').append(
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
        else $("#card-grid" + i).css("left", "16%");
    }

     $("#start-again-div").css("position", "absolute");
     $("#start-again-div").css("bottom", "10%");
     $("#start-again-div").css("left", "40%");
     // Enable flip.js
    $(".card-grid").flip({
       forceWidth: true,
       forceHeight: true,
       trigger:"manual",
    });

    showVolunteers(data);
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

}


/* Zoom In Effect */
function zoomInImage(data){
    $("#list").empty();
    /*insert image here*/
    //hypothetical image
    $('#list').append("<img class='pic' src='sample.jpg' length=3px width=5px>");
    $('#list').append("<h3 class='name' style='display:none'>" + data[0].last_name + '</h3>');
    $(".pic").animate({
        width: "70%",
        heigth: "50%",
        opacity: 1,
        left: "15%",
        top:"15%",
        borderWidth: "10px"
    }, 3000);

    $(".pic").promise().done(function(){
        $('.name').show();
    });

}

function jumbleWords(data){
    var i=0;
    $("#list").empty();
    $("#list").append("<h3>Volunteers</h3>");

    for(i=0; i<data.length; i++){
        if(i%2==0){
            $("#list").append("<div><div class='listname1' id='name"+i+"''> <h4>" + data[i].first_name + " " + data[i].last_name + "</h4> </div></div>");
        }
        else {
            $("#list").append("<div><div class='listname2' id='name"+i+"''> <h4>" + data[i].first_name + " " + data[i].last_name + "</h4> </div></div>");
        }
    }

    $('h4').delay(200).animate({opacity:1.0});
    for(i=0; i<data.length; i++){
        if(i%2==0){
            $('#name'+i+' h4').textEffect({
                effect: "jumble",
                effectSpeed: 200
            });
        }
        else{
            $('#name'+i+' h4').textEffect({
                effect: "slide",
                effectSpeed: 200,
                reverse: true
            });
        }

    }
}

function enterName(data){
    var i=0;
    $("#list").empty();
    for(i=0; i<data.length; i++){
        if(i%2==0){
            $("#list").append("<div><div class='listname1' id='name"+i+"''> <h4>" + data[i].first_name + " " + data[i].last_name + "</h4> </div></div>");
        }
        else {
            $("#list").append("<div><div class='listname2' id='name"+i+"''> <h4>" + data[i].first_name + " " + data[i].last_name + "</h4> </div></div>");
        }
    }
    //var names = $('.name');
    $("h4").css({opacity:1});
    for(i=0; i<data.length; i++){
        if(i%2==0){
            $("#name"+i).delay(i*1000).animate({
                left:'20%'
            }, 3000 );
        }
        else{
            $("#name"+i).delay(i*1000).animate({
                right:'20%'
            }, 3000 );
        }
    }
}
