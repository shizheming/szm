function initSubmit(id){
	var obj = document.getElementById(id),
		cDiv = document.createElement('div'),
		cDivT = document.createTextNode('提交');
	cDiv.className = 'mySubmit';
	cDiv.appendChild(cDivT);
	cDiv.onclick = function(){
		obj.click();
	};
	obj.parentNode.appendChild(cDiv);
};