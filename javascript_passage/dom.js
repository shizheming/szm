// 名称：dom.js
// 版本：1.0
// 时间：2016.2
// ------------------------------------------------------------


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

	// 随机颜色
	randomColor : function(){
		return '#' + Math.floor(Math.random() * parseInt('0xffffff',16).toString(10)).toString(16);
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

	// 处理时间戳
	timeStamp : function(time){
		var result = {};

		time = new Date(time * 1000);
		result.year = time.getFullYear();
		result.month = zero(time.getMonth() + 1);
		result.date = zero(time.getDate());
		result.hours = zero(time.getHours());
		result.minutes = zero(time.getMinutes());
		result.seconds = zero(time.getSeconds());

		return result;
	}
	
	
};










