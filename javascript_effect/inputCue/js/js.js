function inputCue(id){
	var obj = document.getElementById(id),
		val = obj.value;
	obj.onfocus = function(){
		if(this.value === val) this.value = '';
		method.addClass(obj,'active');
	};
	obj.onblur = function(){
		if(this.value === ''){
			this.value = val;
			method.removeClass(obj,'active');
		};
	};
};