'use strict';

$(document).ready( function () {
    config.checkAuth("ADMIN");

    view_faculty.init('#main-content');

});

var view_faculty = {

    faculty_data : null,
    faculty_logs : null,

    init : function( main_content ){

        navbar.init('#navbar');
        sidebar.init('#sidebar');

        $(main_content).append([
            '<h1 class="center">Faculty</h1>',
            '<nav>',
                '<div class="nav-wrapper row">',
                    '<div class="input-field col l12">',
                        '<input id="search-faculty" type="search" placeholder="Search Faculty" required>',
                        '<label for="search-faculty"><i class="material-icons">search</i></label>',
                        '<i class="material-icons waves-effect waves-light">close</i>',
                    '</div>',
                '</div>',
            '</nav>',
            '<div id="faculty-list" class="row"></div>',
        ].join(''));

        $('#search-faculty').keyup(function () {
            if(!view_faculty.faculty_data){
                document.location.reload();
            }else  if($(this).val().trim()==''){
                view_faculty.manipulateDom(view_faculty.faculty_data,"");
            }else{
                view_faculty.manipulateDom(view_faculty.faculty_data, $(this).val());
            }

        });

        $.ajax({
            url: '/api/faculty',
            method: 'GET',
            headers: util.headers,
            success: view_faculty.manipulateDom,
            error: function(err){
                util.errorHandler(err);
            }
        });
        
        $.ajax({
        	url: '/api/logs',
        	method: 'GET',
            headers: util.headers,
        	type: 'json',
        	success: view_faculty.getLogs,
        	error: function (err) {
                util.errorHandler(err);
        	}
      });

    },

    manipulateDom: function( data , search ){
        if(!data){
            return Materialize.toast("Error in fetching data",2500);
        }

        if(!view_faculty.faculty_data){
            view_faculty.faculty_data = data;
        }

        var color_flag = 0,
            num_flag = 0,
            content = $('#faculty-list'),
            search_string = 
                (search=="success" || search=="fail" || !search) ?
                    "" : search.toLowerCase(),
            search_count = data.length;

        content.empty();

        if(!data || !data.length){
            content.append('<br/><br/><h2 class="center">No Faculty Found</h2>');
        }

        for (var faculty_ in data){

            if(search_string &&
                  !new RegExp(search_string).test(data[faculty_].name.toLowerCase()) ){
                search_count--;
                continue;
            }

            var name = data[faculty_].name,
                emp_num = data[faculty_].emp_num,
                id = name.replace(' ', ''),
                user = $("<span></span").text(name),
                delete_faculty = $("<a title='Delete Faculty' href='#'><i class='material-icons options-text'>delete</i></a>"),
                options_div = $("<div class='options'></div>"),
                user_div =
                    ( color_flag == 0 ) ? 
                        $("<div class='faculty_hex hex z-depth-2 hexagon-red'></div>") : 
                        $("<div class='faculty_hex hex z-depth-2 hexagon-grey'></div>"),
                row_div =
                    (num_flag < 3) ? 
                        $("<div class='three con'></div>") :
                        $("<div class='four con'></div>");
                

            user.attr("name", name);
            user.attr("emp_num", emp_num);
            user.addClass("courses ");

            delete_faculty.addClass("remove");
            delete_faculty.attr("name", name);
            delete_faculty.attr("emp_num", emp_num);

            options_div.append(delete_faculty);

            user_div.attr("id", id);
            user_div.attr("name", name);
            user_div.attr("emp_num", emp_num);
            user_div.append(user);
                
            row_div.append(user_div);
            row_div.append(options_div);
            options_div.hide();
            content.append(row_div);

            color_flag = ( color_flag == 0 ) ? 1 : 0;
            num_flag = (num_flag == 6) ? 0 : num_flag + 1;
        
        }

        if(search_count==0){
            content.append('<br/><br/><br/><h2 class="center">No Faculty Found</h2>');
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

        /* Delete Faculty*/
        $('.remove')
            .click(function(){
                var emp_num = $(this).attr("emp_num");
                if(!confirm("Are you sure you want to delete this faculty?")) return false;
                $.ajax({
                    url: '/api/faculty',
                    method: 'DELETE',
                    headers: util.headers,
                    data: {
                        emp_num: emp_num
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in deleting. Please try again!",2500);
                        }

                        return Materialize.toast("Successfully deleted faculty user!",500,"",function(){
                            window.location.href = '/views/faculty/'
                        });
                    },
                    error: function(err){
                        util.errorHandler(err);
                    }
                });
            });

        /* Link to View details of the faculty clicked */
        $('.faculty_hex')
            .click(function(){
               /* localStorage.name = $(this).attr("name");
                localStorage.emp_num = $(this).attr("emp_num");*/
               var emp_num = $(this).attr("emp_num"),
               data_faculty = view_faculty.getFacultyInfo(emp_num);
               var date = "";
               if(view_faculty.getFacultyLogs(data_faculty.username) != null || view_faculty.getFacultyLogs(data_faculty.username) != undefined){
                    date = util.dateParser(view_faculty.getFacultyLogs(data_faculty.username));
               }
               else date = "Have not yet logged in";
               
               $('#faculty_name').html($("<span></span>").html(data_faculty.name) );
               $('#faculty_empnum').html($("<span></span>").html("Employee No.: " + data_faculty.emp_num) );
               $('#faculty_username').html($("<span></span>").html("Username: " + data_faculty.username) );
               $('#faculty_email').html($("<span></span>").html("Email: " + data_faculty.email) ); 
               $('#faculty_lastLoggedIn').html($("<span></span>").html("Last Logged In: " + date )); 
        
               $('#faculty_modal').openModal();
           });   
        },
    
         getFacultyInfo : function( empNo ){
            var data = view_faculty.faculty_data;

            for (var faculty_ in data) {
                if(empNo == data[faculty_].emp_num) return data[faculty_];
            }
            return null;
        },
        
         getFacultyLogs : function( username ){
            var logs = view_faculty.faculty_logs;
            for (var log_ in logs) {
                if(username == logs[log_].username && logs[log_].message == "Successfully logged in." && logs[log_].status == "SUCCESS"){ 
                    return logs[log_].log_date;
                }
            }
            return null;
        },
        
        getLogs: function (logs){
            if(!view_faculty.faculty_logs){
                view_faculty.faculty_logs = logs;
            }
        }

};
