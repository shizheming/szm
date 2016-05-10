function foldingMenu(id){
	var obj = document.getElementById(id),
		objC = obj.children,
		pos = 0;
	objC[0].children[1].style.height = objC[0].children[1].children[0].offsetHeight * objC[0].children[1].children.length + 'px';
	method.addClass(objC[0].children[0],'active');
	for(var i = 0,len = objC.length; i < len; i++){
		(function(index){
			objC[i].children[0].onclick = function(ev){
				if(pos === index) return;
				var tSilde = this.nextElementSibling;
				method.addClass(this,'active');
				method.move(objC[pos].children[1],{
					height : 0
				});
				method.removeClass(objC[pos].children[0],'active');
				method.move(tSilde,{
					height : tSilde.children[0].offsetHeight * tSilde.children.length
				});
				pos = index;
				ev.preventDefault();
				return false;
			};
		})(i);
		
	};
};

