$( document ).ready(function() {

    navbar.init("#navbar");
    sidebar.init("#sidebar");

    var gender_frequency=[];
    $.ajax({
        type: "GET",
        url: "/api/analytics/1"
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
                text: 'Top Ten Students'
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
                name: 'Top Ten Students',
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
        url: "/api/analyticsGender/1/M"
    }).done(function(data) {
        gender_frequency.push(data[0].frequency);
    });
    $.ajax({
        type: "GET",
        url: "/api/analyticsGender/1/F"
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
        url: "/api/analyticsFemale/1"
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
            url: "/api/analyticsMale/1"
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
        
     var emp_no = JSON.parse(localStorage.user).emp_num;
     var orig_password;
     
     /* Fills Up Areas */
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
        var name = $("#name_edit").val();
        var email = $("#email_edit").val();
        var username = $("#username_edit").val();
        var old_password = $("#current_password").val();
        var new_password = $("#new_password_edit").val();
        var cnew_password = $("#cnew_password_edit").val();
        
        if(new_password != cnew_password){
            Materialize.toast("Password does not match !");
            return false;
        }
        else if(old_password !== orig_password){
            alert(orig_password);
            Materialize.toast("Wrong password!");
            return false;
        }
        else if(new_password == "" || new_password == null){
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
                    Materialize.toast(course_code + " edited!", 1000);   
                },
                dataType: "JSON"
            });
             return true;
        }
        
        else{ 
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
                    Materialize.toast(course_code + " edited!", 1000);   
                },
                dataType: "JSON"
            });
             return true;
        }     
        
    }); 


    $.ajax({
            type: "GET",
            url: "/api/analyticsGetSection/6"
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
