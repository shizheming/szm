/*
名称：ecma.js
版本：2.0
时间：2017.10

@@@@从具象到抽象，脱离形，提炼一般化@@@@
我认为的一般化包含通用性和普遍性

1. 抽象是什么？
	抽象是具象的反义词
2. 为什么要抽象？
	因为让别人看的一脸懵笔的感觉很爽。
	因为抽象是我们创建实体的起点，必经之路，我们不能直接从tab切换的业务代码变成另一个拖拽排序的东西，我们只有从中抽象出数据类型，语法，等等，重新构建另一个，这就是从实体到抽象，抽象再到实体的这么一个过程，所以是必经之路，而复用只是抽象附带的这么一个特性而已。
3. 怎么抽象？
	抽象行为，抽象动词，抽象特性，抽象属性，抽象种属概念
	2个及及以上可以找共同的部分，那单个实际怎么抽象？
4. 抽象出什么来？
	鬼知道
5. 抽象的程度
	抽象的程度越深，那抽象出来的离抽象本身最近，越一般，与其他抽象越紧密，如果2个抽象依旧没有关系，就说明抽象的程度没有达到联系的那一层，需继续抽象


js是动态的语言，动态的特性是变化，有哪些变化呢，空间的变化，添加，删除，状态（修改），时间的变化，然后就是功能都分创建时候的静态实体，和用的时候的动态实体，也就是实体会有方法给到外部使用



*/

// 我现在用高阶函数只是存一些数据,状态,配置一些属性,还没有提升到进去一个函数出来另一个函数的能力



// module.exports _
var _ = {};
_.val = function (val) {
    return val;
};
_.fnVal = function (val) {
	return function () {
		return val;
	};
};



/****************
	随机
	随机是Math.random()
	用一说明多，一是基础，用一构建多
******************/
/*
	随机位数
	单一的
*/
_.digit = function () {
	return Math.ceil(Math.random() * 10);
};
/*
	随机数字(这里的数字都是正整数)
	数字属性--位数
	一个一位数字，一个多位数字(数量关系)
*/
_.randomNumber = function (digit, digit2) {
	var that = this;
	// 单位一个数字
	var n = function () {
		return that.digit();
	};
	// 多位一个数字
	var nn = function () {
		return Math.ceil(Math.random() * Math.pow(10, digit));
	};
	// digit到digit2之间的一个数字
	var nnn = function () {
		return parseInt(digit + Math.random() * (digit2 - digit));
	};
	return arguments.length  === 2 ? nnn() : digit ? nn() : n();
};
/*
	随机字母
	字母属性--大写，小写(忽略大小写)
*/
_.randomAlphabet = function (digit) {
	var arr = [];
	for (var i = 0; i < (digit ? digit : 1); i++) {
		//生成一个0到25的数字
		arr.push(Math.ceil(Math.random() * 25));
	}
	//大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()
	return String.fromCharCode.apply(null, arr.map(function (currentValue, index, array) {
		return currentValue + 65;
	}));
};
/*
	随机数字字母-随机字母数字
	数字字母字母数字属性--位置(忽略大小写)，开端，结束
*/
_.randomNumberAlphabet = function (digit) {
	// 默认9位
	digit = digit ? digit : 9;
	var s = Math.random().toString(16);
	// 满足位数的同时满足有数字有字母
	var d = /(?:\.[a-zA-Z]+\d+)|(?:\.\d+[a-zA-Z]+)/.test(s);
	return s.length > digit && d ? s.substr(2, digit) : arguments.callee(digit);
};
/*
	随机颜色
*/
_.randomColor = function(){
	return '#' + Math.floor(Math.random() * parseInt('0xffffff',16).toString(10)).toString(16);
},


/****************
	谓词函数
	谓词是有没有，是不是......
******************/
/*
	反转谓词结果，跟其他具体的谓词函数合为一个整体
*/
_.reversePredicate = function (predicate) {
	return function () {
		return !predicate.apply(null, arguments);
	};
};
/*
	判断一堆数据中是否存在一个，一种，多个，多种数据
	存在是一，存在是多(数量关系)
*/
_.isExistence = function (data, value) {
	// 现在只是单个存在，要添加多个存在，不但存在一，还要存在多
	// 存在多
	// 这里直接从多入手到一
	var args = [].slice.call(arguments, 1);
	// 纯值
	var val = [];
	// 谓词判断
	var predicate = [];
	args.forEach(function (item, index, arr) {
		typeof item == 'function' ? predicate.push(item) : val.push(item);
	});
	// data是数组
	var arrData = function () {
		val = val.length == 0 ? true : val.every(function (item, index, arr) {
			return data.indexOf(item) > -1;
		});
		predicate = predicate.length == 0 ? true : predicate.every(function (item, index, arr) {
			return data.some(function (val, index, arr) {
				return item(val);
			});
		});
	};
	// data是对象
	var objData = function () {
		val = val.length == 0 ? true : val.every(function (item, index, arr) {
			for (let key in data) if (data[key] === item) return true;
			return false;
		});
		predicate = predicate.length == 0 ? true : predicate.every(function (item, index, arr) {
			for (let key in data) if (item(data[key])) return true;
			return false;
		});
	};
	this.whichData(data, arrData, objData);
	return val && predicate;
};
/*
	判断一个值是不是整数
*/
_.isInteger = function (num) {
	return typeof num == 'number' && num % 1 === 0;
};
/*
	判断值是不是NaN
*/
_.isNaN = function (n) {
	return n !== n;
};
/*
	区别undefined，null以外的值
*/
_.isExisty = function (x) {
	return x != null;
};
// 判断2个集合是否相等
_.isEqual = function(a, b, aStack, bStack) {
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
	// 因为防止对象自引用，导致的无限递归

	aStack.pop();
	bStack.pop();
	// 到这里就说明这一维度的数组的值相等
	return true;
};


/****************
	更加抽象的行为
	重形式轻内容
****************/
/*
	重复做直到达到目标，不达目的誓不罢休
*/
_.repeat = function (createVal, predicate, arr) {
	arr = arr ? [] : arr;
	// 创建一个新值
	var res = createVal();
	// 判断这个新值在某个条件中符合不符合
	// 如果符合就添加到数据中
	// 如果不符合接着递归直到符合
	if (predicate(arr, res)) {
		// 达到目的停止
		arr.push(res);
		return res;
	// 没达到目的继续
	} else arguments.callee(createVal, predicate, arr);
};
/*
	根据不同的数据类型做不同的事情
*/
_.whichData = function (data, arr, obj) {
	if (_.isObject(data)) return obj(data);
	if (Array.isArray(data)) return arr(data);
};
/*
	节流
*/
_.throttle = function(fn, interval) {
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
};
/*
	单列
*/
_.once = function (fn) {
	var bl = true;
	return function() {
		var result;
		if (bl) result = fn.apply(null, arguments);
		bl = false;
		return result;
	};
};
/*
	装饰
*/
_.decorate = function () {
	var args = [].slice.call(arguments);
	var add = function (fn) {
		args.push(fn);
	};
	var go = function () {
		// 每个方法都是独立的，之间没有关系，只是顺序，不像面向对象真的是包在里面的
		[].forEach.call(args, function (item, index, arr) {
			item.apply(null, arguments);
		});
	};
	go.add = add;
	return go;
};
/*
	状态--形态
*/
_.state = function () {
	// 1. 静态
	// 首先要定义多个状态和状态的顺序
	// 提供一个实体,状态全实体的属性
	// 有一个设置状态变化的方法
	// 如果不是object先变成object
	var data = [].map.call(arguments, function (item, index, arr) {
		return _.isFunction(item) ? item : _.fnVal(item);
	});
	// 我感觉这个东西像链表一样的，以后写个链表通用下,现在先将就下
	data.forEach(function (item, index, arr) {
		item.next = arr[index + 1] ? arr[index + 1] : arr[0];
	});
	var one = data[0];
	var oneByOne = function () {
		one();
		one = one.next;
	};
	// 2. 动态
	// 然后添加一些方法能动态的添加或是删除或是修改状态的方法
	return {
		currState : oneByOne,
		// setState : ,
		// delState : 
	};
};



/****************
	寻找(过滤)
****************/
/*
	通过value找key
*/
_.findKey = function (obj, value) {
	for (var key in obj) if (obj[key] == value) return key;
};
/*
	通过ke或是val寻找当前所在对象
*/
_.getObj = function () {
	// 现在有2种情况
	var arr = [function (obj, one, result) {
		// 2.只知道key或只知道val
		for (var oldKey in obj) {
			if (typeof obj[oldKey] === 'object') {
				if (oldKey == one) return obj;
				result = arguments.callee(obj[oldKey], one, result);
				if (result) return result;
			} else if (one in obj) return obj; else if(one == obj[oldKey]) return obj;
		}
	}, function (obj, newKey, val, result) {
		// 1.知道key和val
		for (var oldKey in obj) {
			if (typeof obj[oldKey] === 'object') {
				result = arguments.callee(obj[oldKey], newKey, val, result);
				if (result) return result;
			} else if (obj[newKey] == val) return obj;
		}
	}];
	return arr[arguments.length % 2].apply(null, arguments);
};
/*
	寻找所有的对象的值
*/
_.values = function (obj) {
	var keys = Object.keys(obj);
	var length = keys.length;
	var val = [];
	for (var i = 0; i < length; i++) val[i] = obj[keys[i]];
	return val;
};



/****************
	形式转换
****************/
/*
	把一个对象转换为一个[key,value]形式的数组
*/
_.pairs = function (obj) {
	var keys = Object.keys(obj);
	var length = keys.length;
	var pai = [];
	for (var i = 0; i < length; i++) pai[i] = [keys[i], obj[keys[i]]];
	return pai;
};



/****************
	运算
	浮点数运算
****************/
/*
	加法
*/
_.accAdd = function (arg1, arg2) {
	var that = this;
    var r1;
    var r2;
    var m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch(e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch(e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (that.accMul(arg1, m) + that.accMul(arg2, m)) / m;
};
/*
	减法
*/
_.accSub = function (arg1, arg2) {      
    return this.accAdd(arg1, -arg2);  
};
/*
	乘法
*/
_.accMul = function (arg1, arg2) {
    var m = 0;
	var s1 = arg1.toString();
	var s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch(e) {}
    try {
        m += s2.split(".")[1].length;
    } catch(e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};
/*
	除法
*/
_.accDiv = function (arg1, arg2) {
    var t1 = 0;
	var t2 = 0;
	var r1;
	var r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
};



/****************
	数据去重
****************/
_.uniq = function (array) {
	var result = [];
	var repeat = [];
	for(var i = 0; i < array.length; i++){
		var value = array[i];
		if(!this.isExistence(result, value)) result.push(value); else {
			i--;
			this.without(array, value);
			if (!this.isExistence(repeat, value)) repeat.push(value);
		}
	}
	return repeat;
};



/****************
	打乱顺序
****************/
_.shuffle = function(obj) {
    var length = obj.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = n(0, index);
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = obj[index];
    }
    return shuffled;
};



/****************
	删除
****************/
/*
	删除元素
*/
_.without = function(obj, del) {
	var arrData = function () {
		var idx;
		obj.every(function(item, index, arr) {
			if (item === del) {
				idx = index;
				obj.splice(index, 1);
				return false;
			}
			return true;
		});
		return idx;
	};
	var objData = function () {
		delete obj[this.findKey(this.getObj(obj, del), del)];
		return obj;
	}.bind(this);
	return this.whichData(obj, arrData, objData);
};
/*
	删除空格
*/
_.trim = function(str) {
	return str.replace(/(^\s*)|(\s*$)/g,'');
};


/****************
	集合--并集，交集，补集
****************/
/*
	集合的种属概念
*/
var aggregate = function(index, bl) {
	return function (obj) {
		var that = this;
		var thatArg = arguments;
		return _.whichData(obj, function () {
			// 并集
			var union = [].concat.apply(obj, [].slice.call(thatArg, 1));
			// 并集 交集
			var result = [union, this.uniq(union)];
			// 并集删除交集就是补集
			result[2] = (function () {
				var complement = union.slice(0);
				result[1].forEach(function (item, index, arr) {
					that.without(complement, item);
				});
				return complement;
			})();
			return result[index];
		}.bind(this), function () {
			// 哪个为主体的开关
			// 并集
			var result = [function () {
				// 手动clone，自调用会栈溢出，呵呵
				var newObj = {};
				for (let key in obj) newObj[key] = obj[key];
				// var newObj = that.clone(obj);
				// console.log(newObj)
				for (let i = 1, len = thatArg.length; i < len; i++) {
					for (let key in thatArg[i]) {
						if (that.isBoolean(bl) && bl) {
							if (!newObj.hasOwnProperty(key)) newObj[key] = thatArg[i][key];
						} else newObj[key] = thatArg[i][key];
					}
				}
				return newObj;
			// 交集
			}, function () {
				var newObj = {};
				for (let i = 1, len = thatArg.length; i < len; i++) {
					for (let key in thatArg[i]) {
						if (that.isExistence(obj, thatArg[i][key])) {
							newObj[key] = thatArg[i][key];
						}
					}
				}
				return newObj;
			}];
			// 补集
			result[2] = function () {
				// 并集
				var union = result[0]();
				// 交集
				var intersection = result[1]();
				// 并集删除交集就是补集
				for (let key in intersection) {
					that.without(union, intersection[key]);
				}
				return union;
			};
			return result[index]();
		});
	};
};
/*
	并集
*/
_.union = aggregate(0);
/*
	交集
*/
_.intersection = aggregate(1);
/*
	补集
*/
_.complement = aggregate(2);
/*
	继承
*/
_.extend = aggregate(0, true);



/****************
	复制
****************/
_.clone = function(obj) {
	return _.whichData(obj, function () {
		return obj.slice();
	}, function () {
		return this.extend({}, obj);
	}.bind(this));
};



/****************
	扁平化
****************/
_.flatten = function(input) {
	var result = [];
	for (var i = 0, length = input.length; i < length; i++) {
		var value = input[i];
		if (Array.isArray(value)) {
			value = arguments.callee(value);
			for (var j = 0, len = value.length; j < len; j++) result.push(value[j]);
		} else result.push(value);
	}
	return result;
};



/****************
	时间
****************/
/*
	获取某个月份的天数
*/
_.getDays = function(year, month) {
    return new Date(year, month, 0).getDate();
};



/*
	判断数据类型
*/
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Array', 'Object', 'Boolean'].forEach(function(element, index, array) {
	_['is' + element] = function(obj) {
		return Object.prototype.toString.call(obj) === '[object ' + element + ']';
	};
});























/*
// html渲染模板

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
*/
