// 运动框架
function move(obj,json,optional){
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
};