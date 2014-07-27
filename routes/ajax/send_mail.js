
/* GET home page. */
var exports = {
	key: '/sendMail',
	response: function(req, res) {		
		var obj = {url: 'http://www.baidu.com', result: true};

		res.set('Content-Type', 'text/json');

		res.send(200, obj);	  
	}
}

module.exports = exports;
