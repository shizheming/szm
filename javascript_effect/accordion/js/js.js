function accordion(id){
	var obj = document.getElementById(id),
		objC = obj.children,
		imgW = objC[0].offsetWidth,
		titleW = objC[0].children[0].offsetWidth;
	for(var i = 1,len = objC.length; i < len; i++){
		objC[i].children[0].style.backgroundColor = method.randomColor();
		objC[i].style.left = (i - 1) * titleW + imgW + 'px';
	};
	for(var i = 0; i < len; i++){
		(function(index){
			objC[i].children[0].onmouseover = function(){
				for(var i = 0; i < len; i++){
					i <= index ? method.move(objC[i],{
						left : i * titleW
					},{
						time : 1000
					}) : method.move(objC[i],{
						left : (i - 1) * titleW + imgW
					},{
						time : 1000
					});
				};
			};
		})(i);
	};
};
