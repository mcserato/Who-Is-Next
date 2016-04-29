'use strict';

$(document).ready( function () {
    $('.modal-trigger').leanModal();
    const content = $('#section-list');
    config.checkAuth("FACULTY");

    $("#course-id").append($("<h2></h2>").text(localStorage.course_code));

    function addItem (data) {
        var color_flag = 0; // For alternating the color
        var num_flag = 0;   // For althernating number per row
        for(var class_ in data){
            if (data[class_].section_number == null || data[class_].section_number.length == 0) {
                var section = $("<span></span>").text(data[class_].class_section);
            } else {
                var section = $("<span></span>").text(data[class_].class_section + "-" + data[class_].section_number);
            }
            section.addClass("title courses");
            section.attr("class_id", data[class_].class_id);
            section.attr("course_code", data[class_].course_code);
            section.attr("class_section", data[class_].class_section);
            section.attr("section_number", data[class_].section_number);

            var view_analytics = $("<a title='View Analytics'><i class='material-icons options-text'>insert_chart</i></a>");
            view_analytics.addClass("modal-trigger view-analytics-button");
            view_analytics.attr("class_id", data[class_].class_id);

            var delete_section = $("<a title='Delete Section'><i class='material-icons options-text'>delete</i></a>");
            delete_section.addClass("remove");
            delete_section.attr("class_id", data[class_].class_id);
            delete_section.attr("course_code", data[class_].course_code);

            var edit_section = $("<a title='Edit Section' href='#edit_section_modal'><i class='material-icons options-text'>mode_edit</i></a>");
            edit_section.addClass("modal-trigger edit-section-button");
            edit_section.attr("class_id", data[class_].class_id);

            var options_div = $("<div class='options'></div>");
            options_div.append(view_analytics);
            options_div.append(edit_section);
            options_div.append(delete_section);

            if (color_flag % 2 == 0) {
                var section_dv = $("<div class='hex z-depth-2 hexagon-red'></div>");

            } else {
                var section_dv = $("<div class='hex z-depth-2 hexagon-grey'></div>");
            }
            section_dv.attr("id", data[class_].course_code.replace(' ', ''));
            section_dv.attr("classId", data[class_].class_id);
            section_dv.append(section);

            if (num_flag < 3) {
                var row_div = $("<div class='three'></div>");
                row_div.append(section_dv);
                content.append(row_div);
            } else  content.append(section_dv);

            content.append(options_div);

            color_flag++;
            num_flag++;
            if (num_flag == 7) num_flag = 0;
        }

        $('.hex')
            .click( function () {
            }
        );

        $('.options').hide();

        $('.courses')
            .click(function(){
                localStorage.class_id = $(this).attr("class_id");
                localStorage.course_code = $(this).attr("course_code");
                localStorage.class_section = $(this).attr("class_section");
                localStorage.section_number = $(this).attr("section_number");
                window.location.href = "/views/class_student";
            });

        $('.hex').hover(function() {
           $('.options').show();
           $('.options').mouseleave(function() {
                $('.options').hide();
            });
        });

        /* Delete Section*/
        $('.remove')
            .click(function(){
                var class_id = $(this).attr("class_id");

                if(!confirm("Are you sure you want to delete this section?")) return false;
                $.ajax({
                    url: '/api/class/' + class_id,
                    method: 'DELETE',
                    data: {
                        class_id: class_id
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in deleting. Please try again!",2500);
                        }

                        $('#' + class_id).remove();
                        return Materialize.toast("Successfully deleted section!",2500);
                    },
                    error: function(err){
                        return Materialize.toast(err.responseText,2500);
                    }
                });

                window.location.href = "/views/section"
            });

        /* Add Student */
        $('.add-student-button').click(function () {
            localStorage.class_id = $(this).attr("class_id");
            $('#add_student_modal').openModal();
        });

        /* View Analytics */
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
                url: "/api/analytics/" + localStorage.class_id
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
                url: "/api/analyticsGender/"+localStorage.class_id+"/M"
            }).done(function(data) {
                gender_frequency.push(data[0].frequency);
            });
            $.ajax({
                type: "GET",
                url: "/api/analyticsGender/"+localStorage.class_id+"/F"
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
                url: "/api/analyticsFemale/" + localStorage.class_id
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
                    url: "/api/analyticsMale/" + localStorage.class_id
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
                    url: "/api/analyticsGetSection/" + localStorage.class_id
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
                                 url: link
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

        /* Edit Student */
        $('.edit-student-button').click(function () {
            localStorage.student_number = $(this).attr("class_id");
            $('#edit_student_modal').openModal();
        });


        /* Edit Section */
        $('.edit-section-button').click(function(){
            localStorage.class_id = $(this).attr("class_id");
            $('#edit_section_modal').openModal();
        });
    }

    /* Add Section */
    $('#add-section-form').submit(function (event) {
        // Get data from input fields of add section form
        var class_section = $("#class_section").val();
        var section_number = $("#section_number").val();

        $.ajax({
            type: "POST",
            url: "/api/class/" + localStorage.course_code,
            data: {
                class_section: class_section,
                section_number: section_number
            },
            success: function(){
                if (section_number.length == 0) {
                    Materialize.toast(class_section + " added!", 1000);
                } else {
                    Materialize.toast(class_section + section_number + " added!", 1000);
                }
            },
            dataType: "JSON"
        });

        window.location.href = "/views/section"

        return false;
    });

    /* Edit Section */
    $('#edit-section-form').submit(function (event) {
        // Get data from input fields of edit section form
        var class_section = $("#class_section_edit").val();
        var section_number = $("#section_number_edit").val();

        $.ajax({
            type: "PUT",
            url: "/api/class",
            data: {
                class_section: class_section,
                section_number: section_number,
                class_id: localStorage.class_id
            },
            success: function(){
                Materialize.toast("Successfully edited section!", 1000);
            },
            dataType: "JSON"
        });

        window.location.href = "/views/section"

        return false;
    });

    /* Edit Student */
    $('#edit-student-form').submit(function (event) {
        var first_name = $("#first_name").val();
        var middle_name = $("#middle_name").val();
        var last_name = $("#last_name").val();
        var college = $("#college").val();
        var course = $("#course").val();
        var gender;
        if($("#male").val()){
            gender = "M";
        }
        else{
            gender = "F";
        }
        var birthday = $("#birthday").val();
        $.ajax({
            type: "PUT",
            url: "/api/student",
            data: {
                first_name: first_name,
                middle_name: middle_name,
                last_name: last_name,
                college: college,
                course: course,
                gender: gender,
                birthday: birthday,
                student_number: localStorage.student_number

            },
            success: function(){

            },
            dataType: "JSON"
        })

        window.location.href = "/views/section"

        return false;
    });

    $.ajax({
        url: '/api/class/' + localStorage.course_code,
        method: 'GET',
        success: function(data){
            $("#course-id").append($("<h3></h3>").text(data[0].course_title));
            if(!data){
                return Materialize.toast("Error in fetching data",2500);
            }

            var color_flag = 0; // For alternating the color
            var num_flag = 0;   // For althernating number per row
            for(var class_ in data){
                // Check if lecture section
                if (data[class_].section_number == null || data[class_].section_number.length == 0) {
                    var section = $("<span></span>").text(data[class_].class_section);
                } else {    // Lab/Recit section
                    var section = $("<span></span>").text(data[class_].class_section + "-" + data[class_].section_number);
                }
                section.addClass("title courses");
                section.attr("class_id", data[class_].class_id);
                section.attr("course_code", data[class_].course_code);
                section.attr("class_section", data[class_].class_section);
                section.attr("section_number", data[class_].section_number);

                var view_analytics = $("<a title='View Analytics'><i class='material-icons options-text'>insert_chart</i></a>");
                view_analytics.addClass("modal-trigger view-analytics-button");
                view_analytics.attr("class_id", data[class_].class_id);

                var delete_section = $("<a title='Delete Section'><i class='material-icons options-text'>delete</i></a>");
                delete_section.addClass("remove");
                delete_section.attr("class_id", data[class_].class_id);
                delete_section.attr("course_code", data[class_].course_code);

                var edit_section = $("<a title='Edit Section' href='#edit_section_modal'><i class='material-icons options-text'>mode_edit</i></a>");
                edit_section.addClass("modal-trigger edit-section-button");
                edit_section.attr("class_id", data[class_].class_id);
                edit_section.attr("class_section", data[class_].class_section);
                edit_section.attr("section_number", data[class_].section_number);

                var options_div = $("<div class='options'></div>");
                options_div.append(view_analytics);
                options_div.append(edit_section);
                options_div.append(delete_section);

                if (color_flag % 2 == 0) {
                    var section_dv = $("<div class='hex z-depth-2 hexagon-red'></div>");

                } else {
                    var section_dv = $("<div class='hex z-depth-2 hexagon-grey'></div>");
                }
                section_dv.attr("id", data[class_].course_code.replace(' ', ''));
                section_dv.append(section);

                if (num_flag < 3) {
                    var row_div = $("<div class='three'></div>");
                    row_div.append(section_dv);
                    content.append(row_div);
                } else  content.append(section_dv);

                content.append(options_div);

                color_flag++;
                num_flag++;
                if (num_flag == 7) num_flag = 0;
            }

            $('.options').hide();

            $('.courses').click(function(){ // Direct to View Students of a section
                localStorage.class_id = $(this).attr("class_id");
                localStorage.course_code = $(this).attr("course_code");
                localStorage.class_section = $(this).attr("class_section");
                localStorage.section_number = $(this).attr("section_number");
                window.location.href = "/views/class_student";
            });

            $('.hex').hover(function() {
               $('.options').show();
               $('.options').mouseleave(function() {
                    $('.options').hide();
                });
            });

            /* Delete Section*/
            $('.remove').click(function(){
                var class_id = $(this).attr("class_id");

                if(!confirm("Are you sure you want to delete this section?")) return false;
                $.ajax({
                    url: '/api/class/' + class_id,
                    method: 'DELETE',
                    data: {
                        class_id: class_id
                    },
                    dataType: "JSON",
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in deleting. Please try again!",2500);
                        }

                        $('#' + class_id).remove();
                        return Materialize.toast("Successfully deleted section!",2500);
                    },
                    error: function(err){
                        return Materialize.toast(err.responseText,2500);
                    }
                });

                window.location.href = "/views/section"
            });

            /* Add Student */
            $('.add-student-button').click(function () {
                localStorage.class_id = $(this).attr("class_id");
                $('#add_student_modal').openModal();
            });

            /* View Analytics */
            $('.view-analytics-button').click(function () {
                localStorage.class_id = $(this).attr("class_id");
                $('#view_analytics_modal').openModal();
                /* For the view analytics */
                $('#top-ten-div').empty();
                $('#gender-frequency-div').empty();
                $('#top-ten-males-div').empty();
                $('#top-ten-females-div').empty();
                $('#section-frequency-div').empty();
                var gender_frequency=[];
                var i;
                $.ajax({
                    type: "GET",
                    url: "/api/analytics/" + localStorage.class_id
                }).done(function(data){
                    var data2=[];
                    for(i=0; i<data.length; i++){
                        //data2.push(JSON.parse(data[i]));
                        var temp=[];
                        temp.push(data[i].last_name);
                        temp.push(data[i].no_of_times_called);
                        data2.push(temp);
                    }
                    if(data.length>0){
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
                                name: 'No. of times called',
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
                    }
                });
                $.ajax({
                    type: "GET",
                    url: "/api/analyticsGender/"+localStorage.class_id+"/M"
                }).done(function(data) {
                    gender_frequency.push(data[0].frequency);
                });
                $.ajax({
                    type: "GET",
                    url: "/api/analyticsGender/"+localStorage.class_id+"/F"
                }).done(function(data) {
                    gender_frequency.push(data[0].frequency);

                    if(data[0].frequency!=null || data[1].frequency!=null){
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
                    }
                });

                $.ajax({
                    type: "GET",
                    url: "/api/analyticsFemale/" + localStorage.class_id
                }).done(function(datalang){
                    var data4=[];
                    for(i=0; i<datalang.length; i++){
                        //data2.push(JSON.parse(data[i]));
                        var temp=[];
                        temp.push(datalang[i].first_name);
                        temp.push(datalang[i].no_of_times_called)
                        data4.push(temp);
                    }
                    if(datalang.length>0){
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
                                name: 'No. of times called',
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
                    }
                });

                $.ajax({
                        type: "GET",
                        url: "/api/analyticsMale/" + localStorage.class_id
                    }).done(function(datagg){
                        var data3=[];
                        for(i=0; i<datagg.length; i++){
                            //data2.push(JSON.parse(data[i]));
                            var temp=[];
                            temp.push(datagg[i].first_name);
                            temp.push(datagg[i].no_of_times_called);
                            data3.push(temp);
                        }
                        if(datagg.length>0){
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
                                    name: 'No. of times called',
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
                        }
                    });

                $.ajax({
                    type: "GET",
                    url: "/api/analyticsGetSection/" + localStorage.class_id
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
                             url: link
                          }).done(function(frequency){
                               var temp = [];
                               temp.push(frequency[0].section);
                               temp.push(frequency[0].frequency);
                               values.push(temp);
                               if(values.length>0){
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
                            }
                        });
                    }
                });
            });

            /* Edit Section */
            $('.edit-section-button').click(function(){
                localStorage.class_id = $(this).attr("class_id");

                $('#class_section_edit').val($(this).attr("class_section"));
                $('#section_number_edit').val($(this).attr("section_number"));

                $('#edit_section_modal').openModal();
            });
        },

        error: function(err){
            return Materialize.toast(err.responseText,2500);
        }
    });

    /* Add Student */
    $('#add-student-form').submit(function (event) {
        // Get data from input fields of add student form
        var student_number = $("#student_number").val();
        var first_name = $("#first_name").val();
        var middle_name = $("#middle_name").val();
        var last_name = $("#last_name").val();
        var college = $("#college").val();
        var course = $("#course").val();
        var gender;
        if ($("#male").val()) {
            gender = "M";
        } else {
            gender = "F";
        }

        var birthday = $("#birthday").val();
        if (!student_number.match(/^[0-9]{4}-[0-9]{5}$/)) {
            Materialize.toast("Invalid student number", 1000);
        } else {
            /* Add Student */
            $.ajax({
                type: "POST",
                url: "/api/student",
                data: {
                    student_number: student_number,
                    first_name: first_name,
                    middle_name: middle_name,
                    last_name: last_name,
                    college: college,
                    course: course,
                    gender: gender,
                    birthday: birthday

                },
                success: function(){

                },
                dataType: "JSON"
            }).done(function(data){
                /* Add Student to a class */
                $.ajax({
                    type: "POST",
                    url: "/api/class_student",
                    data: {
                        class_id: localStorage.class_id,
                        student_number: student_number,
                        no_of_times_called: 0
                    },
                    success: function(){
                        Materialize.toast(student_number + " is added!", 1000);
                    },
                    dataType: "JSON"
                });
            });
        }

        return false;
    });

    var emp_no = JSON.parse(localStorage.user).emp_num;
    var orig_password;
    /* Auto-fills up form of edit user */
    $.ajax({
        type: "GET",
        url: "/api/faculty/"+emp_no
    }).done(function(info){
        $("#name_edit").val(info[0].name);
        $("#email_edit").val(info[0].email);
        $("#username_edit").val(info[0].username);
        orig_password = info[0].password;
    });


    /*Edit User*/
    $('#edit-user-form').submit(function (event) {
        // Get data from input fields of edit user form
        var name = $("#name_edit").val();
        var email = $("#email_edit").val();
        var username = $("#username_edit").val();
        var old_password = $("#current_password").val();
        var new_password = $("#new_password_edit").val();
        var cnew_password = $("#cnew_password_edit").val();

        if (new_password != cnew_password) {
            Materialize.toast("Password does not match !");
            return false;
        } else if (old_password !== orig_password) {
            alert(orig_password);
            Materialize.toast("Wrong password!");
            return false;
        } else if (new_password == "" || new_password == null) {
            $.ajax({
                type: "PUT",
                url: "/api/faculty",
                data: {
                    name: name,
                    username: username,
                    password: info[0].password,
                    email: email,
                    emp_num: emp_no
                },
                success: function(){
                    Materialize.toast("Account successfully edited!", 1000);
                },
                dataType: "JSON"
            });

            return true;
        } else {
            $.ajax({
                type: "PUT",
                url: "/api/faculty",
                data: {
                    name: name,
                    username: username,
                    password: new_password,
                    email: email,
                    emp_num: emp_no
                },
                success: function(){
                    Materialize.toast("Account successfully edited!", 1000);
                },
                dataType: "JSON"
            });

            return true;
        }
    });
});
