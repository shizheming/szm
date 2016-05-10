function suctionTop(id){
	var obj = document.getElementById(id);
	var con = document.getElementById('con');
	var objT = obj.offsetTop;
	var bodyH = document.body.scrollHeight;
	var conH = parseInt(getComputedStyle(con).height);
	var objH = parseInt(getComputedStyle(obj).height);
	var conT = con.offsetTop;
	var conBtm = conT + conH;
	var objMt = conH - objH;
	if(objMt < 0) return;
	window.onresize = window.onscroll = function(){
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		var objBtm = scrollT + objH;
		if((scrollT > objT)){
			method.addClass(obj,'fixed');
			if(objBtm < conBtm) obj.style.marginTop = 0;
		};
		if((scrollT < objT) || (objBtm > conBtm)){
			method.removeClass(obj,'fixed');
			if(objBtm > conBtm) obj.style.marginTop = objMt + 'px';
		};
	};
};









// function suctionTop(id){
// 	if(navigator.userAgent.indexOf("MSIE 8.0")>0) return;
// 	var obj = document.getElementById(id);
// 	var objT = obj.offsetTop;
// 	var objH = parseInt(getComputedStyle(obj,false).height);
// 	var con = document.getElementById('con');
// 	window.onscroll = window.onresize = function(){
// 		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
// 		var scrollH = document.body.scrollHeight;//因为内容会变得
// 		var conH = parseInt(getComputedStyle(con,false).height);
// 		var conZh = conH + con.offsetTop;
// 		var conDh = document.body.scrollHeight - conZh;
// 		if(objH > conH) return;//ie
// 		// objT <= scrollT ? method.addClass(obj,'fixed') : method.removeClass(obj,'fixed');
// 		// (objT <= scrollT) && 
// 		if((objT <= scrollT) && (scrollH - scrollT - objH >= conDh)){
// 			obj.style.marginTop = 0;
// 			// obj.style.top = 0;
// 			method.addClass(obj,'fixed');
// 		}else{
// 			method.removeClass(obj,'fixed');
// 			if(objT < scrollT){
// 				// obj.style.marginTop = 'relative';
// 				obj.style.marginTop = conH - objH + 'px';
// 			};
// 		}
// 		// console.log(objT < scrollT,scrollH - scrollT - objH > conDh)
// 		// (scrollH - (scrollT + objH)) >= conDh ? obj.style.position = 'fixed' : obj.style.position = '';
// 	};
// };
