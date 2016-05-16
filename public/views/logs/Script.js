'use strict';

$(document).ready( function () {
    config.checkAuth();

    var user = JSON.parse(localStorage.user);

    navbar.init('#navbar');
    sidebar.init('#sidebar');

    $('#main-content').append([
        '<div style="max-height: 400px; overflow: auto;">',
            '<table class="bordered">',
                '<thead>',
                    '<tr>',
                        '<th>Date</th>',
                        user.role === 'ADMIN' ? '<th>IP Address</th>' : '',
                        user.role === 'ADMIN' ? '<th>Username</th>' : '',
                        user.role === 'ADMIN' ? '<th>Method</th>' : '',
                        user.role === 'ADMIN' ? '<th>Route</th>' : '',
                        '<th>Message</th>',
                        user.role === 'ADMIN' ? '<th>Status</th>' : '',
                    '</tr>',
                '</thead>',
                '<tbody id="log-table">',
                '</tbody>',
            '</table>',
            '<div>',
        '</div>'
    ]);
    
    $.ajax({
    	url: '/api/logs',
    	method: 'GET',
        headers: util.headers,
    	type: 'json',
    	success: function (logs) {
    		for (var i in logs) {
    			$("#log-table").append([
    					'<tr>',
    						'<td>' + new Date(logs[i].log_date) + '</td>',
    						user.role === 'ADMIN' ? '<td>' + logs[i].ip_address + '</td>' : '',
    						user.role === 'ADMIN' ? '<td>' + logs[i].username + '</td>' : '',
    						user.role === 'ADMIN' ? '<td>' + logs[i].method + '</td>' : '',
    						user.role === 'ADMIN' ? '<td>' + logs[i].url + '</td>' : '',
    						'<td>' + logs[i].message + '</td>',
    						user.role === 'ADMIN' ? '<td>' + logs[i].status + '</td>' : '',
    					'</tr>'
    				].join(''));
    		}
    	},
    	error: function (err) {
            util.errorHandler(err);
    	}
    });
    
    $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
      
    
});
