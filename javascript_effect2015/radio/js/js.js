function initRadio(id,name){
	var obj = document.getElementById(id),
		ipt = document.getElementsByName(name),
		myRadio = obj.getElementsByClassName('myRadio');
	for(var i = 0,len = ipt.length; i < len; i++){
		var ca = document.createElement('a');
		ca.className = 'myRadio';
		ca.href = '';
		(function(index){
			ca.onclick = function(ev){
				for(var i = 0,len = myRadio.length; i < len; i++){
					method.removeClass(myRadio[i],'active');
				};
				method.addClass(this,'active')
				ipt[index].checked = true;
				ev.preventDefault();
			};
		})(i);
		obj.insertBefore(ca,ipt[i]);
	};
};