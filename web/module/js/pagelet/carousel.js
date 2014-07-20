jQuery(function($) {
	$('#carousel').find('.carousel-indicators li:first-child').addClass('active')
	.end().find('.carousel-inner .item:first-child').addClass('active')
	.end().carousel();
});