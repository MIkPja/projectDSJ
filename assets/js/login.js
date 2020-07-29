$(function () {
	$('#link-login,#link-reg').on('click', function () {
		$(this).parents('form').hide().siblings('form').show();
	})
	//自定义校验规则

	layui.form.verify({
		pwd: [/^\S{6,12}$/, '密码不能为空，长度为6-12位'],
		repwd: function (value) {
			var pwd = $('#reg_form [name=password]').val();
			if (pwd !== value) return '密码不一致';
		}

	})

	//注册功能
	$('#reg_form').on('submit', function (e) {
		console.log(1);
		e.preventDefault();
		var username = $('#reg_form [name=username]').val();
		var password = $('#reg_form [name=password]').val()
		console.log(2);
		$.post('/api/reguser', {
			username: username,
			password: password
		},
			function (res) {
				if (res.status !== 0) {
					return layer.msg('res.message')
				}
				layer.msg(res.message);
				$('#link-reg').click();
			})
	})

	//登陆功能
	$('#login_form').on('submit',function (e) {
		e.preventDefault();

		$.ajax({
			type:'POST',
			url:'/api/login',
			data: $('#login_form').serialize(),
			success:function(res){
				if (res.status !== 0) return layer.msg(res.message);
				layer.msg(res.message);
				localStorage.setItem('token',res.token);
				//跳转到后台首页 
				location.href = '/index.html'
			}
		})
	})

})