'use strict';

$(document).ready( function () {

    navbar.init('#navbar');
    sidebar.init('#sidebar');

    function add_save (data) {
        for (var i in data) {
                    let date = new Date(data[i].save_date),
                        save_id = data[i].save_id,
                        class_id = data[i].class_id,
                        save_name = data[i].save_name;
                    
                    date = date.toString().split(' ');
                    date = [date[1],date[2],date[3]].join(' ');
                    
                    $('#save-list').append([
                        '<div class="col s12" id="' + save_id + '">',
                            '<div class="card">',
                                '<div class="card-content">',
                                    '<span class="card-title" id="'+ save_id +'-title">' + save_name + '</span>',
                                    '<span> (' + date + ')' +'</span>',
                                    '<span class="right">',
                                        '<i id="'+ save_id +'-edit" class="material-icons" title="Edit event name">edit</i>',
                                        '<i id="'+ save_id +'-remove" class="material-icons" title="Remove event">delete</i>',
                                    '</span>',
                                    '<div id="' + save_id + '-students"></div>',
                                '</div>',
                            '</div>',
                        '</div>'
                    ].join(''));
                    
                    view_students(save_id);
                    $('#' + save_id + '-remove').click(function(){
                        if(!confirm("Are you sure you want to remove " + save_name + "?")) return false;

                        $.ajax({
                            url: '/api/save_point',
                            method: 'DELETE',
                            data: {
                                save_id: save_id,
                                class_id: class_id
                            },
                            dataType: "JSON",
                            success: function(data){
                                if(!data){
                                    return Materialize.toast("Error in deleting. Please try again!",2500);
                                }

                                Materialize.toast("Successfully deleted save point", 1500);
                                $('#' + save_id).remove();
                            },
                            error: function(err){
                                util.errorHandler(err);
                            }
                        });
                    });

                $('#' + save_id + '-edit').click(function(){
                    $('#edit_modal').openModal();
                    $('#save_name_edit').val( $('#' + save_id + '-title').html() );
                    localStorage.save_id = save_id;
                });


        }
                    
    }

    function ShowAll(){
        $.ajax({
            url: '/api/save_point',
            method: 'GET',
            headers: util.headers,
            success: function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
                }
                
                if (data.length === 0) {
                    return $('#save-list').append([
                        '<h3 style="text-align: center;">No saved events yet</h3>',
                        '<p style="text-align: center;">Go ahead and <a href="/views/get_volunteers">randomize</a>!</p>'
                    ].join(''));
                }
                
                

                add_save(data);
            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

    }

    ShowAll();    

    $('#edit-save-form').submit(function (event) {

        // Get data from input fields of edi class form
        var save_name = $('#save_name_edit').val();

        $.ajax({
            type: "PUT",
            url: "/api/save_point",
            headers: util.headers,
            data: {
                save_name: save_name,
                save_id: localStorage.save_id
            },
            success: function(){
                Materialize.toast(course_code + " edited!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/save_point"

        return false;
    });

    $('#edit-button').click(function(){
        $('#edit-save-form').submit();
    });
    
    
    function view_students(save_id) {
        $.ajax({
            url: '/api/save_point/' + save_id,
            type: 'GET',
            success: function (data) {
                for (var i in data) {
                    $('#' + save_id + '-students').append([
                        '<p>',
                             data[i].student_number + ': ' + data[i].first_name + ' ' + data[i].last_name +
                        '</p>'
                    ].join(''));
                }
            },
            headers: util.headers
        });
    
    };
});

