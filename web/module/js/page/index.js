{{> item_list}}
{{> ranking_list}}
{{> footer}}
{{> searcher}}
{{> carousel}}

jQuery(function($) {
	var setting = window.setting;

	$('.recommander').itemList({
		cName: '课程推荐',
		dataUrl: setting.courseUrl,
		keyName: 'courseType'
	}).find('.ranking-list').rankingList({
		caption: '热门课程排行',
		dataUrl: setting.courseRankingUrl,
		params: {
			type: 'course'
		}
	});	

	$('.organization').itemList({
		cName: '极动社团',
		dataUrl: setting.comunityUrl,
		keyName: 'type'
	}).find('.ranking-list').rankingList({
		caption: '精彩主题讨论',
		dataUrl: setting.courseRankingUrl,
		params: {
			type: 'discussion'
		}
	});	
});
