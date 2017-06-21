// ECMAScript 5
// Array.prototype.indexOf
// Array.isArray
// Array.prototype.filter
// Object.keys


// Array Function




// 交换2数组的值
function exchange(array1,array2){
	var array3 = [];
	for(var i = 0,len = array1.length;i < len;i++){
		array3.push(array1[i]);
	}
	array1 = array2;
	array2 = array3;
	return arguments;
}


// 数组去重，返回一个新数组
function uniq(array){
	var result = [];
	for(var i = 0,length = array.length;i < length;i++){
		var value = array[i];
		if(!contains(result,value)){
			result.push(value);
		}
	}
	return result;
}

// 多个数组合并，返回一个新数组并去重
function union(){
	return uniq(flatten(arguments));
}

// 多维数组转化成一维数组，返回这个新数组
function flatten(input){
	var output = [],
		idx = 0,
		value;
	for(var i = 0,length = input.length;i < length;i++){
		value = input[i];
		if(Array.isArray(value)){
			// 递归的厉害之处，这里递归是为了多维数组，2维是不需要的
			// value = flatten(value);
			var j = 0,
				len = value.length;
			while(j < len){
				output[idx++] = value[j++];
			}
		}else{
			output[idx++] = value;
		}
	}
	return output;
}

// 多个数组的交集，返回交集新数组
function intersection(array){
	var result = [];
	var argsLength = arguments.length;
	for(var i = 0,length = array.length;i < length;i++){
		var item = array[i];
		if(contains(result,item)){
			continue;	
		}
		for(var j = 1;j < argsLength;j++){
			if(!contains(arguments[j],item)) break;
		}
		if(j === argsLength){
			result.push(item);	
		}
	}
	return result;
}

// 合并2个数组返回一个新数组，并去重
function differ(array1,array2){
	var result = [];
	var t = intersection(array1,array2);
	for(var i = 0,len = arguments.length;i < len;i++){
		result.push(difference(arguments[i],t));
	}
	return flatten(result);
}

// 问题：怎么删除2个数组中相同的部分？


// 深复制一个数组，返回一个新数组
function cloneArray(array){
	return array.slice();
}

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

// 返回数组除了第一个元素外的其他元素，如果传递第二个参数index，那么就返回从index开始剩余的所有元素
// （比如表格的表头不是数据，可以用这个干掉）
function rest(array,n){
	return slice.call(array,n == null ? 1 : n);
}

// 返回数组中除了最后一个元素之外的全部元素，传递n参数将从结果中排除从最后一个开始的n个元素
function initial(array,n){
	return slice.call(array,0,array.length - (n == null ? 1 : n));
}

// 创建整数灵活编号的列表数组
function range(start,stop,step){
	if(arguments.length <= 1){
		stop = start || 0;
		start = 0;
	}
	step = step || 1;
	var length = Math.max(Math.ceil((stop - start) / step),0);
	var range = Array(length);
	for(var idx = 0; idx < length; idx++,start += step){
		range[idx] = start;
	}
	return range;
}

// 返回json的长度
function size(obj){
	return Object.keys(obj).length;
}

// 当predicate通过真检查时，返回第一个索引值，否则返回-1
function findIndex(array,predicate){
	for(var i = 0,length = array.length; i < length; i++){
		if(predicate(array[i],i)) return i;
	}
	return -1;
};

// 在obj内查找，返回第一个通过predicate迭代函数真值检验的元素值，没有找到返回undefined，找到立即返回，不会遍历整个obj
function find(obj,predicate){
	var key = obj.length === +obj.length ? findIndex(obj,predicate) : findKey(obj,predicate);
	if(key !== void 0 && key !== -1) return obj[key];
}

// Object Function

// 当predicate通过真检查时，返回第一个键
function findKey(obj,predicate){
	var keys = Object.keys(obj),
		key;
	for(var i = 0,length = keys.length; i < length; i++){
		key = keys[i];
		if(predicate(obj[key],key,obj)) return key;
	}
};

// 返回object对象所有的属性值的数组
function values(obj){
	var keys = Object.keys(obj);
	var length = keys.length;
	var val = Array(length);
	for(var i = 0;i < length;i++){
		val[i] = obj[keys[i]];
	}
	return val;
}

// 把一个对象转换为一个[key,value]形式的数组
function pairs(obj){
	var keys = Object.keys(obj);
	var length = keys.length;
	var pai = Array(length);
	for(var i = 0;i < length;i++){
		pai[i] = [keys[i],obj[keys[i]]];
	}
	return pai;
}

// 深复制一个对象，返回一个新对象
function cloneObject(obj){
	var result = {};
	for(var key in obj){
		result[key] = obj[key];
	}
	return result;
}

// 如果对象object中的属性property是函数，则调用他，否则，返回他
function result(object,property){
	var value = object[property];
	return isFunction(value) ? value.call(object) : value;
}

// 谓词函数

// 判断一个值是否是null或undefined，也就是是否存在
function existy(x){
	return x != null;
}

// 判断是否是true的同义词
function truthy(x){
	return (x !== false) && existy(x);
}



// 判断是不是NaN
function isNaN(obj){
	return isNumber(obj) && obj !== +obj;
}

// 泛型函数

// 一个集合内值得计算，返回一个计算后值
function reduce(obj,iteratee){
	var keys = obj.length !== +obj.length && Object.keys(obj),
		length = (keys || obj).length,
		index = 0,
		memo = obj[keys ? keys[index++] : index++],
		currentKey;
	for(; index < length; index++){
		currentKey = keys ? keys[index] : index;
		memo = iteratee(memo,obj[currentKey]);
	}
	return memo;
}
// its

// 随机颜色
function randomColor(){
	return '#' + Math.floor(Math.random() * parseInt('0xffffff',16).toString(10)).toString(16);
}

// 随机n-m之间的数
function randomCount(n,m){
	return parseInt(n + Math.random() * (m - n));	
}

// 补零
function fillZero(n){
	return n < 10 ? '0' + n : '' + n;	
}