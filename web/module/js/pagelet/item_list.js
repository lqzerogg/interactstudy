jQuery(function($) {
	var TPL = {
		itemTpl: ['{{~it.datas :v:i}}',
					'<li class="item">',
						'<div class="image-wrapper">',
							'<a target="_blank" href="{{=v.link}}">',
								'<img src="{{=v.src}}" alt="{{=v.name}}">',
							'</a>',
							'<div class="name clearfix">',
								'<a href="{{=v.link}}">',
									'<span class="text">{{=v.name}}</span>',
									'<span class="stars stars-{{=v.stars}} clearfix">',
										'<span class="star-black"></span>',
										'<span class="star-yellow"></span>',
									'</span>',
								'</a>',
							'</div>',
						'</div>',
						'<div class="desc">',
							'<p class="teacher">授课老师：{{=v.teacher}}</p>',
							'<p class="stu-num">报名人数：<span>{{=v.number}}</span>人</p>',
						'</div>',
					'</li>',
				'{{~}}'].join(''),
		categoryTpl: ['<ol class="category">',
							'{{~it.categories :v:i}}',
							'<li class="c-item {{? i === 0 }}active{{?}}"><a href="#" data-cat="{{=v.cat}}">{{=v.name}}</a></li>',							
							'{{~}}',
						'</ol>'].join('')
	}		
	$.fn.itemList = function(options) {
		var getData = function (param) {
			$.get(options.dataUrl, param, function(json) {
				this.find('.i-list').html(itemTpl({
					datas: json.datas
				}));
			}.bind(this));
		}.bind(this);

		var categoryTpl = doT.template(TPL.categoryTpl),
			itemTpl = doT.template(TPL.itemTpl);

		// $(this).find('.i-list').append(itemTpl(obj));
		
		this.find('.category-wrapper .caption').text(options.cName);		

		getData({});
		
		this.find('.category').on('click', '.c-item a', function(e) {
			e.preventDefault();

			var $this = $(this), params = {};

			$this.parent().addClass('active').siblings().removeClass('active');

			params[$this.data('key')] = $this.data('value');
			getData(params);
		}).find('.more a').click(function(e) {
			e.stopPropagation();
		});

		return this;
	};
});