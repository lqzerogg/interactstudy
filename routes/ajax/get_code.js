
/* GET home page. */
//ajax接口
var result = {
	//获取验证码图片
	"result": true,
	"src": "xxxx"
}
var exports = {
	key: '/getCode',
	response: function(req, res) {
		var obj = {src: '/img/ss1.png', result: true};

		res.set('Content-Type', 'text/json');

		res.send(200, obj);	  
	}
}

module.exports = exports;
