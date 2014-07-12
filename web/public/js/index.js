// define("pagelet/b", function(require) {
//         console.log('bbbbbbb');
//    }
// );
jQuery(function($) {
	var TPL = {
		itemTpl: ['{{~it.datas :v:i}}',
					'<li class="item">',
						'<a class="image-wrapper" href="{{=v.link}}">',
							'<img src="{{=v.src}}" alt="{{=v.name}}">',
							'<div class="name clearfix">',
								'<span class="text">{{=v.name}}</span>',
								'<div class="stars stars-1 clearfix">',
									'<div class="star-yellow"></div>',
									'<div class="star-black"></div>',
								'</div>',
							'</div>',
						'</a>',
						'<div class="desc">',
							'<p class="teacher">授课老师：{{=v.teacher}}</p>',
							'<p class="stu-num">报名人数：<span>{{=v.number}}</span>人</p>',
						'</div>',
					'</li>',
				'{{~}}'].join(''),
		categoryTpl: ['<p class="caption">{{=it.cName}}</p>',
						'<ol class="category">',
							'{{~it.categories :v:i}}',
							'<li class="c-item {{? i === 0 }}active{{?}}"><a href="#" data-cat="{{=v.cat}}">{{=v.name}}</a></li>',							
							'{{~}}',
						'</ol>'].join('')
	}		
	$.fn.itemList = function(options) {
		var categoryTpl = doT.template(TPL.categoryTpl),
			itemTpl = doT.template(TPL.itemTpl);

		$(this).find('.category-wrapper').append(categoryTpl(options));

		var obj = {datas: []}, i = 10;

		while(i-- > 0) {
			obj.datas.push({
				src: 'http://img.yacol.com/export/sites/yacol/life/images/bjjy1.jpg',
				name: '梵高教你星夜' + i,
				teacher: '黄小雄' + i,
				number: Math.floor(23333 / (i + 1)),
				link: '#'
			});
		}

		$(this).find('.i-list').append(itemTpl(obj));

		$.post(options.url, function(json) {
			$(this).find('list').append(itemTpl({
				datas: json
			}));			
		});

		return this;
	};
});
jQuery(function($) {
	var TPL = {
		rItemTpl: [
					'{{~it.datas :v:i}}',
					'<li class="">',
						'<span class="index">{{=i}}.</span>',
						'<a href="{{=v.link}}" class="course">{{=v.name}}</a>',
						'<span class="num">(<span>{{=v.number}}</span>)人</span>',
					'</li>',
					'{{~}}'
				   ].join(''),
		cItemTpl: [			
			'{{~it.datas :v:i}}',
			'<li><a href="{{=v.link}}">{{=v.name}}</a></li>',
			'{{~}}'			
		].join(' ')
	}
	$.fn.rankingList = function(options) {
		var rItemTpl = doT.template(TPL.rItemTpl),
			cItemTpl = doT.template(TPL.cItemTpl);

		$(this).find('.caption').text(options.caption);

		$(this).find('.r-list').append(rItemTpl({
			datas: options.rankingList
		}));


		$(this).find('.c-list').append(cItemTpl({
			datas: options.cList
		}));

		return this;
	}
});
jQuery(function($) {
	var TPL = {
		imgTpl: [
					'{{~it.datas :v:i}}',
					'<li><img src="{{=v.src}}" alt="{{=v.name}}"></li>',
					'{{~}}'
				]
	}
});

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
