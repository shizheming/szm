// 名称：h5native.js
// 版本：1.0
// 时间：2016.5
// ------------------------------------------------------------



// 用法-格式
/*var nh = new HN({
	title : 'xxxxx',
	nativeMethod : 'text1',
	id : 'share'
});

var nh = new HN({
	title : 'yyyyy',
	nativeMethod : 'text2',
	id : 'share2222'
});*/

var tokenManger = {
	token:'',
	validateToken:'',
	validate : function(token){
		if(this.validateToken == token){
			this.validateToken = '';
			return true;
		}
		return false;
	}
};
// tokenManger.validateToken = /token=(.+)/.exec(window.location)[1];

var token = 123456789;


// h5给native发请求函数
var HN = function(json){
	var that = this;
	var r = Math.floor(Math.random() * 10);
	tokenManger.token = r;
	// var url = 'renwohua://com.renwohua.conch/js?method=' + json.nativeMethod + '&callback=nh.show&validateToken=' + tokenManger.validateToken + '&title=' + json.title + '&token=' + tokenManger.token;
	var url = 'https://www.baidu.com';
	this.getR = function(){
		return r;
	};
	document.getElementById(json.id).addEventListener('touchstart',function(){
		that.req(url);
	},false);
}

// 发请求
HN.prototype.req = function(url){
	var ifr = document.getElementById('ifr');
	if(ifr) ifr.parentNode.removeChild(ifr);
	var div = document.createElement('div');
	var iframe = '<iframe id="iframe"></iframe>';
	div.id = 'ifr';
	// div.style.display = 'none';
	div.innerHTML = iframe;
	document.body.appendChild(div);
	document.getElementById('iframe').contentWindow.window.location = url;
}
// native回调js的函数
HN.prototype.show = function(json){
	if(tokenManger.validate(json.validateToken)){
		tokenManger.validateToken = json.token;
		console.log(1231231232);
	}else{
		console.log('非法');
		
	}
}
