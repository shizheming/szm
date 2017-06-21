var doc = document;
var switching = true;

module.exports = {
	addLoad: function() {
		var div = doc.createElement('div');
		div.className = 'flowerLoad';
		div.innerHTML = '<img src="//rwh-web.oss-cn-shanghai.aliyuncs.com/public/images/base/flower.gif">';
		doc.body.appendChild(div);
	},
	removeLoad: function() {
		doc.body.removeChild(doc.querySelector('.flowerLoad'));
	},
	ajax: function(json) {
		var that = this;
		if (!switching) return;
		switching = false;
		that.addLoad();
		$.ajax({
			type: json.type,
			url: json.url,
			data: json.data,
			dataType: 'json',
			complete: function() {
				that.removeLoad();
				switching = true;
				json.complete ? json.complete() : '';
			},
			error: function(msg) {
				json.error ? json.error(msg) : '';
			},
			success: function(msg) {
				json.success ? json.success(msg) : '';
			}
		});
	},
	// 复制内容到剪切板
	clipboard: function(text) {
		var input = doc.createElement('input');
		input.value = text;
		doc.body.appendChild(input);
		input.select();
		doc.execCommand('copy');
		doc.body.removeChild(input);
	},
	// 判断微信打开网页
	isWeChat: function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") return true;
		else return false;
	},
	// 获取cookie
	getCookie: function(name) {
		var arr;
		var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) return unescape(arr[2]);
		else return null;
	},
	// 测试环境还是正式环境
	env: function(str) {
		var rwhApiDomain = {
			'172': 'http://103.37.149.172',
			'201': 'http://api.test.renwohua.com',
			formal: 'https://api.renwohua.com'
		};
		str ? str = rwhApiDomain[str] : str = rwhApiDomain.formal;
		return function(route) {
			return str + route;
			// return str + route + '?channel_code=RENWOHUA_WECHAT_LOAN';
			// return str + route + '?channel_code=RENWOHUA_CASH_LOAN';
		};
	}
	
};