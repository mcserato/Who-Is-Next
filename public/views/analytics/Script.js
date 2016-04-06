$( document ).ready(function() {
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
            temp.push(data[i].no_of_times_called)
            data2.push(temp);
        }
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
});
