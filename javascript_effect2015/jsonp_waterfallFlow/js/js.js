function waterfallFlow(id){
	var obj = document.getElementById(id),
		objC = obj.children,
		arr = [],
		page = 0,
		ready = true;
	for(var i = 0,len = objC.length; i < len; i++){
		arr.push(objC[i]);
	};
	flow();
	window.onscroll = function(){
		if((document.documentElement.scrollTop || document.body.scrollTop) >= document.body.scrollHeight - document.documentElement.clientHeight) flow();
	};

	function flow(){
		if(!ready) return;
		ready = false;
		jsonp({
			url : 'http://demo.zhinengshe.com:8001/meilishuo',
			data : {
				page : page++,
				key : '口红'
			},
			cbName : 'call',
			success : function(json){
				var data = json.goods.tInfo;
				for(var i = 0,len = data.length; i < len; i++){
					var li = document.createElement('li'),
						count = 0;
					li.innerHTML = '<img src="http:\/\/d03.res.meilishuo.net'+data[i].n_pic_file+'">';
					li.style.height = data[i].img_o_height/data[i]. img_o_width*298 + "px";
					li.children[0].onload = function(){
						if(++count === len) ready = true;
					};
					arr.sort(function(ul1,ul2){
						return ul1.offsetHeight - ul2.offsetHeight;
					});
					arr[0].appendChild(li);
				};
			},
		});
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