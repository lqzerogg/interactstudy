
/* GET home page. */
var exports = {
	key: '/getCode',
	response: function(req, res) {
		var obj = {src: '/img/ss1.png'};

		res.set('Content-Type', 'text/json');

		res.send(200, obj);	  
	}
}

module.exports = exports;
