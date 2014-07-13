var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var setting = {
		courseUrl: '/get_courses?type=1',
		comunityUrl: '/get_comunities?type=1',
		courseRankingUrl: '/get_course_ranking',
		comunityRankingUrl: '/get_comunity_ranking'
	}
  res.render('index', { 
  	title: 'Express',
  	setting: JSON.stringify(setting)
  });
});

module.exports = router;
