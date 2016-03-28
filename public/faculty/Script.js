'use strict';

$(document).ready( function () {
	
	config.checkAuth("FACULTY");

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

});