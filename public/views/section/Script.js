'use strict';

$(document).ready( function () {
    config.checkAuth("FACULTY"); 

    view_section.init('#main-content');

});


var view_section = {

    section_data : null,

    init : function( main_content ){

        var course_code = localStorage.course_code,
            course_title = localStorage.course_title;

        navbar.init('#navbar');
        sidebar.init('#sidebar');

        $(main_content).append([
            '<h1 id="course-id" class="center"></h1>',
            '<nav>',
                '<div class="nav-wrapper row">',
                    '<div class="input-field col l12">',
                        '<input id="search-section" type="search" placeholder="Search Section" required>',
                        '<label for="search-section"><i class="material-icons">search</i></label>',
                        '<i class="material-icons waves-effect waves-light">close</i>',
                    '</div>',
                '</div>',
            '</nav>',
            '<div id="section-list" class="row"></div>',
        ].join(''));

        $("#course-id").append($("<h2></h2>").text(localStorage.course_code));
        $("#course-id").append($("<h3></h3>").text(localStorage.course_title));

        $('#search-section').keyup(function () {
            if(!view_section.section_data){
                document.location.reload();
            }else  if($(this).val().trim()==''){
                view_section.manipulateDom(view_section.section_data,"");
            }else{
                view_section.manipulateDom(view_section.section_data, $(this).val());
            }

        });

        $('#add-button').click(function () {
            // Get data from input fields of add section form
            var class_section = $("#class_section").val(),
                section_number = $("#section_number").val() || null,
                course_code = localStorage.course_code,
                course_title = localStorage.course_title;

            if( view_section.checkExistSection(class_section,section_number) ){
                return Materialize.toast("Section already exist!", 1000);
            }

            if(class_section.trim()==""){
                return Materialize.toast("Please enter class section.", 1500);
            }

            $('#add_section_modal').closeModal();

            $.ajax({
                type: "POST",
                url: "/api/class2",
                headers: util.headers,
                data: {
                    course_code: course_code,
                    course_title: course_title,
                    class_section: class_section,
                    section_number: section_number
                },
                dataType: "JSON",
                success: function(){
                    setTimeout(function(){
                        if (section_number == null) {
                            return Materialize.toast("Section " + class_section + " added!", 1000, "", function(){
                                window.location.href = "/views/section"
                            });
                        } else {
                            return Materialize.toast("Section " + class_section + "-" + section_number + " added!",
                                1000, "", function(){
                                window.location.href = "/views/section"
                            });
                        }
                    },500);
                },
                error : util.errorHandler
            });
        });

        $('#edit-section-button').click(function (event) {
            var class_section = $("#class_section_edit").val(),
                section_number = $("#section_number_edit").val();

            if( view_section.checkExistSection(class_section,section_number) ){
                return Materialize.toast("Section already exist!", 1000);
            }

            $('#edit_section_modal').closeModal();

            $.ajax({
                type: "PUT",
                url: "/api/class2",
                headers: util.headers,
                data: {
                    class_section: class_section,
                    section_number: section_number,
                    class_id: localStorage.class_id
                },
                dataType: "JSON",
                success: function(){
                    Materialize.toast("Successfully edited section!", 800, "", function(){
                        window.location.href = "/views/section"
                    });
                },
                error : util.errorHandler
            });
            return false;
        });

        $.ajax({
            url: '/api/class/' + localStorage.course_code,
            method: 'GET',
            headers: util.headers,
            success: view_section.manipulateDom,
            error: function(err){
                util.errorHandler(err);
            }
        });
    },

    manipulateDom: function( data ,search ){
        if(!data){
            return Materialize.toast("Error in fetching data",2500);
        }

        if(!view_section.section_data){
            view_section.section_data = data;
        }

        var course_code = localStorage.course_code,
            course_title = localStorage.course_title,
            id = course_code.replace(' ', ''),
            color_flag = 0,
            num_flag = 0,
            content = $('#section-list'),
            search_string = 
                (search=="success" || search=="fail" || !search) ?
                    "" : search.toLowerCase(),
            search_count = data.length;

        content.empty();

        if(data.length==1 && data[0].class_section==''){
            content.append('<br/><br/><h2 class="center">No Sections Found</h2>');
            return;
        }        

        for(var section_ in data){

            if(data[section_].class_section=='' || (search_string &&
                  !new RegExp(search_string).test(data[section_].class_section.toLowerCase()+'-'+
                        (data[section_].section_number || '').toLowerCase() ) ) ){
                search_count--;
                continue;
            }

            var section_number = data[section_].section_number,
                class_id = data[section_].class_id,
                class_section = data[section_].class_section,
                section = 
                    !section_number ? 
                        $("<span></span>").text(class_section) :
                        $("<span></span>").text(class_section + "-" + section_number),
                view_analytics = 
                    $("<a title='View Analytics' href='#'><i class='material-icons options-text'>insert_chart</i></a>"),
                delete_section = 
                    $("<a title='Delete Section' href='#'><i class='material-icons options-text'>delete</i></a>"),
                edit_section = 
                    $("<a title='Edit Section' href='#' class='edit_section_modal'><i class='material-icons options-text'>mode_edit</i></a>"),
                options_div = 
                    $("<div class='options'></div>"),
                section_dv = 
                    color_flag % 2 == 0 ? 
                        $("<div class='section_hex hex z-depth-2 hexagon-red'></div>") :
                        $("<div class='section_hex hex z-depth-2 hexagon-grey'></div>");


            section.addClass("title courses");

            view_analytics.addClass("modal-trigger view-analytics-button");
            view_analytics.attr("class_id", class_id);

            delete_section.addClass("remove");
            delete_section.attr("class_id", class_id);
            delete_section.attr("course_code", course_code);

            edit_section.addClass("modal-trigger edit-section-button");
            edit_section.attr("class_id", class_id);
            edit_section.attr("class_section", class_section);
            edit_section.attr("section_number", section_number);

            options_div.append(view_analytics);
            options_div.append(edit_section);
            options_div.append(delete_section);
            options_div.attr("id", class_id+'-options');

            section_dv.attr("id", class_id);
            section_dv.attr("class_id", class_id);
            section_dv.attr("course_code", course_code);
            section_dv.attr("class_section", class_section);
            section_dv.attr("section_number", section_number);
            section_dv.append(section);

            content.append(
                num_flag < 3 ?
                    $("<div class='three'></div>").append(section_dv):
                    section_dv
            );

            content.append(options_div);

            color_flag++;
            num_flag++;
            if (num_flag == 7) num_flag = 0;
        }

        if(search_count==0){
            content.append('<br/><br/><br/><h2 class="center">No Sections Found</h2>');
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

        $('.section_hex').hover(
            function(){
                $(this).css( 'cursor', 'pointer' );
            },
            function(){
                $(this).css( 'cursor', 'default' );
            }
        ); 

        $('.section_hex').click(function(){ // Direct to View Students of a section
            localStorage.class_id = $(this).attr("class_id");
            localStorage.course_code = $(this).attr("course_code");
            localStorage.class_section = $(this).attr("class_section");
            localStorage.section_number = $(this).attr("section_number");
            window.location.href = "/views/class_student";
        });   

        /* Delete Section*/
        $('.remove')
            .click(function(){
                var class_id = $(this).attr("class_id");

                if(!confirm("Are you sure you want to delete this section?")) return false;
                $.ajax({
                    url: '/api/class/' + class_id,
                    method: 'DELETE',
                    headers: util.headers,
                    data: {
                        class_id: class_id
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in deleting. Please try again!",2500);
                        }

                        return Materialize.toast("Successfully deleted section!",1000,"",function(){
                            window.location.href = '/views/section/';
                        });
                    },
                    error: function(err){
                        util.errorHandler(err);
                    }
                });
            });

        $('.edit-section-button').click(function(){
                localStorage.class_id = $(this).attr("class_id");

                $('#class_section_edit').val($(this).attr("class_section"));
                $('#section_number_edit').val($(this).attr("section_number"));

                $('#edit_section_modal').openModal();
            });

        $('.view-analytics-button').click(function () {
            localStorage.class_id = $(this).attr("class_id");
            $('#view_analytics_modal').openModal();
            /* For the view analytics */
            $('#top-ten-div').empty();
            $('#gender-frequency-div').empty();
            $('top-ten-males-div').empty();
            $('#top-ten-females-div').empty();
            $('#section-frequency-div').empty();
            var gender_frequency=[];
            var i;
            $.ajax({
                type: "GET",
                url: "/api/analytics/" + localStorage.class_id,
                headers: util.headers
            }).done(function(data){
                var data2=[];
                for(i=0; i<10; i++){
                    //data2.push(JSON.parse(data[i]));
                    var temp=[];
                    temp.push(data[i].last_name);
                    temp.push(data[i].no_of_times_called);
                    data2.push(temp);
                }

                Highcharts.setOptions({
                    colors: ['#b42529', '#333333']
                });


                $('#top-ten-div').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Top Ten Most Called Students'
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -45,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },

                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of times called'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Top Ten Most Called Students',
                        data: data2,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y:.0f}', // one decimal
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                });
            });
            $.ajax({
                type: "GET",
                url: "/api/analyticsGender/"+localStorage.class_id+"/M",
                headers: util.headers
            }).done(function(data) {
                gender_frequency.push(data[0].frequency);
            });
            $.ajax({
                type: "GET",
                url: "/api/analyticsGender/"+localStorage.class_id+"/F",
                headers: util.headers
            }).done(function(data) {
                gender_frequency.push(data[0].frequency);

                Highcharts.getOptions().plotOptions.pie.colors = (function () {
                    var colors = [],
                        base = Highcharts.getOptions().colors[0],
                        i;

                    for (i = 0; i < 10; i += 1) {
                        // Start out with a darkened base color (negative brighten), and end
                        // up with a much brighter color
                        colors.push(Highcharts.Color(base).brighten((i-1) / 7).get());
                    }
                    return colors;
                }());

                $('#gender-frequency-div').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Gender Frequency Distribution'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Number of Time Called',
                        data: [
                            { name: 'Male', y: gender_frequency[0] },
                            { name: 'Female', y: gender_frequency[1] }
                        ]
                    }]
                });
            });

            $.ajax({
                type: "GET",
                url: "/api/analyticsFemale/" + localStorage.class_id,
                headers: util.headers
            }).done(function(datalang){
                var data4=[];
                for(i=0; i<datalang.length; i++){
                    //data2.push(JSON.parse(data[i]));
                    var temp=[];
                    temp.push(datalang[i].first_name);
                    temp.push(datalang[i].no_of_times_called)
                    data4.push(temp);
                }
                $('#top-ten-females-div').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Top Ten Most Called Female Students'
                    },
                    xAxis: {
                        type: 'category',
                        labels: {
                            rotation: -45,
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'No. of times called'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        name: 'Top Ten Most Called Female Students',
                        data: data4,
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y:.0f}', // one decimal
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                });
            });

            $.ajax({
                    type: "GET",
                    url: "/api/analyticsMale/" + localStorage.class_id,
                    headers: util.headers
                }).done(function(datagg){
                    var data3=[];
                    for(i=0; i<datagg.length; i++){
                        //data2.push(JSON.parse(data[i]));
                        var temp=[];
                        temp.push(datagg[i].first_name);
                        temp.push(datagg[i].no_of_times_called);
                        data3.push(temp);
                    }
                    $('#top-ten-males-div').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Top Ten Most Called Male Students'
                        },
                        xAxis: {
                            type: 'category',
                            labels: {
                                rotation: -45,
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'No. of times called'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        series: [{
                            name: 'Top Ten Most Called Male Students',
                            data: data3,
                            dataLabels: {
                                enabled: true,
                                rotation: -90,
                                color: '#FFFFFF',
                                align: 'right',
                                format: '{point.y:.0f}', // one decimal
                                y: 10, // 10 pixels down from the top
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }
                        }]
                    });
                });

            $.ajax({
                    type: "GET",
                    url: "/api/analyticsGetSection/" + localStorage.class_id,
                    headers: util.headers
                 }).done(function(section){
                    var section_list = [];
                    for(var i = 0; i < section.length ; i ++) {
                        section_list.push( section[i].id );
                    }

                        var values = [];
                        for(var i = 0 ; i < section_list.length ; i ++){
                            var link = "/api/analyticsLab/"+section_list[i];
                            $.ajax({
                                 type: "GET",
                                 url: link,
                                 headers: util.headers
                              }).done(function(frequency){
                                   var temp = [];
                                   temp.push(frequency[0].section);
                                   temp.push(frequency[0].frequency);
                                   values.push(temp);

                                $('#section-frequency-div').highcharts({
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: null,
                                        plotShadow: false,
                                        type: 'pie'
                                    },
                                    title: {
                                        text: 'Section Frequency Distribution'
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.y}</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: true,
                                            cursor: 'pointer',
                                            dataLabels: {
                                                enabled: true,
                                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                                style: {
                                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                                }
                                            }
                                        }
                                    },
                                    series: [{
                                        name: 'No. of Times Called',
                                        data: values
                                    }]
                                });
                             });
                        }
                   });
        });

    },

    checkExistSection : function( class_sect, sect_num ){

        if(!view_section.section_data){
            return false;
        }

        for(var section_ in view_section.section_data){

            var class_section = view_section.section_data[section_].class_section,
                section_number = view_section.section_data[section_].section_number || null;

            if( class_section == class_sect && section_number == sect_num ){
                return true;
            }

        }

        return false;
    }

};
