function focusMap(id){
	var obj = document.getElementById(id),
		title = obj.children[0],
		titleC = title.children,
		content = obj.children[1],
		contentC = content.children,
		prev = obj.children[2],
		next = obj.children[3],
		pos = 0,
		now = 0,
		timer = null;
	method.addClass(titleC[0],'active');
	method.addClass(contentC[0],'active');
	for(var i = 0,len = titleC.length; i < len; i++){
		(function(index){
			titleC[i].onmouseover = function(){
				if(now === index) return;
				now = index;
				tab();
			};
		})(i);
	};
	function tab(){
		method.addClass(titleC[now],'active');
		method.removeClass(titleC[pos],'active');
		(function(ind){
			method.move(contentC[ind],{
				'opacity' : 1
			},{
				time : 1000,
				fn : function(){
					method.addClass(contentC[ind],'active');
				}
			});
		})(now);
		(function(ind){
			method.move(contentC[ind],{
				'opacity' : 0
			},{
				time : 1000,
				fn : function(){
					method.removeClass(contentC[ind],'active');
				}
			});
		})(pos);
		pos = now;
	};
	next.onclick = function(ev){
		if(++now === len) now = 0;
		tab();
		ev.preventDefault();
	};
	prev.onclick = function(ev){
		if(--now === -1) now = len - 1;
		tab();
		ev.preventDefault();
	};
	// timer = setInterval(n,2000);
	// obj.onmouseover = function(){
	// 	clearInterval(timer);
	// };
	// obj.onmouseout = function(){
	// 	timer = setInterval(n,2000);
	// };
};
