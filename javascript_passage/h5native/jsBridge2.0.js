// 名称：jsBridge.js
// 版本：2.0
// 时间：2016.10
// 更新：1. 队列依靠native回调不靠谱，万一native挂了一点，那我的队列全部都挂了，页面就费了，所以还是我主动间隔的发请求


// -------------------------------------------------------------------------
// 用法--稍等见api

// sdk
// js://com.renwohua.conch/crawler/injection?data=json
// success--error


/*{
	data : {} || [],
	success : function() {},
	error : function() {}
}*/

// 程序 = 数据结构 + 算法

(function() {

	// 发一次的配置请求
	var bl = true;


	// 请求native的队列
	var re = [];


	// 异步的5大分享回调函数
	var callback = {};


	// 全部监听队列变化
	setInterval(function() {
		// 请求队列
		if (re.length > 0) {
			// 这里是队列里有，接着执行队列，发请求
			re[0]();
			re.shift();
		}
	}, 500);


	var w = {
		// 请求native
		requestNative : function (url, fn) {
			var ifr = document.getElementById('ifr');
			if(ifr) ifr.parentNode.removeChild(ifr);
			var div = document.createElement('div');
			var iframe = '<iframe id="iframe"></iframe>';
			div.id = 'ifr';
			div.style.display = 'none';
			div.innerHTML = iframe;
			document.body.appendChild(div);
			document.getElementById('iframe').contentWindow.window.location = url;
			console.log(url);
			fn && fn();
		},
		// 拼接url
		mosaicURL : function(method, json) {
			return 'js://com.renwohua.conch' + method + '?data=' + encodeURIComponent(JSON.stringify(json.data));
		},
		// 对外的方法公用的步骤
		p : function(json, a) {

			json = jsonVerification(json);

			re.push(w.always(w.requestNative, w.mosaicURL(nativeMethod[a], json)));

			// 添加用户回调函数存起来

			callback[a] = {
				success : json.success,
				error : json.error
			};

		},
		// 常用预置函数
		always : function(fn) {
			var args = arguments;
			return function() {
				fn.apply(null, Array.prototype.slice.call(args, 1));
			};
		},
		// 默认函数
		init : function(val) {
			return val;
		}
	};

	// 对外初始化
	// 配置config，签名确认，只需一次就够了
	window.JsBridge = function(json) {
		// 初始发config请求设置签名，签名通过才能正确调用方法

		json = jsonVerification(json);

		if (bl) {
			bl = false;
			
			re.push(w.always(w.requestNative, w.mosaicURL('config', json)));

			// 添加用户回调函数存起来
			// 入队
			callback.config = {
				success : json.success,
				error : json.error
			};

		} else alert('请不要重复调用签名，一次就好');
	};

	// 与native定义的方法
	var nativeMethod = {
		// 初始化
		'zinit' : '/config',
		// 分享
		'share' : '/showShare',
		// 添加菜单
		'menu' : '/showMenu',
		// 关闭页面
		'close' : '/closeWindow',
		// 选择图片
		'img' : '/chooseImage',
		// 刷新页面
		'refresh' : '/refresh',
		// 选择视频
		'video' : '/videoRecord',
		// 选择联系人
		'contact' : '/chooseContact',
		// 选择通话记录
		'log' : '/chooseCallLog',
		// 初始化分享到哪里
		'shareInit' : '/onShare',
		// 遮罩
		'mask' : '/crawler/mask',
		// 数据上传客户端
		'client' : '/crawler/work',
		// 数据上传服务端
		'server' : '/crawler/uploadReport'
	};


	// 对外方法队列
	var userMethod = Object.keys(nativeMethod);

	// 这个给native回调的函数暴露在外面怎么办?
	// native统一调我的回调函数
	// native回调我的函数

	function forResult(json) {
		var method = json.action.replace('//', '/');
		for (var key in nativeMethod) {
			if (method == nativeMethod[key]) {
				if (json.status == 200) callback[key].success(json.data);
				if (json.status == 400) callback[key].error(json.message);
				return;
			}
		}

	}

	window.JsBridge.forResult = function(json) {

		forResult(json);
		
	}

	// 添加对外方法
	userMethod.forEach(function(a, b, c) {
		window.JsBridge.prototype[a] = function(json) {
			json = jsonVerification(json);
			w.p(json, a);
		}
	});

	// json参数过滤
	function jsonVerification(json) {
		json = json || {};
		json.data = json.data || {};
		json.success = json.success || w.init;
		json.error = json.error || w.init;
		return json;
	}
	
})();