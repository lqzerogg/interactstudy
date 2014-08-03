//ajax接口
var result = {
	//发送邮箱验证， 参数有两个，第一个是邮箱地址mail, 第二个是验证码code
	"result": true,
	"url": "xxxx",       //转跳地址
	"errDesc": "xxxx"    //错误描述
}

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
