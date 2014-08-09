jQuery(function ($) {
	$('#resend').on('click', function() {
		$.post(setting.resendUrl, function(data) {
			if(data.result) {
				alert('发送成功');
			}
		});
	});
});