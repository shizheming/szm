// 名称：jsBridge.js
// 版本：1.1
// 时间：2016.10
// 更新：1. 双队列
// 		 2. 增加分享到哪里的，有别于主队列异步队列，先运行主队列，再副队列，当主队列空闲的时候先运行副队列，再接着主队列
// 		 3. 完全暴露回调函数，因为有些情况是native要主动调我的

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

	// 异步的5大分享回调函数
	var ybShare = {};

	// 异步的5大分享队列
	var ybs = [];

	// 现在这里我有2个队列如何处理是关键，是他们建立联系，想把2个变成一个大队列，其中某个在干事情的时候，另一个待命，等到那个队列里面全部出队后，在接着后个队列，反之亦然

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
			return 'js://com.renwohua.conch/' + method + '?data=' + encodeURIComponent(JSON.stringify(json.data));
		},
		// 对外的方法公用的步骤
		p : function(json, a) {
			json = jsonVerification(json);
			


			// 判断用户传的数据格式正不正确
			// 1.判断是不是object
			// 2.判断是不是json

			/*if (json) {
				if (!(typeof json == 'object') && /^{.*?}$/.exec(JSON.stringify(json))) {
					alert('格式错了');
					return;
				}
			}*/


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
				success : json.success,
				error : json.error
			});



			// 如果列队里只有一个人就不需要等待，直接调用，就像进银行没有人等着，不用排队，直接办理业务
			if (bl2) {
				// 会有并发的情况
				// 也就是主队列运行完，副队列的货还没进队（副队列是延迟的话，主队列做完了，5大分享还没入队。。。呵呵）
				if (!ybs.length) {
					// 副队列里面没货的情况下再运行主队列
					// 主队列
					re[0]();
					
					re.shift();

					bl2 = false;
				}
				
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

		json = jsonVerification(json);

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
				success : json.success,
				error : json.error
			});

		} else alert('请不要重复调用签名，一次就好');
	};

	// 分享的5种静态方法初始化
	var shareInit = {
		'shareInit' : 'onShare'
	};

	// 判断副队列已经在不在自己跑
	var zp = true;

	Object.keys(shareInit).forEach(function(a, b, c) {
		window[a] = function(json) {
			// 验证格式
			json = jsonVerification(json);

			ybs.push(w.always(w.requestNative, w.mosaicURL(shareInit[a], json)));
			// 推进json中
			ybShare[a] = {
				success : json.success,
				error : json.error
			};

			// 如果主队列没货
			if (!re.length) {
				// 副队列有货
				if (ybs.length) {
					if (zp) {
						// 开关关了
						zp = false;
						var t = setInterval(function() {
							if (!ybs.length) {
								zp = true;
								clearInterval(t);
								return;
							}
							ybs[0]();
							ybs.shift();
						}, 500);
					}
				}
			}

			
		};
	});

	// 与native定义的方法
	var nativeMethod = {
		// 分享
		'share' : 'showShare',
		// 添加菜单
		'menu' : 'showMenu',
		// 关闭页面
		'close' : 'closeWindow',
		// 选择图片
		'img' : 'chooseImage',
		// 刷新页面
		'refresh' : 'refresh',
		// 选择视频
		'video' : 'videoRecord',
		// 选择联系人
		'contact' : 'chooseContact',
		// 选择通话记录
		'log' : 'chooseCallLog'
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
		}



		// 请求队列
		if (re.length > 0) {
			// 这里是队列里有，接着执行队列，发请求
			re[0]();
			re[0]();
			re.shift();

			
		}

		if (re.length == 0) {
			bl2 = true;

			// 主队列里面走完了可以走第二队列了
			if (ybs.length) {
				var t = setInterval(function() {
					// var len = ybs.length;
					// 这里不能用变量封存，要事实监控变回，因为有可能当我定时器发的时候用户后进来一个请求
					if (!ybs.length) {
						clearInterval(t);
						// 第二队列走完了，又可以走主队列了
						// 如果主队列存在
						if (re.length) {
							// 主队列
							re[0]();
							
							re.shift();

							bl2 = false;
						}

					} else {
						ybs[0]();
						ybs.shift();
					}
				}, 500);
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