function sidebar(id){
	var obj = document.getElementById(id);
	var m = obj.children[0];
	var nav = obj.children[1];
	var aH = parseInt(getComputedStyle(nav.children[0]).height);
	for(var i = 0,len = nav.children.length; i < len; i++){
		nav.children[i].index = i;
	};
	nav.onmouseover = function(ev){
		var that = ev.target;
		var tagN = that.tagName.toLocaleLowerCase();
		if(tagN !== 'a') return;
		method.move(m,{
			top : that.index * aH
		});
	};
	nav.onmouseout = function(ev){
		var that = ev.target;
		var tagN = that.tagName.toLocaleLowerCase();
		var to = ev.relatedTarget;
		if(tagN !== 'a') return;
		method.move(m,{
			top : 0
		});
	};
};
