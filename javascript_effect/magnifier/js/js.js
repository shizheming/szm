function magnifier(id){
	var obj = document.getElementById(id),
		smallPic = obj.children[0],
		mark = smallPic.children[1],
		bigPic = obj.children[1],
		bigPicImg = bigPic.children[0];
	smallPic.onmouseover = function(ev){
		if(!this.contains(ev.relatedTarget)){
			mark.style.display = bigPic.style.display = 'block';
		};
	};
	smallPic.onmouseout = function(ev){
		if(!this.contains(ev.relatedTarget)){
			mark.style.display = bigPic.style.display = 'none';
		};
	};
	smallPic.onmousemove = function(ev){
		var x = ev.clientX,
			y = ev.clientY,
			markW = mark.offsetWidth,
			markH = mark.offsetHeight,
			smallPicW = smallPic.offsetWidth,
			smallPicH = smallPic.offsetHeight,
			l = x - obj.offsetLeft - markW / 2,
			t = y - obj.offsetTop + (document.documentElement.scrollTop || document.body.scrollTop) - markH / 2;
		if(l < 0) l = 0;
		if(l > smallPicW - markW) l = smallPicW - markW;
		if(t < 0) t = 0;
		if(t > smallPicH - markH) t = smallPicH - markH;
		mark.style.left = l + 'px';
		mark.style.top = t + 'px';
		bigPicImg.style.left = mark.offsetLeft / (smallPicW - markW) * (bigPic.offsetWidth - bigPicImg.offsetWidth) + 'px';
		bigPicImg.style.top = mark.offsetTop / (smallPicH - markH) * (bigPic.offsetHeight - bigPicImg.offsetHeight) + 'px';
	};
};