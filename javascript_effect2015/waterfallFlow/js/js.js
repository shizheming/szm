function waterfallFlow(id){
	var obj = document.getElementById(id),
		objC = obj.children,
		arr = [];

	for(var i = 0,len = objC.length; i < len; i++){
		arr.push(objC[i]);
	};
	createLi()
	function createLi(){
		for(var i = 0; i < 20; i++){
			var li = document.createElement('li');
			li.style.height = Math.random() * 100 + 250 + 'px';
			li.innerHTML = i;
			arr.sort(function(ul1,ul2){
				return ul1.offsetHeight - ul2.offsetHeight;
			});
			arr[0].appendChild(li);
		};
	};
	window.onscroll = function(){
		if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight){
			createLi();
		};
	};
};























// function waterfallFlow(id){
// 	var obj = document.getElementById(id),
// 		objC = obj.children,
// 		cdf = document.createDocumentFragment();
// 	for(var i = 0; i < 20; i++){
// 		var cd = document.createElement('div');
// 		cdf.appendChild(cd);
// 		var divH = Math.random() * 100 + 200;
// 		cd.style.height = divH + 'px';
// 		cd.style.left = i % 4 * 320 + 'px';
// 	};
// 	obj.appendChild(cdf);
// 	for(var i = 0; i < 20; i++){
// 		if(i > 3){
// 			objC[i].style.top = parseInt(objC[i - 4].style.height) + objC[i - 4].offsetTop + 'px';
// 		};
		
// 	};
// };