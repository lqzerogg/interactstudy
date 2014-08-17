$('#btn').click(function () {
    //保存参数
    params = {
        pic: $('#pic').attr('src'),
        username: $('#username').val(),
        realname: $('#realname').val(),
        sex: $('#sex').val(),
        city: $('#city').val(),
        area: $('#area').val(),
        street: $('#street').val(),
        num: $('#num').val(),
        tag: $('#tag').val(),
    }
    $.post(setting.setupUrl, params, function(json) {
        alert(json.msg);//处理返回结果
    });
});