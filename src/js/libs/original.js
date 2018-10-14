// Array

/**************************es5*********************************/

// 用来判断某个值是否为数组。如果是，则返回 true，否则返回 false。
Array.isArray(value);

function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}

// 测试数组的所有元素是否都通过了指定函数的测试。
Array.prototype.every(callback[, thisArg]);

function every(arr, fn, thisArg) {
	for (var i = 0; i < arr.length; i++) if (!fn.call(thisArg, arr[i], i, arr)) return false;
	return true;
}

// 使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。
Array.prototype.filter(callback[, thisArg]);

function filter(arr, fn, thisArg) {
	var result = [];
	for (var i = 0, len = arr.length; i < len; i++) if (fn.call(thisArg, arr[i], i, arr)) result[i] = arr[i];
	return result;
}

// 让数组的每一项都执行一次给定的函数
Array.prototype.forEach(callback[, thisArg]);

function forEach(arr, fn, thisArg) {
	for (var i = 0 ,len = arr.length; i < len; i++) fn.call(thisArg, arr[i], i, arr);
}

// 返回给定元素能找在数组中找到的第一个索引值，否则返回-1。
Array.prototype.indexOf(searchElement[, fromIndex = 0]);

function indexOf(arr, searchElement, fromIndex) {
	var i = fromIndex || 0;
	var len = arr.length;
	if (i >= len) return -1;
	i = Math.max(i >= 0 ? i : len - Math.abs(i), 0);
	for (; i < len; i++) if (arr[i] === searchElement) return i;
	return -1;
}

// 返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
Array.prototype.lastIndexOf(searchElement[, fromIndex = arr.length - 1]);

function lastIndexOf(arr, searchElement, fromIndex) {
	var len = arr.length;
	var i = fromIndex || len;
	if (i > len) return -1;
	i = Math.max(i >= 0 ? i : len - Math.abs(i), 0);
	for (; i > -1; i--) if (arr[i] == searchElement) return i;
	return -1;
}

// 返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
Array.prototype.map(callback[, thisArg]);

function map(arr, callback, thisArg) {
	var result = [];
	for (var i = 0, len = arr.length; i < len; i++) result[i] = callback.call(thisArg, arr[i], i, arr);
	return result;
}

// 接收一个函数作为累加器，数组中的每个值（从左到右）开始合并，最终为一个值。
Array.prototype.reduce(callback,[initialValue]);

function reduce(arr, callback, initialValue) {
	// 如果没有起始的值就从数组的第一个值开始
	var i = initialValue ? 0 : 1;
	initialValue = initialValue || arr[0];
	for (var len = arr.length; i < len; i++) initialValue += callback(initialValue, arr[i], i, arr);
	return initialValue;
}

// 接受一个函数作为累加器，让每个值（从右到左，亦即从尾到头）缩减为一个值。（与 reduce() 的执行方向相反）
Array.prototype.reduceRight(callback[, initialValue]);

function reduceRight(arr, callback, initialValue) {
	var len = arr.length;
	var i = initialValue ? len - 1 : len - 2;
	initialValue = initialValue || arr[len - 1];
	for (; i > -1; i--) initialValue = callback(initialValue, arr[i], i, arr);
	return initialValue;
}

// 测试数组中的某些元素是否通过了指定函数的测试。
Array.prototype.some(callback[, thisArg]);

function some(arr, fn, thisArg) {
	thisArg = thisArg ? thisArg : undefined;
	for (var i = 0, len = arr.length; i < len; i++) if (fn.call(thisArg, arr[i], i, arr)) return true;
	return false;
}

/***************************es3********************************/

// 将传入的数组或非数组值与原数组合并,组成一个新的数组并返回
Array.prototype.concat(value1, value2, ..., valueN);

function concat() {
	var result = [];
	// 把数组拷贝出来
	for (var i = 0, arrLen = arguments[0].length; i < arrLen; i++) result[i] = arguments[0][i];
	// 这个是总的下标值，要维护这个值，2个地方
	var k = 0;
	for (var j = 1, argLen = arguments.length; j < argLen; j++) {
		// 不是数组
		if (!Array.isArray(arguments[j])) {
			result[i + k] = arguments[j];
			// 1.不是数组时要变
			k++;
			continue;
		}
		// 是数组
		// 2.是数组时也要变
		for (var g = 0, len = arguments[j].length; g < len; g++, k++) result[i + k] = arguments[j][g];
	}
	return result;
}

// 删除一个数组中的最后的一个元素，并且返回这个元素。
Array.prototype.pop();

function pop(arr) {
	var result = arr[arr.length - 1];
	arr.length = arr.length - 1;
	return result;
}

function pop (arr) {
	return arr.splice(arr.length - 1, 1)[0];
}

// 添加一个或多个元素到数组的末尾，并返回数组新的长度
Array.prototype.push(element1, ..., elementN);

function push(arr, arg) {
	for (var i = 1, len = arguments.length; i < len; i++) arr[arr.length] = arguments[i];
	return arr.length;
}

function push (arr) {
	arr.splice.apply(null, [arr.length, 0].concat(Array.prototype.slice.call(arguments, 1)));
	return arr.length;
}

// 删除数组的 第一个 元素，并返回这个元素。该方法会改变数组的长度。
Array.prototype.shift();

function shift(arr) {
	var result = arr[0];
	// 都往前移一位
	for (var i = 0,len = arr.length; i < len; i++) arr[i] = arr[i + 1];
	arr.length = arr.length - 1;
	return result;
}

function shift (arr) {
	return arr.splice(0, 1)[0];
}

// 浅复制数组的一部分到一个新的数组，并返回这个新数组。
Array.prototype.slice([begin[, end]]);

function arraySlice(arr, start, end) {
	var result = [];
	var l = arr.length;
	start = start ? start : 0;
	end = end ? end : l;
	if (start < 0) start = l + start;
	if (end < 0) end = l + end;
	if (end <= start) return;
	var len = end - start;
	for (var i = 0; i < len; i++) result[i] = arr[i + start];
	return result;
}

// 用新元素替换旧元素，以此修改数组的内容。
Array.prototype.splice(start, deleteCount[, item1[, item2[, ...]]]);

function splice(arr, start, del, add) {
	var result = [];
	var l = arr.length;
	del = del > l ? l : del;
	if (start < 0) start = l + start;
	if (del < 0) return;
	for (var i = 0; i < del; i++) result[i] = arr[i + start];
	// 先删
	for (var i = 0; i < l - start; i++) arr[i + start] = arr[i + start + del];
	arr.length = arr.length - del;
	// 后加
	if (add) {
		// 先把位置让出来才能插进去
		var arrL = add.length;
		var nl = arr.length;
		var cArr =  Array(nl + arrL);
		var kl = cArr.length;
		// 1.让位
		// 这里的len也就是要移的位置是从start开始到最后所有的位置
		for (var i = 0, j = start, len = nl - start; i < len, j < nl; i++, j++) cArr[kl - 1 - i] = arr[nl - j];
		// 2.请坐
		for (var i = start; i <= arrL; i++) cArr[i] = add[i - start];
		for (var i = 0; i < start; i++) cArr[i] = arr[i];
		// 把原来的数组替换成新的数组
		for (var i = 0; i < kl; i++) arr[i] = cArr[i];
	}
	return result;
}

function splice (arr, start, deleteCount) {
	var max = Math.max,
		min = Math.min,
		delta,
		element,
		insertCount = max(arguments.length - 2, 0),
		k = 0,
		len = arr.length,
		new_len,
		result = [],
		shift_count;
	start = start || 0;
	if (start < 0) {
		start += len;
	}
	start = max(min(start, len), 0);
	deleteCount = max(min(typeof deleteCount === 'number' ? deleteCount : len, len - start), 0);
	delta = insertCount - deleteCount;
	new_len = len + delta;
	while (k < deleteCount) {
		element = arr[start + k];
		if (elment !== undefined) {
			result[k] = element;
		}
		k += 1;
	}
	shift_count = len - start - deleteCount;
	if (delta < 0) {
		k = start + insertCount;
		while (shift_count) {
			arr[k] = arr[k - delta];
			k += 1;
			shift_count -= 1
		}
		arr.length = new_len;
	} else if (delta > 0) {
		k = 1;
		while (shift_count){
			arr[new_len - k] = arr[len - k];
			k += 1;
			shift_count -= 1;
		}
		arr.length = new_len;
	}
	for (k = 0; k < insertCount; k += 1) {
		arr[start + k] = arguents[k + 2];
	}
	return result;
}

// 在数组的开头添加一个或者多个元素，并返回数组新的 length 值。
Array.prototype.unshift(element1, ..., elementN);

function unshift(arr) {
	var nl = arguments.length;
	// 1.先让位
	for (var i = arr.length - 1; i > -1; i--) arr[i + nl - 1] = arr[i];
	// 2.在做进去
	for (var i = 0; i < nl - 1; i++) arr[i] = arguments[i + 1];
	return arr.length;
}

/*****************************es1*******************************/

// 将数组中的所有元素连接成一个字符串。
Array.prototype.join([separator = ',']);

function join(arr, separator) {
	var result = '';
	separator = separator == void 0 ? ',' : separator + '';
	for (var i = 0, len = arr.length; i < len; i++) result += arr[i] + separator;
	return result;
}

// 颠倒数组中元素的位置。第一个元素会成为最后一个，最后一个会成为第一个。
Array.prototype.reverse();

function reverse(arr) {
	var result = [];
	var len = arr.length;
	for (var i = len - 1; i > -1; i--) result[len -1 - i] = arr[i];
	for (var i = 0; i < len; i++) arr[i] = result[i];
}

// 返回一个字符串，表示指定的数组及其元素。
Array.prototype.toString();

function tostring(arr) {
	var result = '';
	// 如果是多维数组
	for (var i = 0,len = arr.length; i < len; i++) if (typeof arr[i] === 'object') result += arguments.callee(arr[i]); else result += arr[i] + ',';
	return result;
}

// Object

/**************************es5*********************************/

// 创建一个对象继承
Object.create(proto, [propertiesObject]);

var create = function (proto) {
    function F() {}
    F.prototype = proto;
    return new F();
};

// 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
Object.defineProperties(obj, props)

function defineProperties (obj, properties) {
	function converToDescriptor (desc) {
		function hasProperty (obj, prop) {
			return Object.prototype.hasOwnproperty.call(obj, prop);
		}
		function isCallable (v) {
			return typeof v === 'function';
		}
		if (typeof desc !== 'object' || desc === null) {
			throw new TypeError('bad, desc');
		}
		var d = {};
		if (hasProperty(desc, 'enumerable')) {
			d.enumerable = !!desc.enumerable;
		}
		if (hasProperty(desc, 'configurable')) {
			d.configurable = !!desc.configurable;
		}
		if (hasProperty(desc, 'value')) {
			d.value = !!desc.value;
		}
		if (hasProperty(desc, 'writable')) {
			d.writable = !!desc.writable;
		}
		if (hasProperty(desc, 'get')) {
			var g = desc.get;
			if (!isCallable(g) && typeof g !== 'undefined') {
				throw new TypeError('bad get');
			}
			d.get = g;
		}
		if (hasProperty(desc, 'set')) {
			var s = desc.set;
			if (!iscallable(s) && typeof s !== 'undefined') {
				throw new TypeError('bad set');
			}
			d.set = s;
		}
		if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d)) {
			throw new TypeError('identity-confused descriptor');
		}
		return d;
	}
	if (typeof obj !== 'object' || obj === null) {
		throw new TypeError('bad obj');
	}
	properties = Object(properties);
	var keys = Object.keys(properties);
	var descs = [];
	for (var i = 0; i < keys.lengthl i++) {
		descs.push([keys[i], converToDescriptor(properties[key[i]])]);
	}
	for (var i = 0; i < descs.length; i++) {
		Object.defineProperty(obj, descs[i][0], descs[i][1]);
	}
	return obj;
}

// 返回一个由一个给定对象的自身可枚举属性组成的数组
Object.keys(obj);

function keys (obj) {
	var result = [];
	for (var prop in obj) if (Object.prototype.hasOwnProperty.call(obj, prop)) result.push(prop);
}

// Function

/*****************************es1*******************************/

// 返回绑定了this的新函数
Function.prototype.bind();

function bind (obj, oThis) {
    var aArgs = [].slice.call(arguments, 2);
    var fToBind = obj;
    var fBound = function () {
        return fToBind.apply(oThis, aArgs.concat([].slice.call(arguments)));
    }
    return fBound;
}

// Number

/*****************************es3*******************************/

// 小数点后面保留几位
Number.prototype.toFixed();

function toFixed (num, n) {
    // 有几种情况
    // 1. 四舍五入
    // 2. 缺位补零
    if (Object.prototype.toString.call(num) !== '[object Number]' || Object.prototype.toString.call(n) !== '[object Number]') return num;
    var s = String(num).split('.');
    var n2 = s[1] ? s[1] : '';
    var l = '';
    for (let i = 0; i < n; i++) l += '0';
    var j = n2 + l;
    s[1] = j.slice(0, n);
    var k = Number(s[1]) + 1;
    s[1] = j[n] > 4 ? k : s[1];
    if (String(s[1]).length != n) {
        s[0] = Number(s[0]) + 1;
        s[1] = String(s[1]).slice(1);
    }
    s.splice(1, 0, '.');
    return s.join('');
}

// String

/*****************************es1*******************************/

// 返回第一次出现字符串中的指定值的索引
String.prototype.indexOf(searchValue[, fromIndex]);

function indexOf (str, searchValue, formIndex) {
    var len = str.length;
    var i = formIndex || 0;
    if (i >= len) return -1;
    i = Math.max(i >= 0 ? i : len - Math.abs(i), 0);
    for (; i < len; i++) if (str[i] === searchValue) return i;
    return -1;
}

// 返回指定值在调用该方法的字符串中最后出现的位置
String.prototype.lastIndexOf(searchValue[, fromIndex]);

function lastIndexOf (str, searchValue, formIndex) {
	var len = str.length;
	var i = formIndex || len;
	if (i > len) return -1;
	i = Math.max(i >= 0 ? i : len - Math.abs(i), 0);
	for (; i > -1; i--) if (str[i] === searchValue) return i;
	return -1;
}

/*****************************es3*******************************/

// 方法提取一个字符串的一部分，并返回一新的字符串。
String.prototype.slice(beginSlice[, endSlice]);

function stringSlice (str, a, b) {
    var args = arguments;
    if (args.length > 1) {
        return funcContent(str, a, b);
    } else return '';
    function funcContent (str, a, b) {
        var result = '';
        var len = str.length;
        var start = a ? a : len - Math.abs(a);
        var end = b > 0 ? b - 1 : (len - Math.abs(b)) ? (len - Math.abs(b)) - 1 : len;
        if (start > end) return '';
        for (let i = start; i <= end; i++) result += str[i];
        return result;
    };
}

// 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。
String.prototype.split([separator[, limit]]);

function split (str, separator, limit) {
	limit = limit < Infinity && limit > -Infinity ? limit : 0;
    // 正则能变出具体的字符，单具体的字符不能变出正则，只能抽象，这就是属加种差，所以趋向于那个大类，因为大类包含小类，就是把小类转化成大类，而不是用条件分支小类写一件事情，大类写一件事情，这是不对的，这是意见之路，不是真理之路
    var rex = Object.prototype.toString.call(separator) == '[object RegExp]' ? separator : new RegExp('([^\b' + separator + '\b]+)', 'g');
    var result = [];
    var num = 1;
    str.replace(rex, function (match, p1) {
    	if (limit && num > limit) return;
        result.push(p1);
        num++;
    });
    return result;
}

/*****************************es5*******************************/

// 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符(space, tab, no-break space 等)
String.prototype.trim();

function trim (str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

// Math

/*****************************es1*******************************/

// 函数返回一组数中的最大值。
Math.max([value1[,value2, ...]]);

function max () {
    var min = 0;
    [].forEach.call(arguments, function (a, b, c) {
        a > min && (min = a);
    });
    return min;
}

// 函数返回一组数中的最小值。
Math.min([value1[,value2, ...]]);

function min () {
    var max = Infinity;
    [].forEach.call(arguments, function (a, b, c) {
        a < max && (max = a);
    });
    return max;
}

// 函数返回大于或等于一个给定数字的最小整数。
Math.ceil(x);

function ceil (value) {
    var result = String(value).split('.')
    if (result.length === 1) return value;
    return Number(result[0]) + 1;
}

// 返回小于或等于一个给定数字的最大整数。
Math.floor(x);

function floor (value) {
	return Number(String(value).split('.')[0]);
}

// 函数返回一个数字四舍五入后最接近的整数。
Math.round(x);

function round (value) {
    var result = String(value).split('.');
    if (result.length === 1) return value;
    return result[1][0] >= 5 ? Number(result[0]) + 1 : Number(result[0]);
}

// Math

/*****************************es3*******************************/

// 时间格式化--模拟他的一种功能
Date.prototype.toLocaleString();

function timeFormat (format, date) {
    var time = _.isNumber(date) ? new Date(date) : new Date();
    var o = { 
        'M+' : time.getMonth() + 1,                 //月份 
        'd+' : time.getDate(),                    //日 
        'h+' : time.getHours(),                   //小时 
        'm+' : time.getMinutes(),                 //分 
        's+' : time.getSeconds(),                 //秒 
        'q+' : Math.floor((time.getMonth() + 3) / 3), //季度 
        'S'  : time.getMilliseconds()             //毫秒 
    }; 
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length)); 
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return format; 
}