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

            color_flag++;
            num_flag++;
            if (num_flag == 7) num_flag = 0;
        }

        $('.hex').click(function() {
            localStorage.save_id = $(this).attr("save_id");
            window.location.href = "/views/save_student";
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
});

