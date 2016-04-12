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
})