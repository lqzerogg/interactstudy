
/* GET home page. */
var exports = {
	key: '/teachroom2/organizationsFind',
	response: function(req, res) {
		var obj = {datas: []}, i = 10;

		while(i-- > 0) {
			obj.datas.push({
				src: 'http://img.yacol.com/export/sites/yacol/life/images/bjjy1.jpg',
				name: '梵高社团' + i,
				teacher: '黄大雄' + i,
				stars: (i+1) % 5,
				number: Math.floor(23333 / (i + 1)),
				link: '#'
			});
		}
		res.set('Content-Type', 'text/json');

		res.send(200, obj);
	  
	}
}

module.exports = exports;
