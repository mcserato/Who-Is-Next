'use strict';

console.log('wew');

$.ajax({
	url: '/api/logs',
	method: 'GET',
	type: 'json',
	success: function (logs) {
		for (var i in logs) {
			$("#log-table").append([
					'<tr>',
						'<td>' + new Date(logs[i].log_date) + '</td>',
						'<td>' + logs[i].ip_address + '</td>',
						'<td>' + logs[i].username + '</td>',
						'<td>' + logs[i].method + '</td>',
						'<td>' + logs[i].url + '</td>',
						'<td>' + logs[i].message + '</td>',
						'<td>' + logs[i].status + '</td>',
					'</tr>'
				].join(''));
		}
	},
	error: function (data) {
		console.log(data);
	}
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
	
    $('.modal-trigger').leanModal();