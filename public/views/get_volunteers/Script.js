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
                    '<option value=' + college[i].college + '>' + college[i].college + '</option>'
                );
            } 
        },
        error: function(err){
            return Materialize.toast(err.responseText,2500);
        }
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
                    for(var i in data) {
                        console.log(data[i]);
                        alert(data[i].first_name + " " + data[i].last_name);
                    }
                },
                dataType: "JSON"
            });
        
    });
     
});
