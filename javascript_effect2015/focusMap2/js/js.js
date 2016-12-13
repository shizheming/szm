function focusMap(id){
	var obj = document.getElementById(id),
		title = obj.children[0],
		titleC = title.children,
		content = obj.children[1],
		contentC1 = content.children[0],
		contentC1C1W = contentC1.children[0].offsetWidth,
		prev = obj.children[2],
		next = obj.children[3],
		pos = 0,
		now = 0,
		timer = null,
		left = 0,
		contentW = contentC1C1W * contentC1.children.length;
	content.style.width = contentW * 2 + 'px';
	content.insertBefore(contentC1.cloneNode(true),contentC1);
	method.addClass(titleC[0],'active');
	for(var i = 0,len = titleC.length; i < len; i++){
		(function(index){
			titleC[i].onmouseover = function(){
				if(pos === index) return;
				if(titleC[0].className.indexOf('active') + 1 && index === len - 1){
					now--;
				}else if(titleC[len - 1].className.indexOf('active') + 1 && index === 0){
					now++;
				}else{
					now = Math.floor(now / len) * len + index;					
				};
				auto();
			};
		})(i);
	};
	function auto(){
		if(now % len < 0){
			var t = len - Math.abs(now % len);
		}else{
			var t = now % len;
		};
		method.addClass(titleC[t],'active');
		method.removeClass(titleC[pos],'active');
		move(content,-now * contentC1C1W);
		pos = t;
	};
	function n(ev){
		now++;
		auto();
		ev.preventDefault();
	};
	next.onclick = n;
	prev.onclick = function(ev){
		now--;
		auto();
		ev.preventDefault();
	};
	function move(obj,iTarget){
		var start = left,
			dis = iTarget - start,
			time = 700,
			count = Math.round(time / 30),
			n = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			n++;
			var a = 1 - n / count;
			a = 1 - Math.pow(a,3);
			left = start + dis * a;
			if(left < 0){
				obj.style.marginLeft = left % contentW + "px";
			}else{
				obj.style.marginLeft = (left % contentW - contentW) % contentW + "px";	
			}
			if(n === count) clearInterval(obj.timer);
		},30);
	};
	// timer = setInterval(n,2000);
	// obj.onmouseover = function(){
	// 	clearInterval(timer);
	// };
	// obj.onmouseout = function(){
	// 	timer = setInterval(n,2000);
	// };
};
