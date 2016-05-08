'use strict';

$(document).ready( function () {
    config.checkAuth("FACULTY"); 

    view_class.init('#main-content');

});


var view_class = {

    class_data : null,

    init : function( main_content ){

        navbar.init('#navbar');
        sidebar.init('#sidebar');

        $(main_content).append([
            '<h1 class="center">Classes</h1>',
            '<nav>',
                '<div class="nav-wrapper row">',
                    '<div class="input-field col l12">',
                        '<input id="search-class" type="search" placeholder="Search Class" required>',
                        '<label for="search-class"><i class="material-icons">search</i></label>',
                        '<i class="material-icons waves-effect waves-light">close</i>',
                    '</div>',
                '</div>',
            '</nav>',
            '<div id="class-list" class="row"></div>',
        ].join(''));


        $('#search-class').keyup(function () {
            if(!view_class.class_data){
                document.location.reload();
            }else  if($(this).val().trim()==''){
                view_class.manipulateDom(view_class.class_data,"");
            }else{
                view_class.manipulateDom(view_class.class_data, $(this).val());
            }

        });


        /* Add Class */
        $('#add-button').click(function () {
            var course_code = $("#course_code").val(),
                course_title = $("#course_title").val();

            $.ajax({
                type: "POST",
                url: "/api/class",
                headers: util.headers,
                data: {
                    course_code: course_code,
                    course_title: course_title
                },
                dataType: "JSON",
                success: function(){
                    return Materialize.toast(course_code + " added!" ,1000,"",function(){
                        window.location.href = "/views/class"
                    });
                },
                error: util.errorHandler
            });
            return false;
        });


        /* Edit Class */
        $('#edit-button').click(function () {
            var course_code = $("#course_code_edit").val(),
                course_title = $("#course_title_edit").val(),
                old_course_code = localStorage.course_code;

            $.ajax({
                type: "PUT",
                url: "/api/class",
                headers: util.headers,
                data: {
                    course_code: course_code,
                    course_title: course_title,
                    course_code_o: old_course_code
                },
                dataType: "JSON",
                success: function(){
                     return Materialize.toast(old_course_code + "successfully edited!"
                        ,1000,"",function(){
                        window.location.href = "/views/class"
                    });
                },
                error: util.errorHandler
            });
            return false;
        });


        $.ajax({
            url: '/api/class',
            method: 'GET',
            headers: util.headers,
            success: view_class.manipulateDom,
            error: function(err){
                util.errorHandler(err);
            }
        });

    },

    manipulateDom: function( data , search ){
        if(!data){
            return Materialize.toast("Error in fetching data",2500);
        }

        if(!view_class.class_data){
            view_class.class_data = data;
        }

        var color_flag = 0,
            num_flag = 0,
            content = $('#class-list'),
            search_string = 
                (search=="success" || search=="fail" || !search) ?
                    "" : search.toLowerCase(),
            search_count = data.length;

        content.empty();

        if(!data || !data.length){
            content.append('<br/><br/><h2 class="center">No Class Found</h2>');
        }

        for (var class_ in data){

            if(search_string &&
                  !new RegExp(search_string).test(data[class_].course_code.toLowerCase()) ){
                search_count--;
                continue;
            }

            var course_code = data[class_].course_code,
                course_title = data[class_].course_title,
                id = course_code.replace(' ', ''),
                subject = $("<span></span").text(course_code),
                delete_class = $("<a title='Delete Class' href='#'><i class='material-icons options-text'>delete</i></a>"),
                edit_class = $("<a title='Edit Class' href='#'><i class='material-icons options-text'>mode_edit</i></a>"),
                options_div = $("<div class='options'></div>"),
                subject_div =
                    ( color_flag == 0 ) ? 
                        $("<div class='courses_hex hex z-depth-2 hexagon-red'></div>") : 
                        $("<div class='courses_hex hex z-depth-2 hexagon-grey'></div>"),
                row_div =
                    (num_flag < 3) ? 
                        $("<div class='three con'></div>") :
                        $("<div class='four con'></div>");
                

            subject.attr("course_code", course_code);
            subject.attr("course_title", course_title);
            subject.addClass("courses");

            delete_class.addClass("remove");
            delete_class.attr("course_code", course_code);

            edit_class.addClass("modal-trigger edit");
            edit_class.attr("course_code", course_code);
            edit_class.attr("course_title", course_title);

            options_div.append(edit_class);
            options_div.append(delete_class);

            subject_div.attr("id", id);
            subject_div.attr("course_code", course_code);
            subject_div.attr("course_title", course_title);
            subject_div.append(subject);
                
            row_div.append(subject_div);
            row_div.append(options_div);
            options_div.hide();
            content.append(row_div);

            color_flag = ( color_flag == 0 ) ? 1 : 0;
            num_flag = (num_flag == 7) ? 0 : num_flag + 1;
        
        }

        if(search_count==0){
            content.append('<br/><br/><br/><h2 class="center">No Class Found</h2>');
            return;
        }

        $('.options').hide();

        $('.three,.options')
            .mouseenter(function() {
               if($(this).attr("class") == 'three'){
                $(this).next().show();
               }else{
                $(this).css( 'cursor', 'pointer' );
                $(this).show();
               } 
            })
            .mouseleave(function(){
                if($(this).attr("class") == "three"){
                 $(this).next().hide();
               }
            });
        
        $('.hex.z-depth-2')
            .mouseenter(function() {
               if($(this).parent().attr("class") != 'three'){
                $(this).next().show();
               }
            })
            .mouseleave(function(){
                if($(this).parent().attr("class") != "three"){
                 $(this).next().hide();
               }
            });

        /* Delete Class*/
        $('.remove')
            .click(function(){
                var course_code = $(this).attr("course_code");
                if(!confirm("Are you sure you want to delete this class?")) return false;
                $.ajax({
                    url: '/api/class',
                    method: 'DELETE',
                    headers: util.headers,
                    data: {
                        course_code: course_code
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in deleting. Please try again!",2500);
                        }

                        return Materialize.toast("Successfully deleted class!",500,"",function(){
                            window.location.href = '/views/class/'
                        });
                    },
                    error: function(err){
                        util.errorHandler(err);
                    }
                });
            });


        /* Edit Class */
        $('.edit')
            .click(function(){
                var course_code = $(this).attr("course_code"),
                    course_title = $(this).attr("course_title");

                localStorage.course_code = course_code;

                $("#course_code_edit").val(course_code);
                $("#course_title_edit").val(course_title);

                $('#edit_modal').openModal();
            });

        /* Link to View Sections of the class clicked */
        $('.courses_hex')
            .click(function(){
                localStorage.course_code = $(this).attr("course_code");
                localStorage.course_title = $(this).attr("course_title");
                window.location.href = "/views/section";
            });

    }

};
