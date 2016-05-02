'use strict';

$(document).ready( function () {
    const content = $('#save-list');

    navbar.init('#navbar');
    sidebar.init('#sidebar');

    function add_save (data) {
        var color_flag = 0; // For alternating the color
        var num_flag = 0;   // For althernating number per row
        for (var save in data){
            var subject = $("<span></span").text(data[save].save_name);
            subject.attr("save_name", data[save].save_name);
            subject.addClass("title courses");

            var delete_class = $("<a title='Delete Save'><i class='material-icons options-text'>delete</i></a>");
            delete_class.addClass("remove");
            delete_class.attr("save_id", data[save].save_id);
            delete_class.attr("class_id", data[save].class_id);

            var edit_class = $("<a title='Edit Save' href='#edit_modal'><i class='material-icons options-text'>mode_edit</i></a>");
            edit_class.addClass("modal-trigger edit");
            edit_class.attr("save_id", data[save].save_id);
            edit_class.attr("class_id", data[save].class_id);

            var options_div = $("<div class='options'></div>");
            options_div.append(edit_class);
            options_div.append(delete_class);

            if (color_flag % 2 == 0) {
                var subject_div = $("<div class='hex z-depth-2 hexagon-red'></div>");

            } else {
                var subject_div = $("<div class='hex z-depth-2 hexagon-grey'></div>");
            }
            subject_div.attr("save_id", data[save].save_id);
            subject_div.append(subject);

            if (num_flag < 3) {
                var row_div = $("<div class='three'></div>");
                row_div.append(subject_div);
                content.append(row_div);
            } else content.append(subject_div);

            content.append(options_div);

            color_flag++;
            num_flag++;
            if (num_flag == 7) num_flag = 0;
        }

        $('.options').hide();

        $('.hex,.options').hover(function() {
           $('.options').show();
           $('.hex,.options').mouseleave(function() {
                 $('.options').hide();
            });
        });

        $('.hex').click(function() {
            localStorage.save_id = $(this).attr("save_id");
            window.location.href = "/views/save_student";
        });

        $('.remove').click(function(){
            var save_id = $(this).attr("save_id");
            var class_id = $(this).attr("class_id");

            if(!confirm("Are you sure you want to delete this Save Point?")) return false;
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

                    $('#' + course_code.replace(' ','')).remove();
                    return Materialize.toast("Successfully deleted class!",2500);
                },
                error: function(err){
                    util.errorHandler(err);
                }
            });
            window.location.href = "/views/save_point";
        });

        $('.edit').click(function(){
            localStorage.save_id = $(this).attr("save_id");
            $('#edit_modal').openModal();
        });

    }

    function ShowAll(){
        $.ajax({
            url: '/api/save_point',
            method: 'GET',
            success: function(data){
                if(!data){
                    return Materialize.toast("Error in fetching data",2500);
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
        var save_name = $("#save_name_edit").val();

        $.ajax({
            type: "PUT",
            url: "/api/save_point",
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
});

