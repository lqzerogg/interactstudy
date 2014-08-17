var express = require('express');
var router = express.Router();

var exports = {
	key: '/teachroom2/coursesFind',
	response: function(req, res) {
		var obj = {datas: []}, i = 10;

		while(i-- > 0) {
			obj.datas.push({
				src: 'http://img.yacol.com/export/sites/yacol/life/images/bjjy1.jpg',
				name: '梵高教你星夜' + i,
				teacher: '黄小雄' + i,
				stars: (i+1) % 5,
				number: Math.floor(23333 / (i + 1)),
				link: '#'
			});
		}
		res.set('Content-Type', 'text/json');

		res.status(200).send(obj);
	  
	}
}

module.exports = exports;

