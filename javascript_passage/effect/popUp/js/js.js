function popUp(id, fn){
	var obj = document.getElementById(id);
	var close = obj.querySelector('.close');
	var mark = obj.querySelector('.mark');
	var ys = obj.querySelector('.ys');
	obj.classList.add('mm');
	ys.onclick = function(){
		obj.classList.remove('mm');
		fn && fn();
	};
	mark.onclick = function(){
		obj.classList.remove('mm');
		fn && fn();
	};
};