module.exports = {
	// 状态模式
	/*var myState = {
		openState : function() {
			console.log('开');
			// 切换状态
			objState.setState(myState.big);
		},
		closeState : function() {
			console.log('关');
			// 切换状态
			objState.setState(myState.openState);
		},
		big : function() {
			console.log('大');
			objState.setState(myState.small);
		},
		small : function() {
			console.log('小');
			objState.setState(myState.closeState);
		}
	};

	var objState = {
		setState : function(stateObj) {
			this.currState = stateObj;
		},
		// 以前当前状态的值是其本类型，现在变成对象，状态对象，使得状态变的更立体，更丰满
		// 默认指向开对象
		currState : myState.openState
	};

	<body>
		<div id="ss"></div>
	</body>

	ss.onclick = function() {
		objState.currState();
	};*/

	// 策略模式
	/*function suanfa() {
		var suanfa = {
			sale : function(benjin, baifenbi) {
				return benjin * baifenbi;
			},
			jian : function(benjin, jiane) {
				return benjin - jiane;
			},
			normal : function(benjin) {
				return benjin * 2;
			}
		};
		return suanfa[arguments[0]].apply(null, [].splice.call(arguments, 1));
	}

	// 夏天
	console.log(suanfa('sale', 100, 0.12));
	// 冬天
	console.log(suanfa('jian', 200, 111));
	// 春天
	console.log(suanfa('normal', 300));*/

	// 代理模式
	// 图片预加载
	/*var myImage = (function() {
		var imgNode = document.createElement('img');
		document.body.appendChild(imgNode);
		return {
			setSrc : function(src) {
				imgNode.src = src;
			};
		};
	});
	var proxyImage = (function() {
		var img = new Image;
		img.onload = function() {
			myImage.setSrc(this.src);
		};
		return {
			setSrc : function(src) {
				myImage.setSrc('.....png');
				img.src; = src;
			}
		};
	});*/
	// 节流代理
	proxy : function(fn, interval) {
		// 记录是否在节流期间
		var num = 0;
		return function() {
			if (num) return; else {
				num++;
				var timer = setTimeout(function() {
					num = 0;
					clearTimeout(timer);
				}, interval || 1000);
			}
			fn.apply(null, arguments);
		};
	},

	// 单列模式
	/*
		var a = once(function() {
			alert(1);
		});
		a();
		a();
		a();
	*/
	once : function (fn) {
		var bl = true;
		return function() {
			var result;
			if (bl) result = fn.apply(null, arguments);
			bl = false;
			return result;
		};
	},

	// 职责连设计模式
	/*
		function a(a1) {
			if (a1 == 'a') alert('我是一等公民'); else return true;
		}
		function b(b1) {
			if (b1 == 'b') alert('二等公民是我'); else return true;
		}
		function c() {
			alert('我是农民');
		}
		var s1 = chain(a);
		var s2 = chain(b);
		var s3 = chain(c);
		s1.setNext(s2);
		s2.setNext(s3);
		s1.request('d');
	*/
	chain : (function () {
		function setNext(successor) {
			this.successor = successor;
		}
		function request() {
			var ret = this.fn.apply(null, arguments);
			if (ret) this.successor && this.successor.request.apply(this.successor, arguments);
		}
		return function(fn) {
			return {
				fn : fn,
				setNext : setNext,
				request : request
			};
		};
	})(),

	// 观察者模式
	/*
	{
		accont : '',
		password : '',
		smscode : ''
	}
	// 初始化key
	var a = myData(['accont', 'password', 'smscode']);
	// 监听
	a.listen('accont', function () {
		console.log('我动了accont');
	});
	a.listen('password', function () {
		console.log('我动了password');
	});
	a.listen('smscode', function () {
		console.log('我动了smscode');
	});
	// 发布新数据
	accont.addEventListener('blur', function() {
		a.set({
			accont : this.value
		});
	}, false);
	password.addEventListener('blur', function() {
		a.set({
			password : this.value
		});
	}, false);
	smscode.addEventListener('blur', function() {
		a.set({
			smscode : this.value
		});
	}, false);
	// 提交
	submit.addEventListener('touchstart', function() {
		// 获取数据
		console.log({
			accont : a.get('accont'),
			password : a.get('password'),
			smscode : a.get('smscode')
		})
	}, false);*/
	// 下个版本需要升级的内容
	// 1.初始数据层的时候就能初始数据
	// 2.可以动态添加数据
	// 3.动态删除数据
	// 4.值是引用类型而且带有嵌套的时候如何set值，如何get值，如何去继承不变的值
	// 5.使用递归去遍历树
	myData : function(arr) {
		var d = {
			// 监听事件库
			client : []
		};
		// 老数据
		var od = {};
		// 数据层初始化
		for (var i = 0, len = arr.length; i < len; i++) {
			d[arr[i]] = '';
			od[arr[i]] = '';
		}
		var method = {
			set : function(json) {
				var num = 0;
				var newarr = [];
				for (var key in json) {
					// 1. 过滤有没有
					// if (d[key] === void 0) continue;
					if (!d.hasOwnProperty(key)) continue;
					// 2. 还得过滤和之前的发生了变化没有
					d[key] = json[key];
					// 是数组
					if (Array.isArray(od[key])) {
						// 要验证与原来的包含不包含
						// 要设置的不是数组
						if (!Array.isArray(d[key])) {
							if (od[key].indexOf(d[key]) > 0) continue; else od[key].push(d[key]);	
						} else {
						// 要设置的是数组,连接加去重
							od[key] = _.only(od[key].concat(d[key]));
						}
						// 更新当前的
						d[key] = od[key];
					} else {
					// 不是数组
						// if (d[key] === od[key]) continue; else od[key] = d[key];
						// 占时都动吧，不管有没有改变值
						od[key] = d[key];
					}
					newarr.push(key);
					num++;
				}
				// 有变化的时候再去执行对应的函数
				if (!num) return;
				for (var i = 0, len = d.client.length; i < len; i++) {
					for (var j = 0, len2 = newarr.length; j < len2; j++) {
						// key
						for (var key in d.client[i]) {
							if (key == newarr[j]) {
								// d.client[i][newarr[j]](d[key], [].slice.call(arguments, 1));
								d.client[i][newarr[j]].apply(null, [d[key]].concat([].slice.call(arguments, 1)));
							}
						}
					}
				}
				
			},
			get : function(key) {
				return d[key];
			},
			listen : function(key, fn) {
				var j = {};
				j[key] = fn;
				d.client.push(j);
			}
		};
		return method;
	},
	// 装饰者模式
	/*var a = before(function(v) {
		alert(1 + v);
	}, function(v) {
		alert(2 + v);
	});
	a = before(a, function(v) {
		alert(3 + v);
	});
	a(10);*/
	decorate : function(beforeFn, afterFn) {
		return function() {
			if (beforeFn.apply(this, arguments) === false) return;
			return afterFn.apply(this, arguments);
		};
	}

};