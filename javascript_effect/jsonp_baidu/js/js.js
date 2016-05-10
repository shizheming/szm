function baiduSearch(id){
	var obj = document.getElementById(id),
		ipt = obj.children[0],
		ul = obj.children[1],
		cdf = document.createDocumentFragment(),
		oldV = '',
		now = 0;
	ul.onclick = function(ev){
		var tarV = ev.target.innerHTML;
		ipt.value = tarV;
		ev.stopPropagation();
		ul.style.display = 'none';
		window.open('https://www.baidu.com/s?wd=' + tarV);
	};
	ipt.onclick = function(ev){
		ev.stopPropagation();
	};
	ipt.onkeydown = function(ev){
		var keyC = ev.keyCode;
		if(keyC === 38){
			var len = ul.children.length;			
			now--;
			if(now === -1) now = len - 1;
			ipt.value = ul.children[now].innerHTML;	
			for(var i = 0; i < len; i++){
				ul.children[i].style.backgroundColor = '#fff';
			};
			ul.children[now].style.backgroundColor = '#ccc';
		};
		if(keyC === 40){
			var len = ul.children.length;
			now++;
			if(now === len) now = 0;
		
			ipt.value = ul.children[now].innerHTML;	
			for(var i = 0; i < len; i++){
				ul.children[i].style.backgroundColor = '#fff';
			};
			ul.children[now].style.backgroundColor = '#ccc';
		};
	};
	ipt.onkeyup = function(ev){
		var keyC = ev.keyCode;
		if(!this.value){
			ul.style.display = 'none';
			ul.innerHTML = '';
			return;
		};
		oldV = this.value;
		if(keyC === 38 || keyC === 40) return;
		if(keyC === 13){
			window.open('https://www.baidu.com/s?wd=' + oldV);
			return;
		};
		baidu(oldV);
		ul.style.display = 'block';
	};
	ipt.onfocus = function(){
		if(!this.value) return;
		if(ul.innerHTML) ul.style.display = 'block';
		baidu(oldV);
	};
	document.onclick = function(){
		ul.style.display = 'none';		
	};
	function baidu(oldV){
		jsonp({
			url : 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
			data : {
				wd : oldV
			},
			success : function(json){
				ul.innerHTML = '';
				for(var i = 0,len = json.s.length; i < len; i++){
					var li = document.createElement('li');
					li.innerHTML = json.s[i];
					cdf.appendChild(li);
				};
				ul.appendChild(cdf);
			}
		});
	};
};