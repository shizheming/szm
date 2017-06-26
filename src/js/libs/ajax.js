// 名称：ajax.js
// 版本：1.0
// 时间：2015.7
// ------------------------------------------------------------

// ajax
function ajax(options){
	options = options || {};
	if(!options.url) return;
	options.data = options.data || {};
	options.type = options.type || 'get';
	options.timeout = options.timeout || 0;
	var arr = [],
		str = '';
	options.data.t = Math.random();
	for(var key in options.data){
		arr.push(key + '=' + encodeURIComponent(options.data[key]));
	};
	str = arr.join('&');
	var xhr = new XMLHttpRequest();
	switch(options.type){
		case 'get' :
		xhr.open('get',options.url + '?' + str,true);
		xhr.send();
		break;
		case 'post' :
		xhr.open('post',options.url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(str);
		break;
	};
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			clearInterval(timer);
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
				options.success && options.success(xhr.responseText);
			}else{
				options.error && options.error(xhr.status);
			};
		};
	};
	if(options.timeout){
		var timer = setTimeout(function(){
			xhr.abort();
			clearTimeout(timer);
		},options.timeout);
	};
}