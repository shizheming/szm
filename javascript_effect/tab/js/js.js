function tab(id,j){
	j = j || {};
	var json = {
		e : j.e || 'onmouseover',
		time : j.time || 2000,
		auto : j.auto || false
	},
		obj = document.getElementById(id),
		title = obj.children[0],
		content = obj.children[1],
		prev = obj.children[2],
		next = obj.children[3],
		titleChild = title.children,
		contentChild = content.children,
		pos = 0,// 这个能和now连着写2个tab切换会出问题why？
		now = 0,// 因为 pos = now = 0，这样的写法后面的now就变成全局变量了
		timer = null;
	method.addClass(titleChild[0],'cur');
	method.addClass(contentChild[0],'cur');
	for(var i = 0,len = titleChild.length; i < len; i++){
		(function(index){
			titleChild[i][json.e] = function(){
				now = index;
				doThing();
			};
		})(i);
	};
	function doThing(){
		if(pos === now) return;
		method.addClass(titleChild[now],'cur');
		method.removeClass(titleChild[pos],'cur');
		method.addClass(contentChild[now],'cur');
		method.removeClass(contentChild[pos],'cur');
		pos = now;
	};
	next.onclick = auto;
	prev.onclick = function(ev){
		if(now-- === 0) now = titleChild.length - 1;
		doThing();
		ev.preventDefault();
		// return false;
	};
	function auto(ev){
		if(++now === titleChild.length) now = 0;
		doThing();
		ev.preventDefault();
		// return false;
	};
	json.auto && (function(){
		timer = setInterval(auto,json.time);// 这里怎么传ev preventDefault报错了
		obj.onmouseover = function(){
			clearInterval(timer);
		};
		obj.onmouseout = function(){
			timer = setInterval(auto,json.time);
		};
	})();
};