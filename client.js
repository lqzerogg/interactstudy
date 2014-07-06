var http = require('http');
var querystring = require('querystring')

var contents = querystring.stringify({
	name: 'trying'
});
var options = {
	host: 'localhost',
	port: '3000',
	path: '/',
	method: 'get',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': contents.length
	}
};

console.log('???outside???');

var req = http.request(options, function (res) {
	res.setEncoding('utf8');
	console.log('???inside???');
	res.on('data', function(data) {
		console.log(data)
	});
});

req.write(contents);
req.end();