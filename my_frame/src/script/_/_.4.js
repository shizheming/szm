/*
版本：0.4
时间：2017.3
更新：1.添加mvp框架
	  2.添加initDefault初始化json对象，添加默认值
	  3.添加env测试或是正式环境host
	  4.升级getObj寻找对象，添加多种情况，能通过单建单值或键值来寻找对象
*/
// ------------------------------------------------------------


window._ = {


	/******************常用一阶函数******************/


	// 随机n-m之间的数
	random : function(n, m) {
		return parseInt(n + Math.random() * (m - n));
	},
	// 去重
	only : function(arr) {
		var arr2 = [];
		function findInArr(arr, num) {
			for(var i = 0,len = arr.length; i < len; i++) if(arr[i] === num) return true;
			return false;
		};
		i = 0;
		while(i < arr.length) {
			if (!findInArr(arr2, arr[i])) arr2.push(arr[i]);
			i++;
		};
		return arr2;
	},
	// 补零
	zero : function (n) {
		return n < 10 ? '0' + n : '' + n;
	},
	// 打乱顺序
	shuffle : function(obj) {
	    var length = obj.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	        rand = n(0, index);
	        if (rand !== index) shuffled[index] = shuffled[rand];
	        shuffled[rand] = obj[index];
	    }
	    return shuffled;
	},
	// k函数 返回一个用一次的变量
	val : function(val) {
	    return val;
	},
	// 最大值
	max : function(arr) {
		return Math.max.apply(null, arr);
	},
	// 最小值
	min : function(arr) {
		return Math.min.apply(null, arr);
	},
	// 判断一个值存在数组中没有
	include : function(arr, target) {
		return arr.indexOf(target) != -1;
	},
	// 删除数组中的元素
	without : function(array, del) {
		var result = [];
		array.forEach(function(a, b, c) {
			if (a != del) result.push(a);
		});
		return result;
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
	// 数组扁平化
	arrFlatten : function(input) {
		var result = [];
		for (var i = 0, length = input.length; i < length; i++) {
			var value = input[i];
			if (Array.isArray(value)) {
				value = arrFlatten(value);
				for (var j = 0, len = value.length; j < len; j++) result.push(value[j]);
			} else result.push(value);
		}
		return result;
	},
	range : function(start, stop, step) {
		if (arguments.length <= 1) {
			stop = start || 0;
			start = 0;
		}
		step = step || 1;
		var length = Math.max(Math.ceil((stop - start) / step), 0);
		var range = Array(length);
		for (var idx = 0; idx < length; idx++, start += step) range[idx] = start;
		return range;
	},
	// 對象並集
	extend : function(obj) {
		var length = arguments.length;
		if (length < 2 || obj == null) return obj;
		for (var index = 1; index < length; index++) {
			var source = arguments[index];
			var keys = Object.keys(source);
			var l = keys.length;
			for (var i = 0; i < l; i++) {
				var key = keys[i];
				if (obj[key] === void 0) obj[key] = source[key];
			}
		}
		return obj;
	},
	// 返回当前日期信息
	date : function(time) {
	    var n = new Date(time);
	    return [n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds()];
	},
	// 数字3位加逗号，金钱显示
	money : function(num) {
		return num.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^\,/,'');
	},
	// 获取某个月份的天数
	days : function(year, month) {
	    return new Date(year, month, 0).getDate();
	},
	// 秒倒计时
	second : function(time, fn1, fn2) {
		fn1 && fn1(time);
		var timer = setInterval(function(){
		    fn1 && fn1(--time);
		    if (time == 0) {
		        clearInterval(timer);
		        fn2 && fn2();
		    }
		},1000);
	},
	// 完整的倒计时
	countDown : function(c, fn) {
		upDate(c, fn);
		var timer = setInterval(function() {
			if (!upDate(c, fn)) clearInterval(timer);
		},1000);

		function upDate(c, fn){
			var d = new Date();
			//获取当前时间戳
			var nowTime = d.getTime();
			// 后台直接给了时间戳，我这里不用写
			// d.setFullYear(y1, y2, y3);
			// d.setHours(0, 0, 0, 0);
			//结束时间戳
			// var overTime = d.getTime();
			var overTime = c * 1000;
			//结束事件戳-当前时间戳 
			var mist = parseInt((overTime - nowTime) / 1000);
			var date = parseInt(mist / 86400);
			//去天后的秒数
			mist = mist % 86400	
			var hours = parseInt(mist / 3600);
			//去小时后的秒数
			mist = mist % 3600;
			var minutes = parseInt(mist / 60)
			mist = mist % 60;
			fn && fn(date, hours, minutes, mist);
			return date + hours + minutes + mist;
		}
	},
	// 随机颜色
	randomColor : function(){
		return '#' + Math.floor(Math.random() * parseInt('0xffffff',16).toString(10)).toString(16);
	},
	// 通过平级key寻找当前对象
	getObj : function() {
		// 现在有2种情况
		var arr = [function(obj, one, result) {
			// 2.只知道key或只知道val
			for (var oldKey in obj) {
				if (typeof obj[oldKey] === 'object') {
					if (oldKey == one) return obj;
					result = arguments.callee(obj[oldKey], one, result);
					if (result) return result;
				} else if (one in obj) return obj; else if(one == obj[oldKey]) return obj;
			}
		}, function(obj, newKey, val, result) {
			// 1.知道key和val
			for (var oldKey in obj) {
				if (typeof obj[oldKey] === 'object') {
					// console.log(arguments.callee);
					result = arguments.callee(obj[oldKey], newKey, val, result);
					if (result) return result;
				} else if (obj[newKey] == val) return obj;
			}
		}];
		return arr[arguments.length % 2].apply(null, arguments);
	},
	// 判断2个集合是否相等
	equal : function(a, b, aStack, bStack) {
		var c1 = Object.prototype.toString.call(a);
		// 类型不同直接out
		if (c1 !== Object.prototype.toString.call(b)) return false;
		// 判断不同类型
		// 最终还是直达基本类型来比较
		switch (c1) {
			case '[object String]' :
			case '[object RegExp]' :
				return '' + a === '' + b;
			case '[object Number]' :
			case '[object Date]' :
			case '[object Boolean]' :
				return +a === +b;
		}
		// 初次就产生栈
		aStack = aStack || [];
		bStack = bStack || [];
		// 进栈
		aStack.push(a);
		bStack.push(b);
		// 从a的key入手
		var akeys = Object.keys(a);
		var key;
		var length = akeys.length;
		// 首先判断2个集合的长度是否一样，不一样就立马停掉，后面都不需要做了
		if (length !== Object.keys(b).length) return false;
		while (length--) {
			// 每个key
			key = akeys[length];
			// 开始判断了
			if (!equal(a[key], b[key], aStack, bStack)) return false;
		}
		// 这个维度验证通过，栈弹出

		// 直接递归就可以了，为什么还要用到栈呢？？？？？

		aStack.pop();
		bStack.pop();
		// 到这里就说明这一维度的数组的值相等
		return true;
	},
	// html渲染模板
	/*
		[??] : 重复输出-放哪里都一样
		(=属性名=) : 需要套的地方的语法
		<div id="mm">
			<script type="szm" id="mod">
				[??]
				<div class="img">
					<input value="商品名称：(=thumb=)">
				</div>
				<div class="main">
					<span class="text-org mui-h4"><em>商品价格：￥(=shop_price=)</em></span>
				    <div class="hd-h5 margin-small-top">到货天数：(=days.hello=)</div>
				</div>
			</script>
		</div>
		var a = rendering(document.getElementById('mm').innerHTML, {
			thumb : 1,
			shop_price : 2,
			days : {
				hello : 3
			}
		});
	*/
	// 现在只能在结构不变的情况下循环动态渲染，结构变了就挂了
	// data如果不是json而是数组呢，那就又挂了
	// 如果后台返回的数据有判断状态的，那就又挂了
	// 这种模板也需要中间层不是因为有时候需要处理后台给的原始数据，比如时间戳
	rendering : function(m, data) {
		var result = '';
		var re = /\[\?\?\]/.exec(m);
		// 循环输出
		if (re) {
			m = m.replace(re[0], '');
			var keys = Object.keys(data);
			keys.forEach(function(a, b, c) {
				result += che(m, data[a]);
			});
			return result;
		}
		// 单输出
		function che(m, data) {
			// 匹配属性替换json的值
			var re = /\(=.*?=\)/g;
			var rs;
			while ((rs = re.exec(m)) != null) {
				// 去标签,吧标签变成属性名
				// 如果是嵌套属性？？？？？？？
				// 解决了
				var x = rs[0].replace(/\(=(.*?\.?)=\)/, '$1');
				// 有嵌套
				if (/.*?\./.exec(x)) {
					var lastz;
					// 嵌套变数组
					var jk = x.split('.');
					for (var u = 0, ll = jk.length; u < ll; u++) {

						if (!lastz) {
							lastz = data[jk[0]];
						} else {
							lastz = lastz[jk[u]];
						}
					}
					// 替换属性名变属性值
					m = m.replace(rs[0], lastz);
				} else {
					// 替换属性名变属性值
					m = m.replace(rs[0], data[x]);
				}
			}
			return m;
		}
		return che(m, data);
	},
	// 解决浮点数
	// 加法
	accAdd : function(arg1, arg2) {
	    var r1, r2, m;
	    try {
	        r1 = arg1.toString().split(".")[1].length;
	    } catch(e) {
	        r1 = 0
	    }
	    try {
	        r2 = arg2.toString().split(".")[1].length;
	    } catch(e) {
	        r2 = 0
	    }
	    m = Math.pow(10, Math.max(r1, r2));
	    return (_.accMul(arg1, m) + _.accMul(arg2, m)) / m;
	},
	// 减法
	accSub : function(arg1, arg2){      
	    return _.accAdd(arg1, -arg2);  
	},
	// 乘法
	accMul : function(arg1, arg2) {
	    var m = 0,
		    s1 = arg1.toString(),
		    s2 = arg2.toString();
	    try {
	        m += s1.split(".")[1].length;
	    } catch(e) {}
	    try {
	        m += s2.split(".")[1].length;
	    } catch(e) {}
	    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	},
	// 除法
	accDiv : function(arg1, arg2) {
	    var t1 = 0,
		    t2 = 0,
		    r1,
		    r2;
	    try {
	        t1 = arg1.toString().split(".")[1].length;
	    } catch(e) {}
	    try {
	        t2 = arg2.toString().split(".")[1].length;
	    } catch(e) {}
	    with(Math) {
	        r1 = Number(arg1.toString().replace(".", ""));
	        r2 = Number(arg2.toString().replace(".", ""));
	        return (r1 / r2) * pow(10, t2 - t1);
	    }
	},
	// 浅复制对象
	clone : function(json) {
		var result = {};
		for (var key in json) result[key] = json[key];
		return result;
	},
	// 验证
	reg : function(type, str) {
		var exp = {
			tel : /^\d{11}$/,
			IDcard : /(?:^\w{18}$)|(?:^\w{15}$)/,
			mail : /^.+?@.+?$/,
			init : /^(?:(?:\S.+|.+\S.+|.+\S)|\S)$/
		};
		return exp[type].test(str);
	},
	trim : function(str) {
		return str.replace(/(^\s*)|(\s*$)/g,'');
	},



	/******************常用高阶函数******************/
	// 初始默认值
	initDefault : function(json) {
		return function(key) {
			var result = '';
			if (json[key] == void 0) {
				console.error(key + ' 值没有！');
			} else result = json[key];
			return result;
		};
	},

	// 函数节流
	// 下个版本更新下节流吧
	throttle : function(fn, interval) {
		var self = fn;
		var timer;
		var firstTime = true;
		return function() {
			var args = arguments;
			var me = this;
			if (firstTime) {
				self.apply(me, args);
				return firstTime = false;
			}
			if (timer) {
				return false;
			}
			timer = setTimeout(function() {
				clearInterval(timer);
				timer = null;
				firstTime = true;
				self.apply(me, args);
			}, interval || 500);
		};
	},
	// always函数 存一个变量的状态
	always : function(val, arr) {
	    return function() {
	        return Array.isArray(arr) ? val.apply(null, arr) : val;
	    };
	},
	// 延迟列队
	queue : function(time) {
	    return (function(arr, t) {
	        return function(fn) {
	            arr.push(fn);
	            setTimeout(function() {
	                arr[0]();
	                arr.shift();
	            }, ++t * time);
	        }
	    })([], 0);
	},
	// ajax提交的开关，可以设置多个开关
	// 异步的开关
	// 一个都不能少开关
	/*
		var a = biro({
			bl : true,
			argee : true
		});
		submit.addEventlistener('touchstart', function() {
			// 开关
			if (a.get()) return;
			a.set({
				bl : true,
				argee : true
			});
			$.ajax({
			    complete: function () {
			        a.set({
			        	bl : true,
			        	argee : true
			        });
			    },
			    error: function (msg) {
			    },
			    success: function (msg) {
			    }
			});
		}, false);
	*/
	btnActive : function (json) {
		// 这个是一股脑的最终状态
		var status = true;
		return {
			set : function(n) {
				for (var key in n) {
					if (json[key] === void 0) continue;
					json[key] = n[key];
				}
			},
			get : function() {
				// 每次复原
				status = true;
				for (var key in json) if (!json[key]) status = false;
				return status;
			},
			// 获取单个状态，像验证码一开始是不要的，然后在触发条件的情况下才要的，有个层次关系
			getOne : function(key) {
				return json[key];
			}
		};
	},


	/********************设计模式******************/

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
	},

	/******************DOM******************/


	// 弹窗
	popUp : function(str, uf, btn) {
		btn = btn ? btn : '确定';
	    // 创建div
	    function createDom(n, fn) {
	        var doc = document;
	        var popUp = doc.createElement('div');
	        popUp.id = 'popUp';
	        popUp.innerHTML = '<div class="content"><div class="con">' + n + '</div><div class="ys">' + btn + '</div><div class="close"><img src="//rwhstorage-pub.oss-cn-shanghai.aliyuncs.com/dist/images/webr_icon_x.png"></div></div><div class="mark"></div>';
	        fn(popUp, doc, uf);
	        return popUp;
	    }
	    // 绑定事件
	    function et(dom, doc, fn) {
	    	// 确定按钮
	        dom.querySelector('.ys').addEventListener('click', function() {
	            doc.body.removeChild(dom);
	            fn && fn();
	        });
	        // 关闭按钮
	        dom.querySelector('.close').addEventListener('click', function() {
	            doc.body.removeChild(dom);
	        });
	    }
	    return createDom(str, et);
	},
	// 复制内容到剪切板
	clipboard : function(text) {
		var doc = document;
		var input = doc.createElement('input');
		input.value = text;
		doc.body.appendChild(input);
		input.select();
		doc.execCommand('copy');
		doc.body.removeChild(input);
	},
	// 公共提示信息
	title : function(msg) {
		var doc = document;
		var mg = doc.querySelector('.message2');
		if (mg) mg.remove(mg); else mg = doc.createElement('div');
		mg.className = 'message2';
		mg.innerHTML = '<div class="div">' + msg + '</div>';
		doc.body.appendChild(mg);
	},
	// 图片懒加载
	initImg : function() {
		var doc = document;
		// 图片代理
		var imgProxy = (function() {
			// 图片本体
			function imgSrc(dom, url) {
				dom.src = url;
			}
			return function(that) {
				var img = doc.createElement('img');
				imgSrc(that, '//rwhstorage-pub.oss-cn-shanghai.aliyuncs.com/dist/images/initImg.png');
				img.src = that.dataset.src;
				img.onload = function() {
					imgSrc(that, that.dataset.src);
				};
			};
		})();
		// 初始默认图片
		[].forEach.call(doc.querySelectorAll('img[data-src]'), function(a, b, c) {
			imgProxy(a);
		});
	},
	// 获取cookie
	getCookie : function(name) { 
	    var arr;
	    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	    if (arr = document.cookie.match(reg)) return unescape(arr[2]); else return null;
	},
	addLoad : function() {
		var doc = document;
		var div = doc.createElement('div');
		div.id = 'huahua';
		div.innerHTML = '<img src="//rwhstorage-pub.oss-cn-shanghai.aliyuncs.com/dist/images/huahua.gif">';
		doc.body.appendChild(div);
	},
	removeLoad : function() {
		var doc = document;
		doc.body.removeChild(doc.getElementById('huahua'));
	},
	ajax : function(json) {
		_.addLoad();
		$.ajax({
			type: json.type,
			url: json.url,
			data: json.data,
			dataType: 'json',
			complete: function () {
				_.removeLoad();
				json.complete ? json.complete() : '';
			},
			error: function (msg) {
				json.error ? json.error(msg) : '';
			},
			success: function (msg) {
				json.success ? json.success(msg) : '';
			}
		});
	},
	// 判断微信打开网页
	// isWeixnOpen()
	isWeChat : function() {
	    var ua = navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == "micromessenger") return true; else return false;
	},



	/******************业务函数******************/


	// 去测试登录还是去正式登录
	loginUrl : function(debug) {
		debug = debug && true;
		var test = '//103.37.149.172:8895';
		var formal = '//passport.renwohua.com';
		var route = '/user/loadLogin?';
		return function(channel_id, channel_code) {
			var url = !debug ? formal : test;
			channel_id = channel_id ? channel_id : '';
			channel_code = channel_code ? channel_code : '';
			if (!channel_code && _.getCookie('channel_code')) {
				channel_code =  _.getCookie('channel_code');
			}
			return url + route + 'channel_id=' + channel_id; + '&channel_code=' + channel_code;
		};
	},
	// 测试环境还是正式环境
	env : function(str) {
		var rwhApiDomain = {
			'172' : 'http://103.37.149.172',
			'201' : 'http://api.test.renwohua.com',
			formal : 'https://api.renwohua.com'
		};
		str ? str = rwhApiDomain[str] : str = rwhApiDomain.formal;
		return function(route) {
			return str + route + '?channel_code=RENWOHUA_WECHAT_LOAN';
			// return str + route + '?channel_code=RENWOHUA_CASH_LOAN';
		};
	}
};

// 判断数据类型
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Array', 'Object'].forEach(function(element, index, array) {
	window['is' + element] = function(obj) {
		return Object.prototype.toString.call(obj) === '[object ' + element + ']';
	};
});

// 现在有个问踢就是怎么融合策略模式和装饰者模式
// 具体点就是jsbridge是我们app里面自己用的，可是在wechat里面不需要，怎么处理特别是后台返回跳转页面后，我要去跳，怎么跳，判断wechat还是app然后怎么融合设计模式

// 弹窗以后需要添加取消按钮（做商场后滩编辑的时候）


// 算法-先排序整理

// 表单策略模式

/*********************************设计原则********************************************/
/*
1.单一原则：
	一个对象（方法）只做一件事，一个对象（方法）应该仅有一个引起他变化的原因

2.最少知道原则：
	一个对象（方法）应当尽可能少的去其他对象（方法）发生相互作用
	“城门失火殃及池鱼，一人犯法株连九族”

3.开放-封闭原则


*/




/*****************************MVC**********************************/
/*
使用MVC的目的是将M和V的实现代码分离
C存在的目的则是确保M和V的同步，一旦M改变，V应该同步更新。

Model（模型）是应用程序中用于处理应用程序数据逻辑的部分。
通常模型对象负责在数据库中存取数据。

也就是说m层不单单是储存纯数据，还有数据之间的业务逻辑

MVC 分层有助于管理复杂的应用程序，因为您可以在一个时间内专门关注一个方面。例如，您可以在不依赖业务逻辑的情况下专注于视图设计。同时也让应用程序的测试更加容易。


Model（模型）是应用程序中用于处理应用程序数据逻辑的部分。
　　通常模型对象负责在数据库中存取数据。
View（视图）是应用程序中处理数据显示的部分。
　　通常视图是依据模型数据创建的。
Controller（控制器）是应用程序中处理用户交互的部分。
　　通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

控制器
控制器接受用户的输入并调用模型和视图去完成用户的需求，所以当单击Web页面中的超链接和发送HTML表单时，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。

*/


/*
我要写个公共调试的方法，不然分的很开后，上线忘了去掉很麻烦
需要个有些时候需要手机加密，然后我用游览器调试的时候就过不去，我得写个兼容的测试方法
我要写个各种测试的调试代码
*/





/************************mvp*************************/
// 怎么用
// 协议
// controller通过data-bind来从dom获取，model通过ajax后的josn映射来获取
// ajax通过jsonkey在model里面找obj，view通过tagname来找赋值对应的方法


// model只提供给view和controller增删改查的功能
// 数据模型
window.model = (function() {
	// 内部方法
	var privateMethod = {
		// 1.观察者
		observer : (function() {
			var myData;
			return function(json) {
				for (var key in json) {
					var arrKey = [];
					var arrVal = [];
					for (var key2 in json[key]) {
						arrKey.push(key2);
						arrVal.push(json[key][key2]);
					}
					// 创建观察者
					myData = _.myData(arrKey);
					(function(name) {
						var getObj = _.getObj(model.records, key);
						arrKey.forEach(function(a, b, c) {
							// 现在这里是一对一观察，如何变成一对多观察，减少观察者的同时提高性能，一个数据模型对象只有一个观察者，这个观察者观察这个数据模型对象里面所有的值的变化
							myData.listen(a, function(data) {
								// 通过a来判断监听的内容
								var obj = {
									reg : function() {
										// 这个值来判定他是空还是验证错了
										var num;
										if (!getObj[key].value) num = 0; else num = 1;
										var pass = privateMethod.verification(getObj[key].value, getObj[key].reg);
										if (pass) num = 2;
										// 设置验证状态
										var obj = {};
										obj[key] = {
											// regActive : pass
											regActive : num
										};
										model.set(obj);
										return num;
									}
								};
								// 给个默认运行函数
								obj[a] = isFunction(obj[a]) ? obj[a] : function() {}; 
								obj[a]();
								// 告知controller，model有变动
								controller.modelHooks({
									data : data,
									tagName : getObj[key].tagName,
									key : key,
									isWant : a,
									pass : a == 'reg' ? obj.reg() : undefined,
									placeholder : getObj[key].placeholder
								});
							});
							var obj = {};
							obj[a] = arrVal[b];
							myData.set(obj);
						});
					})(key);
				}
			};
		})(),
		// 2.单验证
		verification : function(str, reg) {
			return new RegExp(reg).test(str);
		},
		// 3.全验证
		allVerification : function() {
			for (var key in model.records) {
				for (var key2 in model.records[key]) {
					if (key2 == 'regActive') {
						// 通过0和1来告诉controller我是空还是验证失败
						// 0和1是给input框用的，因为input有2种状态，空的和错的，还同意只有一种，空的
						if (model.records[key][key2] === 0 || model.records[key][key2] === 1) {
							return key + model.records[key][key2];
						// 这里是给同意的
						} else if (model.records[key][key2] === false) return key;
					}
				}
			}
			return true;
		}
	};
	
	

	var newObj = {
		// 所有的数据
		records : '',
		// 删除某条数据
		del : function(key) {
			delete model.records[key];
		},
		// 删除所有的数据
		delAll : function() {
			model.records = {};
		},
		// 找到某条数据
		get : function(key) {
			// 这里要更新下如果是去找某个下面的下面的对象,现在先不管
			var arr = [];
			arr.push(model.records);
			arr.push(key);
			return _.getObj.apply(null, arr)[key];
		},
		// 设置数据
		set : function(json) {
			/*
				{
					phone : {
						ggg : 555
					},
					password : {
						jjj : 999
					}
				}
			*/
			for (var key in json) {
				var result = _.getObj(model.records, key);
				if (result) {
					// 初始化有的值对象里面添加或是修改值
					result = result[key];
					for (var key2 in json[key]) result[key2] = json[key][key2];
				} else {
					// 添加初始化没有的值对象
					model.records[key] = json[key];
				}
			}
			// 绑定观察者
			privateMethod.observer(json);
		},
		// 初始化数据层
		init : function(json) {
			model.records = json;
		},
		// 全验证
		allVerification : function() {
			// 添加选择
			return privateMethod.allVerification();
		}
	};
	return newObj;
})();

// 视图
window.view = (function(doc) {
	// 所有的方法
	var fnAll = {};

	// 1.赋值方法
	var fnName = ['innerHTML', 'value', 'src'];
	var fnBody = function(key) {
		return function(name, val) {
			var dom = doc.querySelector('[data-bind=' + name + ']');
			dom[key] = val;
		};
	};
	fnName.forEach(function(a, b, c) {
		fnAll['set' + a] = fnBody(a);
	});

	// 2.提示信息的方法
	fnAll.title = _.proxy(_.title, 2000);

	// 3.用户选择选项
	fnAll.choose = (function() {
		var choice = doc.querySelector('[data-choose]');
		if (!choice) return;
		var classN = choice.className;
		return function(active) {
			if (active) {
			    choice.classList.remove(classN);
			    active = false;
			} else {
			    choice.classList.add(classN);
			    active = true;
			}
		};
	})();

	// 倒计时
	fnAll.countDown = (function() {
		var down = doc.querySelector('[data-code]');
		if (!down) return;
		return function(text, time) {
			down.style.cssText = 'border:1px;background-color:#ccc;color:#333;';
			_.second(time, function(time) {
			    down.innerHTML = time;
			}, function() {
			    down.innerHTML = text;
			    down.style.cssText = '';
			});
		};
	})();


	return fnAll;
})(document);

// 控制器
window.controller = (function(doc) {
	// controller要初始化生成id
	var obj = {};
	var dom = doc.querySelectorAll('[data-bind]');
	var sub = doc.querySelector('[data-submit]');
	var choice = doc.querySelector('[data-choose]');
	var vertifyCode = doc.querySelector('[data-code]');
	if (!dom) return;
	[].forEach.call(dom, function(a, b, c) {
		

		// 添加对象属性
		obj[a.dataset.bind] = {};
		// 添加标签属性
		obj[a.dataset.bind].tagName = a.tagName.toLowerCase();
		obj[a.dataset.bind].reg = a.dataset.reg;
		obj[a.dataset.bind].placeholder = a.placeholder;
		obj[a.dataset.bind].regActive = a.regActive ? a.regActive : 0;
		// 初始化绑定事件
		if (obj[a.dataset.bind].tagName == 'input') {
			// 实时监控
			a.addEventListener('input', function() {
				var obj2 = {};
				obj2[a.dataset.bind] = {
					value : a.value
				};
				model.set(obj2);
			});
			// 失去焦点
			a.addEventListener('blur', function() {
				var obj2 = {};
				obj2[a.dataset.bind] = {
					reg : a.dataset.reg
				};
				model.set(obj2);
			});
		}
	});
	// 验证提交
	sub ? sub.addEventListener('click', function() {
		var result = model.allVerification();
		if (result !== true) {
			var key = /[^\d]+/.exec(result);
			var num = /\d/.exec(result);
			var arr = [function() {
				view.title('请填写' + _.getObj(model.records, key)[key].placeholder);
			}, function() {
				view.title(_.getObj(model.records, key)[key].placeholder);
			}];
			// 因为这里有可能是同意
			num === null ? num = 1 : num;
			arr[num]();
			return;
		}
		controller.ajax();
	}) : '';
	// 用户选择项
	if (choice) {
		obj[choice.dataset.choose] = {};
		obj[choice.dataset.choose].placeholder = choice.dataset.placeholder;
		obj[choice.dataset.choose].regActive = choice.dataset.active;
		choice.addEventListener('touchstart', function() {
			var choiceActive = model.get(choice.dataset.choose).regActive;
			var newO = {};
			newO[choice.dataset.choose] = {};
			newO[choice.dataset.choose].regActive = choiceActive ? false : true;
			model.set(newO);
			view.choose(choiceActive);
		});
	}
	// 验证码
	if (vertifyCode) {
		vertifyCode.addEventListener('touchstart', function() {
			if (!isNaN(vertifyCode.innerHTML)) return;
			controller.vertifyCode();
		});
	}

	// 初始model
	model.init(obj);
	
	return {
		modelHooks : function(json) {
			// 不同的key触发不同的view或是用户自己绑定的时间
			// value内定
			var obj = {
				value : function() {
					var tag = {
						value : ['input'],
						src : ['img'],
						innerHTML : ['div']
					};
					// view显示值
					for (var key in tag) {
						if (json.tagName == tag[key]) view['set' + key](json.key, json.data);
					}
				},
				reg : function() {
					var arr = [function() {
						// 空的不提示
						// view.title('请填写' + json.placeholder);
					}, function() {
						view.title(json.placeholder);
					}, function() {}];
					arr[json.pass]();
				}
			};
			var want = isFunction(obj[json.isWant]) ? obj[json.isWant] : function() {};
			want();
		},
		viewHooks : function() {},
		ajax : function() {
			console.log('success!!!');
		},
		vertifyCode : function() {
			view.countDown('验证码', 60);
		},
		init : function() {
			// 初始页面也要初始数据，万一人家输入数据跳出页面然后又回退回来，游览器会记录数据，我不会
			if (!dom) return;
			// 看看是不是第一次，看看有没有一个值
			if ([].every.call(dom, function(that) {
				return that.value == '';
			})) return;
			[].forEach.call(dom, function(a, b, c) {
				// 获取并触发验证
				var cObj2 = {};
				cObj2[a.dataset.bind] = {
					value : a.value,
					reg : a.dataset.reg
				};
				model.set(cObj2);
			});
		}
	};
})(document);