function backTop(id){
	var obj = document.getElementById(id),
		timer = null,
		ready = true;
	obj.onclick = function(){
		var start = document.documentElement.scrollTop || document.body.scrollTop,
			dis = -start,
			count = Math.round(1000 / 30),
			n = 0;
		clearInterval(timer);
		timer = setInterval(function(){
			var a = 1 - ++n / count;
			a = 1 - Math.pow(a,3);
			var cur = start + dis * a;
			// 为什么不能||写
			document.documentElement.scrollTop = cur;
			document.body.scrollTop = cur;
			ready = false;
			if(n === count) clearInterval(timer);
		},30);
	};
	window.onscroll = function(){
		if(ready) clearInterval(timer);
		ready = true;
	};
};