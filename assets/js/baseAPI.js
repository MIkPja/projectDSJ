$.ajaxPrefilter(function (options) {
	// 统一为有权限的接口设置headers
	if (options.url.indexOf('/my/') !== -1) {
		options.headers = {
			Authorization: localStorage.getItem('token') || '',
		}
	}
	// 拼接url
	options.url = 'http://ajax.frontend.itheima.net' + options.url;
})