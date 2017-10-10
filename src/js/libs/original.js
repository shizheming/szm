// 有时候会一直想怎么判断这个东西在不在，是什么位置，有没有
// 我们用眼就能看到，但计算机不知道，所以要转变成计算机能理解的语言

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
	for (var len = arr.length; i < len; i++) initialValue = callback(initialValue, arr[i], i, arr);
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
		if (!isArr(arguments[j])) {
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

function slice(arr, start, end) {
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







// 模仿不了的

// Array
// es1
Array.prototype.sort();
// es3
Array.prototype.toLocaleString();






// Math

/***********es1**************/

// Math.max();
// Math.min();
// 找最小最大值
function findM(arr){
	var min = Number.MAX_VALUE,
		max = Number.MIN_VALUE,
		minIndex = -1,
		maxIndex = -1;
	for(var i = 0,len = arr.length; i < len; i++){
		if(min > arr[i]){
			min = arr[i];
			minIndex = i;
		};
		if(max < arr[i]){
			max = arr[i];
			maxIndex = i;
		};
	};
	return {
		min : min,
		minIndex : minIndex,
		max : max,
		maxIndex : maxIndex
	};
}


Math.E;
Math.LN10;
Math.LN2;
Math.LOG10E;
Math.LOG2E;
Math.PI;
Math.SQRT1_2;
Math.SQRT2;

	Math.abs();
	
	Math.pow();
	Math.random();
	Math.ceil();
	Math.floor();
	Math.sqrt();

Math.acos();
Math.asin();
Math.atan();
Math.cos();
Math.exp();
Math.log();
Math.sin();
Math.tan();








// its
// rest参数

function getRest(func) {
	// 新返回的函数支持rest参数
	return function(){
		// 获得形参个数
		var argLength = func.length;
		// rest参数的起始位置为最后一个形参位置
		var startIndex = argLength - 1;
		// 最终需要的参数数组
		var args = Array(argLength);
		// 设置rest参数
		var rest = Array.prototype.slice.call(arguments, startIndex);
		// 设置最终调用时需要的参数
		for(var i = 0; i < startIndex; i++) args[i] = arguments[i];
		args[startIndex] = rest;
		return func.apply(null, args);
	}
}









// String----字符串几乎都不行
/***********es1**************/
String.fromCharCode();
String.prototype.charAt();
String.prototype.charCodeAt();
String.prototype.indexOf();
String.prototype.lastIndexOf();
String.prototype.substring();
String.prototype.toLowerCase();
String.prototype.toUpperCase();
String.prototype.valueOf();
/***********es3**************/
String.prototype.concat();
String.prototype.localeCompare();
String.prototype.match();
String.prototype.replace();
String.prototype.search();
String.prototype.slice();
String.prototype.split();
String.prototype.substr();
String.prototype.toLocaleLowerCase();
String.prototype.toLocaleUpperCase();
String.prototype.toString();
/***********es5**************/
String.prototype.trim();



// Object----牵扯到原型和面向对象的方法先放一放，同样也是基本模仿不了的
/*************es5***************/
Object.create();
Object.defineProperties();
Object.defineProperty();
Object.freeze();
Object.getOwnPropertyDescriptor();
Object.getOwnPropertyNames();
Object.isExtensible();
Object.isFrozen();
Object.isSealed();
Object.keys();
Object.preventExtensions();

/**************es3****************/
Object.prototype.hasOwnProperty();
Object.prototype.isPrototypeOf();
Object.prototype.toLocaleString();

/****************es1*****************/
Object.prototype.toString();
Object.prototype.valueOf();
Object.seal();








/************全局属性************/
Infinity
NaN
undefined
null
/***************全局方法***************/
eval();
isFinite();
isNaN();
parseFloat();
parseInt();
decodeURI();
decodeURIComponent();
encodeURI();
encodeURIComponent();



/*****************DOM****************/

/****************window******************/
applicationCache;
closed;
document;
frameElement;
frames;
history;
	{
		back(),
		go();
	}
innerWidth;
innerHeight;
length;
localStorage;
location
	{
		ancestorOrigins :
		DOMStringList
		assign(),
		hash :
		host :
		hostname :
		href :
		origin :
		pathname :
		port :
		protocol :
		reload(),
		replace(),
		search :
	}
name;
navigator;
opener;
outerHeight;
outerWidth;
parent;
screen;
screenX;
screenY;
scrollX;
scrollY;
self;
sessionStorage;
status;
statusbar;
toolbar;
top;



// 全局事件
onbeforeunload;
onabort;
onblur;
onchange;
onclick;
onclose;
oncontextmenu;
ondblclick;
onerror;
onfocus;
onhashchange;
oninput;
onkeydown;
onkeypress;
onkeyup;
onload;
onmousedown;
onmousemove;
onmouseout;
onmouseover;
onmouseup;
onreset;
onresize;
onscroll;
onselect;
onstorage;
onsubmit;
ontouchstart;
ontouchmove;
ontouchend;
ontouchcancel;
onreadystatechange;
window.getSelection().anchorOffset; 
window.getSelection().focusOffset; 


/**********document************/
document.activeElement;
document.anchors;
document.applets;
document.body;
document.characterSet;
document.compatMode;
document.contentType;
document.currentScript;
document.defaultView;
document.designMode;
document.dir;
document.doctype;
document.documentElement;
document.documentURI;
document.domain;
document.forms;
document.head;
document.images;
document.implementation;
document.lastModified;
document.links;
document.location;
	{
		ancestorOrigins :
		DOMStringList
		assign(),
		hash :
		host :
		hostname :
		href :
		origin :
		pathname :
		port :
		protocol :
		reload(),
		replace(),
		search :
	}
document.origin;
document.plugins;
document.readyState;
document.referrer;
document.scripts;
document.styleSheets;
document.styleSheetSets;
document.title;
document.URL;
document.visibilityState;
document.createAttribute;
document.createComment;
document.createDocumentFragment();
document.createElement();
document.createEvent();
document.createTextNode();
document.elementFromPoint();
document.getElementById();
document.getElementsByClassName();
document.getElementsByName();
document.getElementsByTagName();
document.hasFocus();
document.importNode();
document.querySelector();
document.querySelectorAll();
document.write();
document.writeln();




firstElementChild;
children;
lastElementChild;
onafterscriptexecute
onbeforescriptexecute;












































