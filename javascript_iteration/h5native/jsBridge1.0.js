// 名称：jsBridge.js
// 版本：1.0
// 时间：2016.10

// -------------------------------------------------------------------------
// 用法--稍等见api



// sdk
// js://com.renwohua.conch/crawler/injection?data=json
// success--error
// 分享5个函数

/*{
	data : {} || [],
	success : function() {},
	error : function() {}
}*/

// 程序 = 数据结构 + 算法

(function() {

	// 发一次的配置请求
	var bl = true;

	var bl2 = true;

	// 请求native的队列
	var re = [];
	// 存用户回调函数
	var reFn = [];

	// 异步的5大分享
	var ybShare = {};


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
			return 'js://com.renwohua.conch/' + method + '?' + JSON.stringify(json.data);
		},
		// 对外的方法公用的步骤
		p : function(json, a) {
			// 判断用户传的数据格式正不正确
			// 1.判断是不是object
			// 2.判断是不是josn

			if (json) {
				if (!(typeof json == 'object') && /^{.*?}$/.exec(JSON.stringify(json))) {
					alert('格式错了');
					return;
				}
			}


			// 当用户调用方法时入队,一次完整的与nativ交互完成后出队
			// 入队-出队在回调那里

			re.push(w.always(w.requestNative, w.mosaicURL(nativeMethod[a], json), function() {
				// 减少给native函数暴露在外面的时间
				// 请求时暴露出来
				// native回调请求完，立马隐藏起来
				// 但名字海的每次都变，不能不变，万一人家用定时器刷这个名字呢
				// 还是要套签名
				// 现在先这样吧，名字先不变，先减少暴露时间
				// window.JsBridge.forResult = forResult;
			}));

			// 添加用户回调函数存起来
			// 入队
			reFn.push({
				success : json.success || w.init,
				error : json.error || w.init
			});



			// 如果列队里只有一个人就不需要等待，直接调用，就像进银行没有人等着，不用排队，直接办理业务
			if (bl2) {
				re[0]();
				
				re.shift();

				bl2 = false;
			}

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

		if (bl) {
			bl = false;


			// 第一次手动也要给他暴露回调函数
			// 打开native的门
			w.requestNative(w.mosaicURL('config', json));
			// window.JsBridge.forResult = forResult;
			bl2 = false;
			

			// 添加用户回调函数存起来
			// 入队
			reFn.push({
				success : json.success || w.init,
				error : json.error || w.init
			});

		} else alert('请不要重复调用签名，一次就好');
	};

	// 分享的5种静态方法初始化
	var shareInit = {
		'qqInit' : 'onShareQQ',
		'weiboInit' : 'onShareWeiBo',
		'qzoneInit' : 'onShareQZONE',
		'weixinInit' : 'onShareWeixin',
		'friendsCircleInit' : 'onShareWeixinCircle'
	};
	Object.keys(shareInit).forEach(function(a, b, c) {
		window[a] = function(json) {
			w.requestNative(w.mosaicURL(a, json));
			// 推进json中
			ybShare[a] = {
				success : json.success || w.init,
				error : json.error || w.init
			};
		};
	});

	// 与native定义的方法
	var nativeMethod = {
		// 分享
		'share' : 'share',
		// 添加菜单
		'addMenu' : 'showMenu',
		// 去支付
		'pay' : 'loan/shop',
		// 关闭页面
		'close' : 'finish',
		// 上传文件
		'upload' : 'upload/image'
	};


	// 对外方法队列
	var userMethod = Object.keys(nativeMethod);

	// 这个给native回调的函数暴露在外面怎么办?
	// native统一调我的回调函数
	// native回调我的函数

	function forResult(json) {
		// 断开暴露
		// 现在有异步调用的情况了只能一直暴露了
		// window.JsBridge.forResult = null;

		for (var key in shareInit) {
			if (json.action == shareInit[key]) {
				if (json.status == 200) ybShare[key].success(json.data);
				if (json.status == 400) ybShare[key].error(json.message);
				// 是5大分享的话就不要再往下运行了，不能和下面的队列混淆
				return;
			}
		}




		// 用户回调函数执行
		// 回调队列
		if (reFn[0]) {
			if (json.status == 200) reFn[0].success(json.data);
			if (json.status == 400) reFn[0].error(json.message);
			// 出队
			reFn.shift();
		} //else reFn.shift();



		// 请求队列
		if (re.length > 0) {
			// 这里是队列里有，接着执行队列，发请求
			re[0]();
			re[0]();
			re.shift();

			
		}

		if (re.length == 0) bl2 = true;
	}	

	window.JsBridge.forResult = function(json) {

		forResult(json);
		// 
	}

	// 添加对外方法
	userMethod.forEach(function(a, b, c) {
		window.JsBridge.prototype[a] = function(json) {
			w.p(json, a);
		}
	});
	
})();