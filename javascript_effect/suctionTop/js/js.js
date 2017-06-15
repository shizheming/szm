function suctionTop(id){
	var obj = document.getElementById(id),
		objC = obj.children[0],
		objT = obj.offsetTop;
	window.onscroll = function(){
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		objT <= scrollT ? method.addClass(objC,'fixed') : method.removeClass(objC,'fixed');
	};
};