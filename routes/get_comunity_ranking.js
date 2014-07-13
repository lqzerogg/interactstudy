var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var obj = {rankingDatas: [], categories: []}, i = 10;

	while(i-- > 0) {
		obj.rankingDatas.push({
			link: '#',
			name: '高级钢琴社区' + i,			
			number: Math.floor(23333 / (i + 1))
		});
	}
	while(i++ < 5) {
		obj.categories.push({
			link: '#',
			name: '分类' + i
		});
	}
	res.set('Content-Type', 'text/json');

	res.send(200, obj);
  
});

module.exports = router;
