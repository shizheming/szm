function initSelect(id,name){
	var obj = document.getElementById(id),
		sel = document.getElementsByName(name)[0],
		mySel = document.createElement('div'),
		cSpan = document.createElement('span'),
		cSpanT = document.createTextNode(sel.value),
		cUl = document.createElement('ul');
	cSpan.appendChild(cSpanT);
	mySel.appendChild(cSpan);
	mySel.className = 'mySelect';
	cSpan.onclick = function(ev){
		cUl.style.display = 'block';
		ev.stopPropagation();
	};
	// document要绑一下，如果用属性的话会被后面的事件覆盖
	document.addEventListener('click',function(){
		cUl.style.display = 'none';
	},false);
	for(var i = 0,len = sel.options.length; i < len; i++){
		var cLi = document.createElement('li'),
			cLiT = document.createTextNode(sel.options[i].text);
		(function(index){
			cLi.onclick = function(){
				cSpan.childNodes[0].nodeValue = this.childNodes[0].nodeValue;
				sel.selectedIndex = index;
				cUl.style.display = 'none';
			};
		})(i);
		cLi.appendChild(cLiT);
		cUl.appendChild(cLi);
		mySel.appendChild(cUl);
	};
	obj.appendChild(mySel);
};