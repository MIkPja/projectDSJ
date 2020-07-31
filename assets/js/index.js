

$.ajax({
	type: 'GET',
	url: '/my/userinfo',
	// 请求头 配置对象 以my开头的都是需要权限才能访问成功
	// headers: {
	// 	Authorization: localStorage.getItem('token') || ''
	// },
	success: function (res) {
		if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
		// 调用函数渲染用户头像
		getUserInfo(res.data);
	},
	// error:function(){
	// },
	//不管请求成功和失败 都会调用这个函数
	//complete函数只需要写一份就够了
	complete: function (res) {
		if (res.responseJSON.status == 1) {
			localStorage.removeItem('token'); //防止黑客攻击
			//如果没有登录信息就强制跳转到登录页
			location.href = '/login.html';
		}
	}

}) //ajax


// location.href = '/index.html';
//退出
$('#logout').on('click', function () {
	layer.confirm('确定要退出?', { icon: 3, title: '提示' }, function (index) {
		//销毁凭证   
		localStorage.removeItem('token');
		//跳转登录
		location.href = '/login.html'
		layer.close(index);
	});
})



// 用户头像及用户名昵称处理方法封装
function getUserInfo(user) {
	//1. 拿到用户名
	var name = user.nickname || user.username;
	//2. 设置欢迎文本
	$('.welcome').html('欢迎&nbsp&nbsp' + name + '&nbsp&nbsp');
	//3. 按需渲染用户头像
	if (user.user_pic !== null) {
		// 3.1 渲染图片头像   判断用户是否有头像 如果有就渲染图片 如果没有就渲染文字
		$('.layui-nav-img').attr('src', user.user_pic).show();
		$('.text-avatar').hide()
	} else {
		// 3.2 渲染文本头像
		$('.layui-nav-img').hide();
		var first = name[0].toUpperCase();
		$('.text-avatar').html(first).show();
	}
};

function getUserInfos() {
	$.ajax({
		method: 'GET',
		url: '/my/userinfo',
		// headers 就是请求头配置对象
		headers: {
			Authorization: localStorage.getItem('token') || ''
		},
		success: function (res) {
			getUserInfo(res.data)
		}
	})
}

function getName(name) {
	$('.welcome').eq(0).html(name);
	$('.welcome').eq(1).html('欢迎&nbsp&nbsp' + name + '&nbsp&nbsp');
}

