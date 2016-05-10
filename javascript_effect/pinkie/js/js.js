function pinkie(id){
	var obj = document.getElementById(id),
		objC = obj.children[0],
		objCw = getComputedStyle(objC).width,
		objCw2 = objC.offsetWidth;
	function getDrection(ev){
		var x = ev.clientX - obj.offsetLeft - obj.offsetWidth / 2;
		var y = obj.offsetTop + obj.offsetHeight / 2 - ev.clientY;
		return Math.round((Math.atan2(y,x) * 180 / Math.PI + 180) / 90) % 4 ;	
	};
	obj.onmouseover = function(ev){
		if(this.contains(ev.relatedTarget)) return;
		var n = getDrection(ev);
		switch(n){
			case 0 :
			objC.style.left = '-' + objCw;
			objC.style.top = 0;
			break;
			case 1 :
			objC.style.left = 0;
			objC.style.top = objCw;
			break;
			case 2 :
			objC.style.left = objCw;
			objC.style.top = 0;
			break;
			case 3 :
			objC.style.left = 0;
			objC.style.top = '-' + objCw;
			break;
		};
		method.move(objC,{
			left : 0,
			top : 0
		});
	};
	obj.onmouseout = function(ev){
		if(this.contains(ev.relatedTarget)) return;
		var n = getDrection(ev);
		switch(n){
			case 0 :
			method.move(objC,{
				left : -objCw2,
				top : 0
			});
			break;
			case 1 :
			method.move(objC,{
				left : 0,
				top : objCw2
			});
			break;
			case 2 :
			method.move(objC,{
				left : objCw2,
				top : 0
			});
			break;
			case 3 :
			method.move(objC,{
				left : 0,
				top : -objCw2
			});
			break;
		};
	};
};