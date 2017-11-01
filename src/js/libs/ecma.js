/*
名称：ecma.js
版本：2.0
时间：2017.10

1.0的时候只是把一些觉得实用的常用的功能罗列的写出来，没有提升到抽象层面

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
	形式是可以确定的，一种是不产出函数，另一种是产出函数，（当然不管哪种都包含了普通函数和高阶函数）
	不产出函数也就是只运行动作
	产出函数有返回值，那是返回一个呢，还是返回多个

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
	行为模式
	重形式轻内容
****************/
/*
	重复行为
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
	节流行为
	时间节流
	空间节流
*/
_.throttle = function(fn, interval) {
	// 时间记录
	var num = 0;
	// 空间记录
	var list = [];
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
	单列行为
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
	装饰行为
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
	// 增加添加方法
	go.add = add;
	return go;
};
/*
	状态行为--形态
	2种状态，循环，回流
*/
_.state = function () {
	// 1. 静态
	// 首先要定义多个状态和状态的顺序
	// 如果不是function先变成function
	var data = [].map.call(arguments, function (item, index, arr) {
		return _.isFunction(item) ? item : _.fnVal(item);
	});
	var link = _.createLink();
	data.forEach(function (item, index, arr) {
		link.add(item);
	});
	var one = link.find(data[0]);
	// 回流的方向
	var direction = true;
	// 把专门判断方向的变成整体了，还不能说是抽象，只是把零碎的步骤提升到整体，只是整体，一坨的，还没整理
	var directionFn = function () {
		direction ? one = one.next : one = one.previous;
		// 正序
		if (one === link.head.next) direction = true;
		// 倒序
		if (one === link.tail.previous) direction = false;
	};
	var oneByOne = function (backflow) {
		one.el();
		backflow ? void function () {
			directionFn();
		}() : void function () {
			one = one.next;
		}();
	};
	// 2. 动态
	// 然后添加一些方法能动态的添加或是删除或是修改状态
	// 添加状态
	var addState = function (newState, item) {
		link.add(newState, item);
	};
	// 替换状态
	var replaceState = function (newState, oldState) {
		link.replace(newState, oldState);
		if (one.el === oldState) one = link.find(newState);
	};
	// 删除状态
	var delState = function (obj) {
		// 这里有个问题就是，有时删除的实体已经变成下一个要运行的实体了，例如我运行1，运行完1后，运行实体变成2，虽然紧接着我删除了2，可下次运行的是时候是运行2的实体，因为之前运行完1后，就更新了运行实体
		if (one.el === obj) directionFn();
		link.del(obj);
	};
	return {
		currState : oneByOne,
		addState : addState,
		replaceState : replaceState,
		delState : delState
	};
};
/*
	检测行为
	检测实体参数符合不符合，他的健壮性
	未完成。。。。。。
*/
_.init = function () {
	var args = arguments;
};
/*
	js特性的终极目标--动态变化
	未完成。。。。。。
*/
_.change = function () {
	// ...
	return function () {
		// ...
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



/****************
	数据结构--js当中的纯质料
****************/
/*
	链表--循环双向链表
	这张图大致是这样的所有链表真正用的元素之外有一个head一个tail，head的previous是tail，tail的next是head，而head的next是第一实体，tail的previous是最后一个实体，所有实体之间也是双向的，循环的关键在于第一实体和最后一个实体是双向的，这样头尾实体就循环连起来了。
*/
var linkFn = (function () {
	var link = {};
	// 判断是否头尾相连，也就是链表里面有没有元素
	var isConnected = function (that) {
		return that.head.next === that.head.previous;
	};
	// 往后添加
	link.add = function (newElement, item) {
		// 缺点在于一次只能插一个值
		var newNode = {
			el : newElement,
			next : null,
			previous : null
		};
		// 直接插入尾部
		var addLast = function () {
			// 这里是链表里面没有元素的情况下
			if (isConnected(this)) {
				// 更新头尾
				this.head.next = newNode;
				this.tail.previous = newNode;
				// 更新
				return;
			}
			// 这里是链表里面有元素的情况下
			// 循环链接--过掉head和tail--直接链接第一实体，这里就是实体元素之间头尾相连了
			// 新元素下一个连第一个
			newNode.next = this.head.next;
			// 新元素上一个连最后一个
			newNode.previous = this.tail.previous;
			// 更新第一个的上一个的指向
			this.head.next.previous = newNode;
			// 更新最后一个的下一个的指向
			this.tail.previous.next = newNode;
			// 更新尾巴的上一个的指向
			this.tail.previous = newNode;
		}.bind(this);
		// 1个参数直接添加到尾部
		if (!item) {
			addLast();
		// 2个参数是找到第2个参数后面插入
		} else {
			// 某个位置特定插入
			var current = this.find(item);
			if (!current) return;
			// 判断是不是最后一个
			if (current === this.tail.previous) addLast(); else {
				newNode.next = current.next;
				newNode.previous = current;
				current.next.previous = newNode;
				current.next = newNode;
			}
		}
	};
	// 删除
	link.del = function (item) {
		var currNode = this.find(item);
		// 没找到
		if (!currNode) return;
		// 有2种可能需要判断，一种是删实体头，一种是删实体尾，就需要调整虚体头尾的next和previous的指向了
		if (this.head.next === currNode) this.head.next = currNode.next;
		if (this.tail.previous === currNode) this.tail.previous = currNode.previous;
		currNode.previous.next = currNode.next;
		currNode.next.previous = currNode.previous;
		// 返回被删除的对象
		return currNode;
	};
	// 替换
	link.replace = function (newElement, item) {
		// 删除和添加就是替换
		this.add(newElement, item);
		this.del(item);
	};
	// 寻找
	// 找到当前的
	link.find = function (item) {
		// 头尾不给找，排除在外，头尾相连也不给找，因为本身里面就没有东西，还没添加呢
		if (item === 'head' || item === 'tail' || isConnected(this)) return;
		// 这里用this，因为head是创建链表时候独立存在的，link是没有head的，find调的时候也要用this，应为如果用link，里面this又指向link了，而link是没有head的
		var currNode = this.head;
		// 要避免无限循环
		while (currNode.el != item && currNode !== this.tail.previous) {
			currNode = currNode.next;
		}
		return currNode.el !== item ? false : currNode;
	};
	// 展示
	link.display = function () {
		var currNode = this.head;
		var arr = [];
		var bl = true;
		while (bl || currNode.next !== this.head.next) {
			arr.push(currNode.next.el);
			currNode = currNode.next;
			bl = false;
		}
		return arr;
	};
	return link;
})();

_.createLink = function () {
	var newLink = {};
	// 头节点
	newLink.head = {
		el : 'head',
		next : null,
		previous : null
	};
	// 尾节点
	newLink.tail = {
		el : 'tail',
		next : newLink.head,
		previous : newLink.head
	};
	// 头尾相连
	newLink.head.next = newLink.tail;
	newLink.head.previous = newLink.tail;
	// 继承方法
	return _.extend(newLink, linkFn);
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
