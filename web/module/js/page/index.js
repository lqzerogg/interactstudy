{{> item_list}}
{{> ranking_list}}
{{> footer}}

jQuery(function($) {
	var i = 10, j = 5, obj = {rankingList: [], cList: [], caption: "热门课程排行"};
	while(i-- > 0) {
		obj.rankingList.push({
			link: '#',
			name: '超强钢琴课程' + i,
			number: Math.floor(99999 / (i+1))
		});
	}
	while(j-- > 0) {
		obj.cList.push({
			link: '#',
			name: '钢琴' + j
		});
	}
	$('.recommander').itemList({
		cName: '课程推荐',
		categories: [
			{
				name: '艺术类',
				cat: 1
			},
			{
				name: '体育类',
				cat: 2
			},
			{
				name: '婴儿教育类',
				cat: 3
			},
			{
				name: '素质类',
				cat: 4
			},
			{
				name: '更多》',
				cat: 0
			}
		]
	}).find('.ranking-list').rankingList(obj);

	i = 10, j = 5, obj = {rankingList: [], cList: [], caption: "精彩主题讨论"};

	while(i-- > 0) {
		obj.rankingList.push({
			link: '#',
			name: '钢琴主题' + i,
			number: Math.floor(99999 / (i+1))
		});
	}
	while(j-- > 0) {
		obj.cList.push({
			link: '#',
			name: '画画' + j
		});
	}	

	$('.organization').itemList({
		cName: '极动社团',
		categories: [
			{
				name: '最新活动',
				cat: 1
			},
			{
				name: '热门社团',
				cat: 2
			}		
		]
	}).find('.ranking-list').rankingList(obj);

});
