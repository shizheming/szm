function customScroll(id){
	var obj = document.getElementById(id),
		scroll = obj.children[0],
		content = obj.children[1],
		conT = content.children[0],
		top = scroll.children[0],
		bottom = scroll.children[2],
		center = scroll.children[1],
		block = center.children[0],
		timer = null;
	block.onmousedown = function(ev){
		var dis = ev.clientY - this.offsetTop,
			centerH = center.offsetHeight,
			blockH = this.offsetHeight;
		document.onmousemove = function(ev){
			var t = ev.clientY - dis;
			if(t < 0) t = 0;
			if(t > centerH - blockH) t = centerH - blockH;
			block.style.top = t + 'px';
			var scale = block.offsetTop / (centerH - blockH);
			conT.style.top = scale * (content.offsetHeight - conT.offsetHeight) + 'px';
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		// return false;
		ev.preventDefault();
	};
	top.onmousedown = function(){
		timer = setInterval(function(){
			var t = block.offsetTop;
			t -= 10;
			if(t < 0) t = 0;
			if(t > center.offsetHeight - block.offsetHeight) t = center.offsetHeight - block.offsetHeight;
			block.style.top = t + 'px';
			var scale = block.offsetTop / (center.offsetHeight - block.offsetHeight);
			conT.style.top = scale * (content.offsetHeight - conT.offsetHeight) + 'px';
		},30);
	};
	top.onmouseup = function(){
		clearInterval(timer);
	};
	bottom.onmousedown = function(){
		timer = setInterval(function(){
			var t = block.offsetTop;
			t += 10;
			if(t < 0) t = 0;
			if(t > center.offsetHeight - block.offsetHeight) t = center.offsetHeight - block.offsetHeight;
			block.style.top = t + 'px';
			var scale = block.offsetTop / (center.offsetHeight - block.offsetHeight);
			conT.style.top = scale * (content.offsetHeight - conT.offsetHeight) + 'px';
		},30);
	};
	bottom.onmouseup = function(){
		clearInterval(timer);
	};
	addMouseWheel(content,function(down){
		var t = block.offsetTop;
		t = down ? t + 10 : t - 10;
		if(t < 0) t = 0;
		if(t > center.offsetHeight - block.offsetHeight) t = center.offsetHeight - block.offsetHeight;
		block.style.top = t + 'px';
		var scale = block.offsetTop / (center.offsetHeight - block.offsetHeight);
		conT.style.top = scale * (content.offsetHeight - conT.offsetHeight) + 'px';
	});
	function addMouseWheel(obj,fn){
		var down = false;
		if(window.navigator.userAgent.indexOf('Firefox') != -1){
			obj.addEventListener('DOMMouseScroll',function(ev){
				var oEvt = ev || event;
				if(oEvt.detail > 0) down = true;
				else if(oEvt.detail < 0) down = false;
				oEvt.preventDefault && oEvt.preventDefault();
				fn(down);
				return false;
			},false);
		}else{
			obj.onmousewheel = function(ev){
				var oEvt = ev || event;
				if(oEvt.wheelDelta < 0) down = true;
				else if(oEvt.wheelDelta > 0) down = false;
				fn(down);
				return false;
			};
		};
	};
};