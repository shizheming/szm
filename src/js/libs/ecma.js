/*
名称：ecma.js
版本：1.0
时间：2017.4
*/
// ------------------------------------------------------------
module.exports = {



	/******************常用一阶函数******************/



	// 随机n-m之间的数
	random : function(n, m) {
		return parseInt(n + Math.random() * (m - n));
	},
	// 数组去重，返回一个新数组
	uniq : function (array) {
		var result = [];
		for(var i = 0,length = array.length;i < length;i++){
			var value = array[i];
			if(result.indexOf(value) === -1) {
				result.push(value);
			}
		}
		return result;
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
	// 深复制一个数组，返回一个新数组
	cloneArray : function (array) {
		return array.slice();
	},
	// 去除空格
	trim : function(str) {
		return str.replace(/(^\s*)|(\s*$)/g,'');
	},
	// 返回数组除了第一个元素外的其他元素，如果传递第二个参数index，那么就返回从index开始剩余的所有元素
	// （比如表格的表头不是数据，可以用这个干掉）
	rest : function (array,n) {
		return slice.call(array,n == null ? 1 : n);
	},
	// 返回数组中除了最后一个元素之外的全部元素，传递n参数将从结果中排除从最后一个开始的n个元素
	initial : function (array,n) {
		return slice.call(array,0,array.length - (n == null ? 1 : n));
	},
	// 返回object对象所有的属性值的数组
	values : function (obj) {
		var keys = Object.keys(obj);
		var length = keys.length;
		var val = Array(length);
		for(var i = 0;i < length;i++){
			val[i] = obj[keys[i]];
		}
		return val;
	},
	// 把一个对象转换为一个[key,value]形式的数组
	pairs : function (obj) {
		var keys = Object.keys(obj);
		var length = keys.length;
		var pai = Array(length);
		for(var i = 0;i < length;i++){
			pai[i] = [keys[i],obj[keys[i]]];
		}
		return pai;
	},
	// 如果对象object中的属性property是函数，则调用他，否则，返回他
	result : function (object,property) {
		var value = object[property];
		return isFunction(value) ? value.call(object) : value;
	}

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