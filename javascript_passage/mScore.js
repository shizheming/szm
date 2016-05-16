(function(that){
	var z = that;
	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;
	function m(){}
	z.m = m;

	// 把数组转化为对象
	m.toObject = function(list,values){
		var result = {};
		for(var i = 0,length = list.length;i < length;i++){
			if(values){
				result[list[i]] = values[i];
			}else{
				result[list[i][0]] = list[i][1];
			}
		}
		return result;
	};

	// 复制一个对象只要原对象的属性名，属性值自己加
	m.cloneName = function(array,fn){
	    var results = {};
	    for(var i = 0,length = array.length; i < length; i++){
	        results[array[i]] = fn();
	    }
	    return results;
	};

	// 替换字符串
	m.rep = function(str,ex,pl){
		return str.replace(new RegExp(ex,'g'),pl);
	};

	// 如果obj包含指定的target则返回true
	m.contains = function(obj,target){
		return obj.indexOf(target) >= 0;
	};

	// 返回新数组的参数来源于array1，并且不存在于array2数组里面
	m.difference = function(array1,array2){
		return array1.filter(function(value){
			// 包含方法直接出true或false，不用我们自己手动去写比较2个值是否一样
			return !m.contains(array2,value);
		});
	};

	// 返回一个删除所有values值后的新数组
	m.without = function(array){
		return this.difference(array,slice.call(arguments,1));
	};

	// 判断一个值是否是null或undefined，也就是是否存在
	m.existy = function(x){
		return x != null;
	};

	// 判断是否是true的同义词
	m.truthy = function(x){
		return (x !== false) && existy(x);
	};

	// 当predicate通过真检查时，返回第一个索引值，否则返回-1
	m.findIndex = function(array,predicate){
		for(var i = 0,length = array.length; i < length; i++){
			if(predicate(array[i],i)) return i;
		}
		return -1;
	};

	// 在obj内查找，返回第一个通过predicate迭代函数真值检验的元素值，没有找到返回undefined，找到立即返回，不会遍历整个obj
	m.find = function(obj,predicate){
		var key = obj.length === +obj.length ? m.findIndex(obj,predicate) : m.findKey(obj,predicate);
		if(key !== void 0 && key !== -1) return obj[key];
	};

	// 当predicate通过真检查时，返回第一个键
	m.findKey = function(obj,predicate){
		var keys = Object.keys(obj),
			key;
		for(var i = 0,length = keys.length; i < length; i++){
			key = keys[i];
			if(predicate(obj[key],key,obj)) return key;
		}
	};



	// 判断数据类型
	['Arguments','Function','String','Number','Date','RegExp','Error','Array'].forEach(function(element,index,array){
		m['is' + element] = function(obj){
			return toString.call(obj) === '[object ' + element + ']';
		};
	  });


}).call(this,this);
