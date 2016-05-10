// 命名空间
// dom方法
var method = {
	// 添加class
	addClass : function(obj,cls){
		var str = obj.className;
		if(m.contains(str,cls)) return;
		var newStr = str + ' ' + cls;
		obj.className = newStr;
	},
	// 删除class
	removeClass : function(obj,cls){
		var str = obj.className;
		if(!m.contains(str,cls)) return;
		var arr = str.split(' ');
		var newArr = m.without(arr,cls);
		obj.className = newArr.join(' ');
	},
	// 替换class
	rep : function(obj,repc,cls){
		var cln = obj.className;
		if(!m.contains(cln,repc)){
			this.addClass(obj,cls);
			return;
		}
		obj.className = m.rep(cln,repc,cls);
	},
	// 在节点后插入
	insertAfter : function(obj,newNode){
		obj.parentNode.insertBefore(newNode,obj.nextElementSibling);
	},








	// 运动框架
	move : function(obj,json,optional){
		optional = optional || {};
		optional.time = optional.time || 300;
		optional.type = optional.type || 'ease-out';
		var count = Math.round(optional.time / 30),
			n = 0,
			start = {},
			dis = {};
		for(var key in json){
			start[key] = parseFloat(getComputedStyle(obj)[key]);
			dis[key] = json[key] - start[key];
		};
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			n++;
			for(var key in json){
				switch(optional.type){
					case 'linear' :
					var a = n / count;
					break;
					case 'ease-in' :
					var a = n / count;
					a = Math.pow(a,3);
					break;
					case 'ease-out' :
					var a = 1 - n / count;
					a = 1 - Math.pow(a,3);
					break;
				};
				var cur = start[key] + dis[key] * a;
				if(key === 'opacity'){
					obj.style.opacity = cur;
				}else{
					obj.style[key] = cur + 'px';
				};
			};
			if(n === count){
				clearInterval(obj.timer);
				optional.fn && optional.fn();
			};
		},30);
	},
	// 随机颜色
	randomColor : function(){
		return '#' + Math.floor(Math.random() * parseInt('0xffffff',16).toString(10)).toString(16);
	},
	// 随机n-m之间的数
	randomCount : function(n,m){
		return parseInt(n + Math.random() * (m - n));	
	},
	// 数组去重
	removeRepeat : function(arr){
		var arr2 = [];
		function findInArr(arr,num){
			for(var i = 0,len = arr.length; i < len; i++){
				if(arr[i] === num) return true;
			};
			return false;
		};
		i = 0;
		while(i < arr.length){
			if(!findInArr(arr2,arr[i])) arr2.push(arr[i]);
			i++;
		};
		return arr2;
	},
	// 找最小最大值
	findM : function(arr){
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
	},
	// 补零
	fillZero : function (n){
		return n < 10 ? '0' + n : '' + n;	
	},
	// 批量添加样式
	css : function(obj,json){
		for(var key in json){
			obj.style[key] = json[key];
		};
	},
	// 获取元素在页面上的位置
	getPos : function(obj){
		var left = 0,
			top = 0,
			borderL = parseInt(getComputedStyle(obj).borderLeftWidth),
			borderT = parseInt(getComputedStyle(obj).borderTopWidth);
		while(obj){
			left += obj.offsetLeft + parseInt(getComputedStyle(obj).borderLeftWidth);
			top += obj.offsetTop + parseInt(getComputedStyle(obj).borderTopWidth);
			obj = obj.offsetParent;
		};
		return {
			left : left - borderL,
			top : top - borderT
		};
	},
	// jsonp
	jsonp : function(options){
		options = options || {};
		if(!options.url) return;
		options.data = options.data || {};
		options.cbName = options.cbName || 'cb';
		options.timeout = options.timeout || 0;
		var fnName = ('jsonp' + Math.random()).replace('.','');	
		window[fnName] = function(json){
			options.success && options.success(json);
			window[fnName] = null;
			head.removeChild(os);
			clearInterval(timer);
		};
		var arr = [],
			str = '';
		options.data[options.cbName] = fnName;
		for(var key in options.data){
			arr.push(key + '=' + encodeURIComponent(options.data[key]));
		};
		str = arr.join('&');
		var os = document.createElement('script'),
			head = document.getElementsByTagName('head')[0];
		os.src = options.url + '?' + str;
		head.appendChild(os);
		if(options.timeout){
			var timer = setInterval(function(){
				options.error && options.error();
				window[fnName] = function(){};
				head.removeChild(os);
				clearInterval(timer);
			},options.timeout);
		};
	},
	// ajax
	ajax : function(options){
		options = options || {};
		if(!options.url) return;
		options.data = options.data || {};
		options.type = options.type || 'get';
		options.timeout = options.timeout || 0;
		var arr = [],
			str = '';
		options.data.t = Math.random();
		for(var key in options.data){
			arr.push(key + '=' + encodeURIComponent(options.data[key]));
		};
		str = arr.join('&');
		var xhr = new XMLHttpRequest();
		switch(options.type){
			case 'get' :
			xhr.open('get',options.url + '?' + str,true);
			xhr.send();
			break;
			case 'post' :
			xhr.open('post',options.url,true);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.send(str);
			break;
		};
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				clearInterval(timer);
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
					options.success && options.success(xhr.responseText);
				}else{
					options.error && options.error(xhr.status);
				};
			};
		};
		if(options.timeout){
			var timer = setTimeout(function(){
				xhr.abort();
				clearTimeout(timer);
			},options.timeout);
		};
	}
};










