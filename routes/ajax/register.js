
var exports = {
	key: '/ajax_register',
	response: function(req, res) {
		var obj = {
			result: true,
			datas: []
		};		

		res.set('Content-Type', 'text/json');

		res.send(200, obj);
	}
}

module.exports = exports;
