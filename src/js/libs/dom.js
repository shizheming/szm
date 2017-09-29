var doc = document;
var switching = true;

// 判断移动终端
var u = navigator.userAgent

module.exports = {
	addLoad : function() {
		var div = doc.createElement('div');
		div.className = 'flowerLoad';
		div.innerHTML = '<img src="//rwh-web.oss-cn-shanghai.aliyuncs.com/public/images/base/flower.gif">';
		doc.body.appendChild(div);
	},
	removeLoad : function() {
		doc.body.removeChild(doc.querySelector('.flowerLoad'));
	},
	ajax : function(json) {
		var that = this;
		if (!switching) return;
		switching = false;
		that.addLoad();
		$.ajax({
			type : json.type,
			url : json.url,
			data : json.data,
			dataType : 'json',
			complete : function() {
				that.removeLoad();
				switching = true;
				json.complete ? json.complete() : '';
			},
			error : function(msg) {
				json.error ? json.error(msg) : '';
			},
			success : function(msg) {
				json.success ? json.success(msg) : '';
			}
		});
	},
	// 复制内容到剪切板
	clipboard : function(text) {
		var input = doc.createElement('input');
		input.value = text;
		doc.body.appendChild(input);
		input.select();
		doc.execCommand('copy');
		doc.body.removeChild(input);
	},
	// 判断微信打开网页
	isWeChat : function() {
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") return true;
		else return false;
	},
	// 获取cookie
	getCookie : function(name) {
		var arr;
		var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) return unescape(arr[2]);
		else return null;
	},
	//android终端或者uc浏览器
	isAndroid :	function () {
		return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
	},
	//ios终端
	isiOS : function () {
		return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	},
	// 在节点后插入
	insertAfter : function(obj,newNode){
		obj.parentNode.insertBefore(newNode,obj.nextElementSibling);
	},
	// 获取元素在页面上的位置
	getPos : function(obj){
		var left = 0,
			top = 0,
			borderL = parseInt(getComputedStyle(obj).borderLeftWidth),
			borderT = parseInt(getComputedStyle(obj).borderTopWidth);
		while (obj) {
			left += obj.offsetLeft + parseInt(getComputedStyle(obj).borderLeftWidth);
			top += obj.offsetTop + parseInt(getComputedStyle(obj).borderTopWidth);
			obj = obj.offsetParent;
		};
		return {
			left : left - borderL,
			top : top - borderT
		};
	},
	// 动态加载js
	loadJs : function(url, fn) {
		var doc = document;
	    var oHead = doc.querySelector('head'); 
	    var oScript = doc.createElement("script"); 
	    oScript.src = url;
	    oScript.onload = function() {
	    	fn && fn();
	    }; 
	    oHead.appendChild( oScript);
	    
	},
	// 返回当前环境对象，是游览器环境还是node环境
	root : function () {
		return typeof self == 'object' && self.self = self && self || typeof global == 'object' && global.global === global && global || this || {};
	}
};


