function popUp(id,clickId,bl){
	var obj = document.getElementById(id);
	var clickObj = document.getElementById(clickId);
	var close = obj.getElementsByClassName('close')[0];
	var mark = obj.getElementsByClassName('mark')[0];
	var bl2 = true;
	if(bl){
		close.onclick = mark.onclick = function(){
			if(bl2) return;
			bl2 = true;
			method.move(obj,{
				opacity : 0
			},{
				fn : function(){
					obj.style.display = 'none';
				}
			});
		};
		clickObj.onclick = function(){
			if(!bl2) return;
			bl2 = false;
			obj.style.display = 'block';
			method.move(obj,{
				opacity : 1
			});
		};
	}else{
		close.onclick = mark.onclick = function(){
			obj.style.display = 'none';
			obj.style.opacity = 0;
		};
		clickObj.onclick = function(){
			obj.style.display = 'block';
			obj.style.opacity = 1;
		};
	};
	
};