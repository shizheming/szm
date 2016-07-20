function focusMap(id,at){
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
		ready = true;
	content.style.width = contentC1C1W * contentC1.children.length * 2 + 'px';
	content.insertBefore(contentC1.cloneNode(true),contentC1);
	method.addClass(titleC[0],'active');
	for(var i = 0,len = titleC.length; i < len; i++){
		(function(index){
			titleC[i].onmouseover = function(){
				now = index;
				auto();
			};
		})(i);
	};
	function auto(){
		if(pos === now) return;
		now === len ? method.addClass(titleC[0],'active') : method.addClass(titleC[now],'active');
		method.removeClass(titleC[pos],'active');
		move(content,{
			marginLeft : -now * contentC1C1W
		},{
			fn : function(){
				ready = true;
				if(now === len){
					now = 0;
					pos = now;
					content.style.marginLeft = 0;
				}else{
					pos = now;
				};
			}
		});
		pos = now;
	};
	function n(ev){
		// 占时隐藏
		// ev.preventDefault();
		if(!ready) return;
		ready = false;
		now++;
		auto();
	};
	next.onclick = n;
	prev.onclick = function(ev){
		ev.preventDefault();
		if(!ready) return;
		ready = false;
		if(now-- === 0){
			now = len - 1;
			content.style.marginLeft = - content.offsetWidth / 2 + 'px';
		}
		auto();
	};

	at && (function(){
		// 定时器怎么传鼠标事件？
		timer = setInterval(n,2000);
		obj.onmouseover = function(){
			clearInterval(timer);
		};
		obj.onmouseout = function(){
			timer = setInterval(n,2000);
		};
	})();
};