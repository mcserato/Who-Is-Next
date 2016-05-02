var util = {
    escapeText: function (text) {
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    errorHandler: function (err) {
		$.ajax({
			type: "GET",
			url: "/api/session/"
		}).done( function(data) {

			if(data=="NO_SESSION"){
                localStorage.clear();
                Materialize.toast("Session Expired. Please log in again !",1500, "", function(){
                	window.location.href = '/';
                });
			}else{
                return Materialize.toast(err.responseText,2500);
			}
			
		});   
    }
}
