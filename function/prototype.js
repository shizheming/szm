// 函数行为不改变传进来的参数，而是返回一个新的结果，分离，独立，不影响原来的，这就是函数的没有变量，只有常量，一份数据被创建出来了之后，他永远不会改变

var toString = Object.prototype.toString;

// Array Funciton

function join(array){
	var str = '';
	var dot = arguments[1] || ',';
	for(var i = 0,len = array.length-1;i < len;i++){
		str += array[i] + dot;
	}
	// 最后一个和其他的分开来处理，而不是写在循环里每次都要判断，这里的思想是往上加，而不是往下减
	// 其实往下减也是可以的，但这里主要的思想是把最后一种情况分开来写，而不是一起写在循环里面
	str += array[len];
	return str;
}

function pop(array){
	var result = cloneArray(array);
	result.length = result.length - 1;
	return result;
}

function push(array){
	var result = cloneArray(array);
	result[result.length] = arguments[1];
	return result;
}

function isArray(obj){
	return toString.call(obj) === '[object Array]';
}

function map(obj,iteratee,context){
	var keys = obj.length !== +obj.length && Object.keys(obj),
		length = (keys || obj).length,
		results = Array(length),
		currentKey;
	for(var index = 0; index < length; index++){
		currentKey = keys ? keys[index] : index;
		results[index] = iteratee(obj[currentKey],currentKey);
	}
	return results;
}

// 这个是执行过程的函数，也就是办事情的，并不是计算函数
function forEach(obj,iteratee){
	var i,
		length = obj.length;
	if(length === +length){
		for(i = 0; i < length; i++){
			iteratee(obj[i],i);
		}
	}else{
		var keys = Object.keys(obj);
		for(i = 0,length = keys.length; i < length; i++){
			iteratee(obj[keys[i]],keys[i]);
		}
	}
	return obj;
}

// 过滤函数
function filter(obj,predicate){
	var results = [];
	forEach(obj,function(value,index){
		if(predicate(value,index)) results.push(value);
	});
	return results;
}

function every(obj,predicate){
	var keys = obj.length !== +obj.length && Object.keys(obj),
		length = (keys || obj).length;
	for(var index = 0,currentKey; index < length; index++){
		currentKey = keys ? keys[index] : index;
		if(!predicate(obj[currentKey],currentKey)) return false
	}
	return true;
}

function some(obj,predicate){
	var keys = obj.length !== +obj.length && Object.keys(obj),
		length = (keys || obj).length;
	for(var index = 0,currentKey; index < length; index++){
		currentKey = keys ? keys[index] : index;
		if(predicate(obj[currentKey],currentKey)) return true;
	}
	return false;
}