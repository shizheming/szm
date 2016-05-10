function picDelayLoading(){
	window.onresize = window.onscroll = window.onload = function(){
		var img = document.images,
			clH = document.documentElement.clientHeight;
		for(var i = 0,len = img.length; i < len; i++){
			if(img[i].offsetTop < (document.documentElement.scrollTop || document.body.scrollTop) + clH){
				if(img[i].getAttribute('_src')){
					img[i].src = img[i].getAttribute('_src');
					img[i].removeAttribute('_src');
					// 这样为什么不能干掉这个函数
					// picDelayLoading = null;
				};
			};
		};
	};
};