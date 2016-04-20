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

	const content = $('#student-list');
	//config.checkAuth("FACULTY");

    $('#search-student').keypress(function (e) {
        //localStorage.search_class = $(this).val();
        if (e.keyCode == 13) {
            e.preventDefault();
            //window.location.href = "/search/class";
        }
            content.empty();

            console.log($(this).val());

            $.ajax({
                url: '/api/student/search/' + $(this).val(),
                method: 'GET',
                success: function(data){
                    if(!data){
                        return Materialize.toast("Error in fetching data",2500);
                    }

                    for (var student in data){
                        var row = $("<li></li>");
                            var student_header = $("<div></div>").addClass("collapsible-header");
                                if(data[student].picture == null){
                                    var image = $('<img />',{
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                        float: 'left',
                                        position: 'relative',
                                        width: '10%'
                                    });                        
                                }else{
                                    var image = $('<img />',{
                                        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                        float: 'left',
                                        position: 'relative',
                                        width: '10%'
                                    });
                                }
                                image.addClass("circle")
                                var text = $("<span></span>").html(data[student].last_name + ", " + data[student].first_name + " " + data[student].middle_name );
                                text.addClass("center-align");
                            student_header.append(image);
                            student_header.append(text);
                        row.append(student_header);
                        content.append(row);
                    };
                    /*
                    if(e.keyCode == 13){
                        $(this).val() = '';
                    }
                    */
                    /*
                    $('.courses')
                        .click(function(){
                            console.log($(this).attr("course_code"));
                            localStorage.course_code = $(this).attr("course_code");
                            window.location.href = "/views/section";

                        });
                    */
                },
                error: function(err){
                    //console.log(err.responseText);
                    if(e.keyCode == 13){
                        return Materialize.toast(err.responseText,2500);    
                    }
                }
            });


        //}
    });

    $.ajax({
        url: '/api/student',
        method: 'GET',
        success: function(data){
        	if(!data){
            	return Materialize.toast("Error in fetching data",2500);
        	}
        	//localStorage.clear();
            //Materialize.toast(data,2500);
            //window.location.href = '/';
            console.log(data);

            for (var student in data){

                var row = $("<li></li>");
                    var student_header = $("<div></div>").addClass("collapsible-header");
                        if(data[student].picture == null){
                            var image = $('<img />',{
                                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                float: 'left',
                                position: 'relative',
                                width: '10%'
                            });                        
                        }else{
                            var image = $('<img />',{
                                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2000px-User_icon_2.svg.png',
                                float: 'left',
                                position: 'relative',
                                width: '10%'
                            });
                        }
                        image.addClass("circle")
                        var text = $("<span></span>").html(data[student].last_name + ", " + data[student].first_name + " " + data[student].middle_name );
                        text.addClass("center-align");
                    student_header.append(image);
                    student_header.append(text);
                row.append(student_header);
                content.append(row);
            };

        },
        error: function(err){
            return Materialize.toast(err.responseText,2500);
        }
    });
        
});