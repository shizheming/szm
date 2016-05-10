function initCheckBox(id,name){
	var obj = document.getElementById(id),
		ipt = document.getElementsByName(name),
		myCheckBox = obj.getElementsByClassName('myCheckBox');
	for(var i = 0,len = ipt.length; i < len; i++){
		var ca = document.createElement('a');
		ca.className = 'myCheckBox';
		ca.href = '';
		(function(index){
			ca.onclick = function(ev){
				if(this.className.indexOf('active') + 1){
					method.removeClass(this,'active');
					ipt[index].checked = false;
				}else{
					method.addClass(this,'active');
					ipt[index].checked = true;
				};
				ev.preventDefault();
			};
		})(i);
		obj.insertBefore(ca,ipt[i]);
	};
};