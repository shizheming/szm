function appleMenu(id){
	var obj = document.getElementById(id),
		objC = obj.children;
		document.onmousemove = function(ev){
			for(var i = 0,len = objC.length; i < len; i++){
				var imgLeft = objC[i].offsetLeft + obj.offsetLeft + objC[i].offsetWidth / 2,
					imgTop = objC[i].offsetTop + obj.offsetTop + objC[i].offsetHeight / 2,
					triangleEdgeX = ev.clientX - imgLeft,
					triangleEdgeY = ev.clientY - imgTop,
					triangleHypotenuse = Math.sqrt(triangleEdgeX * triangleEdgeX + triangleEdgeY * triangleEdgeY),
					scale = 1 - triangleHypotenuse / 300;
				if(scale < .5) scale = .5;
				objC[i].style.width = 105 * scale + 'px';
			};
		};
};