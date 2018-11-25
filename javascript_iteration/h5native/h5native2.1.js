// 名称：h5native.js
// 版本：2.1
// 时间：2016.5
// 更新内容：增加ajax请求头
// ------------------------------------------------------------

// 用法-格式
/*var nh = new HN({
	title : 'xxxxx',
	nativeMethod : 'text1',
	id : 'share',
	callback:'nh.show'
});

var nht = new HN({
	title : 'yyyyy',
	nativeMethod : 'text2',
	id : 'share2222',
	callback:'nht.show'
});*/

if(!/token=(.+)/.exec(window.location)) console.log('请传给我token');

// 管理数据
// 管理token
var tokenManger = {
	token:'',
	validateToken:'',
	create : function(){
		this.token = Math.floor(Math.random() * 10);
		return this.token;
	},
	validate : function(token){
		console.log('val:'+token);
		console.log('val:'+this.token);
		if(this.token == token){
			this.token = '';
			return true;
		}
		return false;
	}
};
tokenManger.validateToken = /token=(.+)/.exec(window.location)[1];


// h5给native发请求函数
window.HN = (function(){
	
	// 绑定事件
	// 触发绑定事件的时候native回调早就完成了，管理的token值已经改变

	function DK(json){
		var dom = json.id ? '#' + json.id : 'body';
		json.callback = json.callback || '';
		json.addAttr = json.addAttr || {};
		var that = this;
		var url = 'renwohua://com.renwohua.conch/js?method=' + json.nativeMethod + '&callback=' + json.callback + '&validateToken=' + tokenManger.validateToken + '&' + json.addAttr.title + '=' + json.addAttr.content + '&token=' + tokenManger.create();
		that.req(url);
		// document.querySelector(dom).addEventListener('click',window.bd,false);
	}

	// 发请求
	DK.prototype.req = function(url){
		var ifr = document.getElementById('ifr');
		if(ifr) ifr.parentNode.removeChild(ifr);
		var div = document.createElement('div');
		var iframe = '<iframe id="iframe"></iframe>';
		div.id = 'ifr';
		div.style.display = 'none';
		div.innerHTML = iframe;
		document.body.appendChild(div);
		document.getElementById('iframe').contentWindow.window.location = url;
	}

	// native回调js的函数
	DK.prototype.show = function(nativeJson){
		if(tokenManger.validate(nativeJson.validateToken)){
			// 设置ajax请求头
	        $.ajaxSettings.beforeSend = function(xhr, settings) {
				xhr.setRequestHeader('Authorization', nativeJson.data.authorization);
				xhr.setRequestHeader('Version',       nativeJson.data.version);
				xhr.setRequestHeader('Gis-Lat',       nativeJson.data.gis_lat);
				xhr.setRequestHeader('Gis-Lng',       nativeJson.data.gis_lng);
	        };  
        
			tokenManger.validateToken = nativeJson.token;
			console.log('ok');

		}else{
			console.log('非法');
			
		}
	};
	
	return DK;

})();






// native回调js的函数
DK.prototype.show = function(nativeJson){
	if(tokenManger.validate(nativeJson.validateToken)){
		tokenManger.validateToken = nativeJson.token;
		console.log('ok');
	}else{
		console.log('非法');
		
	}
}


