// 名称：mScore.js
// 版本：1.0
// 时间：2016.8
// ------------------------------------------------------------

window._ = {
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
	// 截取数组
	intercept : function(arr, num) {
	    var result = [];
	    for(var i = 0; i < num; i++) result[i] = arr[i];
	    return result;
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
	// 返回json的长度
	size : function(obj) {
		return Object.keys(obj).length;
	},
	// 只运行一次的函数
	once : function (fn) {
		var sc = true;
		return function() {
			if (sc) fn();
			sc = false;
		};
	},
	// 动态加载js
	loadJs : function(url, fn) {
	    var oHead = document.querySelector('head'); 
	    var oScript = document.createElement("script"); 
	    oScript.src = url;
	    oScript.onload = function() {
	    	fn && fn();
	    }; 
	    oHead.appendChild( oScript);
	    
	},
	// 二进制转十进制
	by2 : function (num) {
		var b = [];
		while (num > 0) {
			b.push(num % 2);
			num = Math.floor(num / 2);
		}
		return b.reverse().toString();
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



	// 函数节流
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
	// 返回当前日期信息
	date : function(time) {
	    var n = new Date(time);
	    return [n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getDay(), n.getHours(), n.getSeconds()]
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
		var timer = setInterval(function(){
		    time--;
		    fn1 && fn1();
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
				    <div class="hd-h5 margin-small-top">到货天数：(=days=)</div>
				</div>
			</script>
		</div>
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
	// 随机颜色
	randomColor : function(){
		return '#' + Math.floor(Math.random() * parseInt('0xffffff',16).toString(10)).toString(16);
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
	}
	
};

// 判断数据类型
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Array'].forEach(function(element, index, array) {
	window['is' + element] = function(obj) {
		return Object.prototype.toString.call(obj) === '[object ' + element + ']';
	};
});


// 算法-先排序整理



/*{
    id : id
    title : 借款-借款用途//标题
    request_time : //请求时间
    req_money : //借款金额
    operation_fee_status : //平台运营费状态 0初始状态 1正常 2已退还 3已扣除
    status_text : //状态字符串
    operation_fee : //运营费
}
    
    

<script type="szm" id="ssss">
	<div class="con" title="(=id=)">
		<div class="title"><span>(=title=)</span><span class="fr">(=request_time=)</span></div>
		<div class="je">
			<span>(=req_money=)</span>
			<span>借款金额(元)</span>
		</div>
		<div class="je">
			<span>(=operation_fee=)</span>
			<span>运营费(元)</span>
		</div>
		<div class="je">
		// (=status_text=)会读不出来
			<span title="(=operation_fee_status=)" class="zt">(=status_text=)</span>
			<span  class="tz">运营状态</span>
		</div>
	</div>
</script>*/


