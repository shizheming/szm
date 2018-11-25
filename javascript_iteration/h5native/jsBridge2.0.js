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


module.exports = (function() {

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
			/*var ifr = document.getElementById('ifr');
			if(ifr) ifr.parentNode.removeChild(ifr);
			var div = document.createElement('div');
			var iframe = '<iframe id="iframe"></iframe>';
			div.id = 'ifr';
			div.style.display = 'none';
			div.innerHTML = iframe;
			document.body.appendChild(div);
			document.getElementById('iframe').contentWindow.window.location.href = url;
			*/
			location.href = url;
			// open(url);
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
	window.JsBridge = (function() {
		var intance;
		return function(json) {
			if (intance) return intance;
			// 初始发config请求设置签名，签名通过才能正确调用方法

			json = jsonVerification(json);
			callback.zinit = {
				success : json.success,
				error : json.error
			};
			re.push(w.always(w.requestNative, w.mosaicURL('/config', json)));

			// 单体模式
			// 其实就是用个变量存下状态，和true，false一样，只不过返回的是对象，而之前就直接return，不返回自己了
			intance = this;
			

				
		};
	})();

	window.JsBridge.forResult = function(json) {
		forResult(json);
	}

	// 与native定义的方法
	var nativeMethod = {
		// 初始化
		zinit : '/config',
		// 分享
		share : '/showShare',
		// 添加菜单
		menu : '/showMenu',
		// 关闭页面
		close : '/closeWindow',
		// 选择图片
		img : '/chooseImage',
		// 刷新页面
		refresh : '/refresh',
		// 选择视频
		video : '/videoRecord',
		// 选择联系人
		contact : '/chooseContact',
		// 选择通话记录
		log : '/chooseCallLog',
		// 初始化分享到哪里
		shareInit : '/onShare',
		// 遮罩
		mask : '/crawler/mask',
		// 数据上传客户端
		client : '/crawler/work',
		// 数据上传服务端
		server : '/crawler/uploadReport',
		// 显示隐藏loading
		load : '/setLoadingIndicator',
		// 加密
		encode : '/crypt/encrypt',
		// 解密
		decode : '/crypt/decrypt',
		// 给客户端传token
		// 之后要变成私有方法，因为第三方用不到
		token : '/member/loginResponse',
		// 清除记录
		record : '/forward',
		// 保存图片到相册
		saveImg : '/saveImageToAlbum',
		// 各种信息
		info : '/deviceInfo',
		// 地理位置
		location: '/getLocation',
		// 是什么系统-安卓还是苹果
		system : '/getClientType',
		// 同盾
		shield : '/getBlackBox'
	};


	// 对外方法队列
	var userMethod = Object.keys(nativeMethod);

	// 这个给native回调的函数暴露在外面怎么办?
	// native统一调我的回调函数
	// native回调我的函数

	function forResult(json) {
		// alert(JSON.stringify(json));
		var method = json.action.replace('//', '/');
		// alert(method);
		for (var key in nativeMethod) {
			if (method == nativeMethod[key]) {
				// alert(JSON.stringify(callback));
				// console.log(callback);
				// alert(key)
				if (json.status == 200) callback[key].success(json.data);
				if (json.status == 400) callback[key].error(json.message);
				return;
			}
		}

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



