function jsonp(options){
	options = options || {};
	if(!options.url) return;
	options.data = options.data || {};
	options.cbName = options.cbName || 'cb';
	options.timeout = options.timeout || 0;
	var fnName = ('jsonp' + Math.random()).replace('.','');	
	window[fnName] = function(json){
		options.success && options.success(json);
		window[fnName] = null;
		head.removeChild(os);
		clearInterval(timer);
	};
	var arr = [],
		str = '';
	options.data[options.cbName] = fnName;
	for(var key in options.data){
		arr.push(key + '=' + encodeURIComponent(options.data[key]));
	};
	str = arr.join('&');
	var os = document.createElement('script'),
		head = document.getElementsByTagName('head')[0];
	os.src = options.url + '?' + str;
	head.appendChild(os);
	if(options.timeout){
		var timer = setInterval(function(){
			options.error && options.error();
			window[fnName] = function(){};
			head.removeChild(os);
			clearInterval(timer);
		},options.timeout);
	};
};