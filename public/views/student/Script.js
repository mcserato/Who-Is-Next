'use strict';

$(document).ready( function () {
    //document.getElementById("main-content");
	const content = $('#main-content');
	//config.checkAuth("FACULTY");
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
              	

                //console.log(data[1]);
                for (var student in data){
                	content.append(
                		'<div>' + data[student].first_name + '</div>' 
                	);
                };

            },
            error: function(err){
                return Materialize.toast(err.responseText,2500);
            }
        });

});