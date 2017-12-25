/*
名称：ecma.js
版本：2.0
时间：2017.10

更新：
1. 1.0的时候只是把一些觉得实用的常用的功能罗列的写出来，没有提升到抽象层面♥♥♥♥
2. 修改对象都要返回新的对象，不要在原有的对象上改♥♥♥♥
3. 处理数组和对象一种是策略，都当对象处理，最后分离，因为他变成了统一质料♥♥♥♥
4. 功能还是保持单一性，就像那个复制，我有加了复制之后的过滤，这是2个不同的功能，不需要耦合在一起♥♥♥♥
5. 函数参数容错处理♥♥♥♥

抽象是哲学的根本特点，代码亦如此。
（理念和实体）（共相和殊相）（抽象和具象）都是相对的，有辩证性

1. 抽象是什么？
	抽象是具象的反义词
2. 为什么要抽象？
	因为让别人看的一脸懵笔的感觉很爽。
	因为抽象是我们创建实体的起点，必经之路，我们不能直接从tab切换的业务代码变成另一个拖拽排序的东西，我们只有从中抽象出数据类型，语法，等等，重新构建另一个，这就是从实体到抽象，然后再从抽象到实体的这么一个过程，所以是必经之路，而复用只是抽象附带的这么一个特性而已。
3. 怎么抽象？
	单个抽象：抽象行为，抽象属性，抽象种属概念（比较难）
	多个抽象：抽象相同的部分和不同的部分，抽象不变的和变化的（比上面容易，因为有比较了）
4. 抽象出什么来？
	抽象出形式，抽象出质料，任何事物都是形式和质料的统一
5. 抽象的程度
	抽象的程度越深，那抽象出来的离抽象本身最近，越一般，与其他抽象越紧密，如果2个抽象依旧没有关系，就说明抽象的程度没有达到联系的那一层，需继续抽象
*/

// 我现在用高阶函数只是存一些数据,状态,配置一些属性,还没有提升到进去一个函数出来另一个函数的能力

/*
	代码是种知识，那我们要如何获取知识，知识必须有立足点，必须具有普遍性，必然性，一般性，我们才能把握，那种处在神灭变化当中的我们无法把握，不能获取，所以我们只能把握那个具有，普遍性，必然性，一般性，的知识，
*/

/*
----关于页面----

♥♥♥♥状态♥♥♥♥
	初始状态
	修改状态
	删除状态
	添加状态
	重置状态
	当前状态

（在抽象弹窗抽象出通知的时候，我一度很困惑，这个概念总感觉是相当的具象，因为他限于人，并非动植物，或是无生命体，有局限性，所以具象，所以还不够通用，不够一般，那就再往上抽，把他的属差去掉，他的属差是什么，是人，是有理性，是主观主动性，然后想了想，“发出信息”就出来了，这就不限客观载体了，生命体能发出信息，非生命体也能发出信息，这样就是更加一般形式了）

♥♥♥♥数据♥♥♥♥
大量的数据需要组织分类，vue的data里不能无限加各种单个杂乱的数据，不利于管理
数据的独立性，单独的意义，这里是纯质料，数据，那在这个质料上我给他赋予了形式，什么形式（用户的形式，来源的形式，去向的形式）
1. 展示给用户的数据
2. 用户输入的数据
3. 提交给后端的数据
4. 从后端拿到的数据

♥♥♥♥可读函数♥♥♥♥
还有就是有些判断和对象的赋值操作乍看之下看不出逻辑是什么意思，要联系上下文才看的我懂，所以最好分装成有名字解释的函数运行，读起来会好很多

♥♥♥♥ajax统一处理下♥♥♥♥

♥♥♥♥处理业务逻辑和处理数据分开♥♥♥♥
主体业务逻辑不包含处理数据的部分，我的意思是那些是给人看的代码，和给计算机的代码分开，这里可以用装饰者，改初始挂的都先挂好，这样我就能专注业务逻辑了，不会一会写着业务逻辑，一遍处理数据

状态的立体感，一个属性，一个变量太单薄，而且杂乱零散，用状态模式把页面的状态聚集一下
9. 好多策略（比如先显示什么的时候好多if-else）
11. 状态要添加下当前状态设置，因为不是每个状态都从初始开始
12. 时间的控制比较蛋疼，比如我要获取3个月前的时间戳，1几小时前（反正就是要获得某一点的时间戳）
----关于页面----
*/

// 运动，静止
// 除了纯质料和纯形式，一些事物都是质料和形式的辩证
// 我是这样理解偏函数的，当我抽象出某个事物的种的时候我回去用偏函数，当我要记录某些状态变化的时候我会去用偏函数，也就是要分1步以上的我回去用偏函数，如果不是种，而只是某个函数的中一小部分功能的时候，即使这个功能很复用，我也会去写个小函数，在某个函数里面调用，而不会把他作为种在直接在外面调用

/* 
★★★★★★★★★★★★★★★★★★★★
1. 我先不要太烦恼和纠结于寻找那个最大种同时让这个最大的种与我现在写的东西的种之间建立关系等级，因为这是终极目标，不可能一下子找到和建立联系的，那么我现在要掉转枪头，把切入点放在我已有的方法上，从我具体的方法出发，往上找他的形式，往下找他的质料，达到统一，辩证。也就是要训练思维，不能不找边际的乱想
2. 质料和形式的统一
3. 知识的立足点，是那个一般的东西
★★★★★★★★★★★★★★★★★★★★
*/



/****************
	私有
****************/
/*
	处理对象
	数组对象终归一家
*/
var processObject = function (fn) {
	fn = fn || function (oldObj, newObj) {
		return newObj;
	};
	return function (oldObj, iterator, data) {
		if (!_.isObject(oldObj) && !Array.isArray(oldObj) || !_.isFunction(iterator)) return [];
		var newObj = data || {};
		// 不但要处理新的对象还是处理在什么对象上迭代
		newObj = fn(oldObj, newObj);
		Object.keys(oldObj).forEach(function (item, index, arr) {
			iterator(oldObj[item], item, newObj);
		});
		return newObj;
	};
};
/*
	克隆体
*/
var processCloneObject = processObject(function (oldObj, newObj) {
	for (var key in oldObj) newObj[key] = oldObj[key];
	return newObj;
});
/*
	新生体
*/
var processNewObject = processObject();
/*
	对象统一转换
*/
var objectTransformation =  function (obj, newObj) {
	if (!_.isObject(obj) && !Array.isArray(obj) || !_.isObject(newObj) && !Array.isArray(newObj)) return [];
	return Array.isArray(obj) ? objectToArr(newObj) : arrToObject(newObj);
}
/*
	对象变数组
*/
var objectToArr = function (obj) {
	if (Array.isArray(obj)) return obj;
	var result = [];
	for (var key in obj) result.push(obj[key]);
	return result;
};
/*
	数组变对象
*/
var arrToObject = function (arr) {
	if (_.isObject(arr)) return arr;
	var result = {};
	arr.forEach(function (item, index, arr) {
		result[index] = item;
	});
	return result;
};
/*
	随机
*/
var random = function () {
	return Math.floor(Math.random() * 10);
};
/*
	集合
*/
var aggregate = function (index, bl) {
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



var _ = {};
_.val = function (val) {
    return val;
};
_.fnVal = function (val) {
	return function () {
		return val;
	};
};



/*
★★★★动词★★★★
*/

/****************
	复制
****************/

/*
	复制对象（对象也是最大的种了，没有再高的了）
*/
_.clone = function (oldObj) {
	// 这里可以判断我进来的是什么数据类型出去的是什么数据类型了
	return objectTransformation(oldObj, processNewObject(oldObj, function (val, key, newObj) {
		newObj[key] = val;
	}));
};

/****************
	随机
******************/

/*
	随机数字
*/
_.randomNumber = function (digit, digit2) {
	switch (arguments.length) {
		case 0 : return random();
		case 1 : 
			if (!_.isNumber(digit)) return random();
			return Math.floor((Math.random() + '').replace(/\.0+/, '.') * Math.pow(10, digit));
		case 2 : 
			if (!_.isNumber(digit) || !_.isNumber(digit2)) return random();
			return parseInt(digit + Math.random() * (digit2 - digit));
	}
};

/*
	随机字母
*/
_.randomAlphabet = function (digit) {
	digit = _.isNumber(digit) ? digit : 1;
	var arr = [];
	for (var i = 0; i < digit; i++) arr.push(_.randomNumber(0, 25));
	//大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()
	var upperCase = String.fromCharCode.apply(null, arr.map(function (item, index, arr) {
		return item + 65;
	}));
	var n = _.randomNumber(0, upperCase.length);
	while (n--) {
		var alphabet = upperCase[_.randomNumber(1, upperCase.length)];
		upperCase = upperCase.replace(alphabet, alphabet.toLocaleLowerCase());
	}
	return upperCase;
};
/*
	随机数字字母
*/
_.randomNumberAlphabet = function (digit) {
	digit = _.isNumber(digit) ? digit : 10;
	var randomNumber = _.randomNumber(0, digit);
	var randomString = _.randomNumber(randomNumber) + _.randomAlphabet(digit - randomNumber);
	return _.shuffle(randomString.split('')).join('');
};
/*
	随机颜色
*/
_.randomColor = function (saturation, light) {
	saturation = _.isString(saturation) ? saturation : '50%';
	light = _.isString(light) ? light : '50%';
	if (arguments.length == 1) light = saturation;
	/*var r = (0, 60)
	var r = (300, 360)
	var g = (60, 180)
	var b = (180, 300);*/
	return 'hsl(' + _.randomNumber(0, 360) + ', ' + saturation + ', ' + light + ')';
},


/****************
	谓词
******************/
/*
	判断值是不是NaN
*/
_.isNaN = function (n) {
	return n !== n;
};
/*
	判断一个值是不是数字类型
*/
_.isNumber = function (n) {
	return typeof n === 'number' && !_.isNaN(n);
};
/*
	判断一个值是不是整数
*/
_.isInteger = function (n) {
	return _.isNumber(n) && n % 1 === 0;
};
/*
	判断数据类型
*/
['Arguments', 'Function', 'String', 'Date', 'RegExp', 'Error', 'Array', 'Object', 'Boolean'].forEach(function(element, index, array) {
	_['is' + element] = function(obj) {
		return Object.prototype.toString.call(obj) === '[object ' + element + ']';
	};
});
/*
	是否过去
*/
_.isPast = function (time) {
	if (!_.isNumber(time)) return false;
	return (new Date(time)).getTime() < (new Date()).getTime();
};
/*
	是否未来
*/
_.isFuture = function (time) {
	return !_.isPast(time);
};
/*
	判断2个对象是否相等
*/
_.isEqual = function(a, b, aStack, bStack) {
	if (!aStack || !bStack) if (!_.isObject(a) && !Array.isArray(a) || !_.isObject(b) && !Array.isArray(b)) return false;
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
		if (!_.isEqual(a[key], b[key], aStack, bStack)) return false;
	}
	// 这个维度验证通过，栈弹出

	// 直接递归就可以了，为什么还要用到栈呢？？？？？
	// 因为防止对象自引用，导致的无限递归

	aStack.pop();
	bStack.pop();
	// 到这里就说明这一维度的数组的值相等
	return true;
};
/*
	判断一堆数据中是否存在一个，一种，多个，多种数据
	存在是一，存在是多(数量关系)
*/
_.isExistence =	 function (data, value) {
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
	val = val.length == 0 ? true : val.every(function (item, index, arr) {
		for (let key in data) if (data[key] === item) return true;
		return false;
	});
	predicate = predicate.length == 0 ? true : predicate.every(function (item, index, arr) {
		for (let key in data) if (item(data[key])) return true;
		return false;
	});
	return val && predicate;
};
/*
	反转谓词结果，跟其他具体的谓词函数合为一个整体
*/
_.reversePredicate = function (predicate) {
	return function () {
		return !predicate.apply(null, arguments);
	};
};

/****************
	行为模式
	重形式轻内容
****************/
/*
	迭代
*/
_.forEach = function (obj, iterator) {
	Object.keys(obj).forEach(function (item, index, arr) {
		iterator(obj[item], item, obj);
	});
};
/*
	过滤
*/
_.filter = function (oldObj, predicate) {
	return objectTransformation(oldObj, processNewObject(oldObj, function (val, key, newObj) {
		if (predicate(val, key, newObj)) newObj[key] = val;
	}));
};
/*
	重复行为
	重复做直到达到目标，不达目的誓不罢休
	但这里只是重复特定的值，万一我是要做其他更具体的事情呢？？？？
*/
_.repeat = function (iterator, predicate, arr) {
	arr = arr ? [] : arr;
	// 创建一个新值
	var res = iterator();
	// 判断这个新值在某个条件中符合不符合
	// 如果符合就添加到数据中
	// 如果不符合接着递归直到符合
	if (predicate(arr, res)) {
		// 达到目的停止
		arr.push(res);
		return res;
	// 没达到目的继续
	} else _.repeat(iterator, predicate, arr);
};
/*
	根据不同的数据类型做不同的事情
	以后这种东西都要变成策略
*/
_.whichData = function (data, arr, obj) {
	if (_.isObject(data)) return obj(data);
	if (Array.isArray(data)) return arr(data);
};
/*
	消抖行为
*/
_.debounce = function(fn, interval) {
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
	单次行为
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
	达到次数后才激活
*/
_.after = function (times, fn) {
	return function () {
		if (--times < 1) return fn.apply(null, arguments);
	};
};
/*
	规定方法调用次数
*/
_.before = function (times, fn) {
	return function () {
		if (--times > 0) return fn.apply(null, arguments);
	};
};
/*
	装饰行为
*/
_.decorate = function () {
	var order;
	var idx;
	if (_.isBoolean(arguments[arguments.length - 1])) {
	    order = arguments[arguments.length - 1];
	    idx = arguments.length - 1;
	} else {
	    order = true;
	    idx = arguments.length;
	}
	var arrFn = order ? 'push' : 'unshift'
	var args = [].slice.call(arguments, 0, idx);
	var add = function (fn) {
	    args[arrFn](fn);
	    console.log(args);
	};
	var go = function(obj, context) {
	    [].forEach.call(args, function(item, index, arr) {
	        item.apply(context || null, obj ? obj[item.name] : []);
	    })
	};
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
	var oneByOne = function (backflow, context) {
		context = _.isBoolean(backflow) ? context : backflow;
		one.el.call(context);
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
	var editState = function (newState, oldState) {
		link.replace(newState, oldState);
		if (one.el === oldState) one = link.find(newState);
	};
	// 删除状态
	var delState = function (obj) {
		// 这里有个问题就是，有时删除的实体已经变成下一个要运行的实体了，例如我运行1，运行完1后，运行实体变成2，虽然紧接着我删除了2，可下次运行的是时候是运行2的实体，因为之前运行完1后，就更新了运行实体，替换也有这个问题
		if (one.el === obj) directionFn();
		link.del(obj);
	};
	return {
		currState : oneByOne,
		addState : addState,
		editState : editState,
		delState : delState
	};
};
/*
	第三者
	发现很多模式都是通过第三者甚至第n者来进行对象与对象之间的访问的，比如中介者，代理
	未完成。。。。。。
*/
_.third = function () {

};
/*
	策略
	访问对象的属性(数字-字符)
	未完成。。。。。。
*/
_.strategy = function (road) {

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
/*
	深浅
	对象都有深浅，对于深的操作，对于浅的操作，但归根结底还是策略，还是不同的道路，不同的意见，不是真理，知识需要立足点，我觉的我可以写个策略的形式，至于策略的实际内容，比如深浅，比如参数的不确定性都通过传参的方式，因为这些都是变化的，是意见，唯有真理不变，真理不需要写if，真理只有一条路，呵呵哒
	未完成。。。。。。
*/
_.depth = function () {
	// 这个对策略来时只是内容
	// ...
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
	这里有个问题就是，当里面嵌套的key和val一样的时候，就有些蛋疼了，他给了我里面的一个对象，我要的是外面一层的对象，还没有遍历到，所以要改进下，弄个广度优先遍历的
	这个要改，我想了下就是先去维度吧，把他变成一维的，然后再在里面找，要全部找一遍，因为有可能有一样的，把找到的全部返回给外面，有具体业务逻辑决定
	我加个是否需要深度查找不就好了么，
*/
_.getObj = function () {
	// 现在有2种情况
	var arr = [function oneVal (obj, one, depth, result) {
		// 至少深入一层寻找
		// 维度
		var dimension = 1;
		// 2.只知道key或只知道val
		for (var oldKey in obj) {
			if (typeof obj[oldKey] === 'object') {
				if (depth) {
					if (oldKey == one) return obj;
					result = oneVal(obj[oldKey], one, depth, result);
					if (result) return result;
				} else {
					if (dimension === 1) {
						// 浅寻找不能用递归了，还是手动for循环，因为我知道要循环2层
						if (one in obj[oldKey]) return obj[oldKey];
					}
				}
			} else if (one in obj) return obj; else if(one == obj[oldKey]) return obj;
		}
		// 增加维度
		dimension++;

	}, function twoVal (obj, newKey, val, depth, result) {
		// 至少深入一层寻找
		// 维度
		var dimension = dimension || 1;
		// 1.知道key和val
		for (var oldKey in obj) {
			if (typeof obj[oldKey] === 'object') {
				if (depth) {
					result = twoVal(obj[oldKey], newKey, val, depth, result);
					if (result) return result;
				} else {
					if (dimension === 1) {
						// 浅寻找不能用递归了，还是手动for循环，因为我知道要循环2层
						if (newKey in obj[oldKey] && val == obj[oldKey][newKey]) return obj[oldKey];
					}
				}
			} else if (obj[newKey] == val) return obj;
		}
		// 增加维度
		dimension++;
	}];
	return !_.isBoolean(arguments[arguments.length - 1]) ? arr[arguments.length % 2].apply(null, arguments) : arr[arguments.length % 3].apply(null, arguments);
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
/*
	过滤false的值，都返回真值
*/
_.compact = function (oldObj) {
	return objectTransformation(oldObj, processCloneObject(oldObj, function (val, key, newObj) {
		!val && delete newObj[key];
	}));
};



/****************
	映射
****************/
/*
	映射转换
	辩证法-你是我，我是你
	键值互换
*/
_.invert = function (oldObj, arr) {
	// arr是指那些不需要互换的，并不是所有情况都要互换
	function surplus (it) {
		return !arr.every(function (item, index, arr) {
			return item === it ? false : true;
		});
	}
	surplus = arr ? surplus : function () {};
	return processNewObject(oldObj, function (val, key, newObj) {
		surplus(key) ? newObj[key] = val : newObj[val] = key;
	});
};
/*
	对象通过一张映射表来映射
	值与值之间的映射
	这里也要处理下是深映射还是浅映射--那我把深浅的概念提出来吧
*/
_.paraVal = function (oldObj, form) {
	// 通过表的key找到obj的key后的值对应表的key的值
	return processCloneObject(oldObj, function (val, key, newObj) {
		if (_.isObject(newObj[key]) && newObj[key] !== null) _.paraVal(newObj[key], form); else {
			if (key in form) {
				newObj[key] = form[key][val];
			}
		}
	});
};
/*
	映射key
*/
_.paraKey = function (obj, form) {
	return processNewObject(obj, function (val, key, newObj) {
		// 占时不深映射，深浅之后统一处理
		for (let x in form) {
			if (key === form[x]) newObj[x] = val;
		}
	});
}



/****************
	形式转换
****************/
/*
	把一个对象转换为一个[key,value]形式的数组
*/
_.pairs = function (oldObj) {
	return objectToArr(processNewObject(oldObj, function (val, key, newArr) {
		newArr.push([key, val]);
	}, []));
};



/****************
	数据去重
****************/
_.uniq = function (array) {
	var result = [];
	var repeat = [];
	for(var i = 0; i < array.length; i++){
		var value = array[i];
		if(!_.isExistence(result, value)) result.push(value); else {
			i--;
			_.without(array, value);
			if (!_.isExistence(repeat, value)) repeat.push(value);
		}
	}
	return repeat;
};

/****************
	数据包裹
****************/
_.wrap = function (oldObj, addObj) {
	return processCloneObject(oldObj, function (val, key, newObj) {
		newObj[key] = _.extend({
			value : val,
		}, addObj[key]);
	});
}

/****************
	解除包裹
****************/
_.wrapBack = function (oldObj) {
	return processCloneObject(oldObj, function (val, key, newObj) {
		newObj[key] = val.value;
	});
};

/****************
	打乱顺序
****************/
_.shuffle = function(obj) {
    var length = obj.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = _.randomNumber(0, index);
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
_.without = function(oldObj, del) {
	return objectTransformation(oldObj, processCloneObject(oldObj, function (val, key, newObj) {
		val === del && delete newObj[key];
	}));
};
/*
	删除空格
*/
_.trimObj = function(oldObj) {
	var newObj = _.clone(oldObj);
	for (var key in newObj) {
		if (newObj[key] == null || newObj[key] == undefined) {
			newObj[key] = '';
		} else if (typeof newObj[key] == 'object') {
			_.trimObj(newObj[key]);
		} else {
			newObj[key] = newObj[key].toString().replace(/(^\s*)|(\s*$)/g,'');
		}
	}
	return newObj;
};


/****************
	集合--并集，交集，补集
****************/
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
	扁平化
****************/
_.flatten = function(input, oldArr) {
	return processNewObject(input, function (val, key, newArr) {
		Array.isArray(val) ? newArr = newArr.concat(_.flatten(val, newArr)) : newArr.push(val);
	}, oldArr || []);
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
	返回某一时间段日期信息
*/
_.date = function(time) {
    var n = n ? new Date(time) : new Date();
    return [n.getFullYear(), fillZero(n.getMonth() + 1), fillZero(n.getDate()), fillZero(n.getHours()), fillZero(n.getMinutes()), fillZero(n.getSeconds())];
};
/*
	变成这种格式2017-08-20 11:09:25
*/
_.getTime = function (stamp) {
	var time = this.date(stamp);
	return time[0] + '-' + time[1] + '-' + time[2] + ' ' + time[3] + ':' + time[4] + ':' +  time[5];
};
/*
	倒计时
*/
_.countDown = function(c, fn) {
	// 有这么计划总情况需要处理
	// 1.传的是日期 2107-12-24 14:11:00
	// 2.传的是时间戳 1510012800000
	if (/-/g.test(c)) c = (new Date(c)).getTime();
	upDate(c, fn);
	var timer = setInterval(function() {
		if (!upDate(c, fn)) clearInterval(timer);
	},1000);
	function upDate(c, fn){
		var d = new Date();
		//获取当前时间戳
		var nowTime = d.getTime();
		var overTime = c;
		//结束事件戳-当前时间戳 
		var mist = parseInt((overTime - nowTime) / 1000);
		var date = parseInt(mist / 86400);
		//去天后的秒数
		mist = mist % 86400	
		var hours = parseInt(mist / 3600);
		//去小时后的秒数
		mist = mist % 3600;
		var minutes = parseInt(mist / 60);
		mist = mist % 60;
		fn && fn(date, hours, minutes, mist);
		return date + hours + minutes + mist;
	}
};



/****************
	数字
	我从倒计时，日期，数字的分隔中抽象出数字，也就是抽象出了质料，我又从倒计时，数字的分隔中中抽象出了时间，金钱，也就抽象出了形式，这是实体抽象的2的方向，那实体之外的抽象，我该怎么分类呢？
****************/
_.fillZero = function (nub) {
	return nub < 10 ? '0' + nub : nub;
};



/****************
	金钱
****************/
// 数字3位加逗号，金钱显示
_.money = function(num) {
	num += '';
	return num.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^\,/,'');
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


// export default _;