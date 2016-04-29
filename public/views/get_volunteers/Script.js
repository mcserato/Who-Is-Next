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
                    '<option value='+ college[i].college + '>' + college[i].college + '</option>'
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
            var checked = $('input[type=checkbox]:checked').length;

            if(checked == 0) {
                return alert("You must check at least one checkbox at the Gender section");

            }

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
                        alert(data[i].first_name + " " + data[i].last_name);
                    }
                },
                dataType: "JSON"
            });
       
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
                }, 3100);
                setTimeout(function(){
                    // Put random effect here
                }, 3100); 
            });
    });
     
});
