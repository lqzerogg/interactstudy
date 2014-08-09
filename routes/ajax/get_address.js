
/* GET home page. */
//ajax接口
var cities = {
	//获取验证码图片
	result: true,
	datas: [
		{
			name: '广州',
			value: 1
		},
		{
			name: '深圳',
			value: 2
		},
		{
			name: '上海',
			value: 3
		},
		{
			name: '北京',
			value: 4
		}
	]
}
var exports = {
	key: '/getAddress',
	response: function(req, res) {
		var obj = {
			result: true,
			datas: []
		};
		var i = 10;

		console.log(req.query);

		if(req.query.city) {
			while(i--) {
				obj.datas.push({
					name: '街区' + i,
					value: i
				});
			}
		}else {
			obj = cities;
		}

		res.set('Content-Type', 'text/json');

		res.send(200, obj);	  
	}
}

module.exports = exports;
