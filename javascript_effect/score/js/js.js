function score(id){
	var obj = document.getElementById(id),
		objChild = obj.children;
	for(var i = 0,len = objChild.length; i < len; i++){
		(function(index){
			objChild[i].onmouseover = function(){
				for(var i = 0; i < len; i++){
					if(i <= index){
						method.addClass(objChild[i],'cur');
					}else{
						method.removeClass(objChild[i],'cur');
					};
				};
				this.onclick = function(){
					alert(index + 1);
					for(var i = 0; i < len; i++){
						objChild[i].onclick = objChild[i].onmouseover = objChild[i].onmouseout = null;
					};
				};
			};
			objChild[i].onmouseout = function(){
				for(var i = 0; i < len; i++){
					method.removeClass(objChild[i],'cur');
				};
			};
		})(i);
	};
};