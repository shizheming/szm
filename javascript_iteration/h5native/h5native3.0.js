// 名称：h5native.js
// 版本：3.0
// 时间：2016.5
// 更新内容：把原来的面向对象写法改为函数式写法，要带给native的参数都通过外面传进来
// ------------------------------------------------------------


// 用法-格式
/*HN({
    method : 'auth',
    callback : 'HN.show',
    validateToken : /token=(.+)/.exec(window.location) ? /token=(.+)/.exec(window.location)[1] : '',
    token : Math.floor(Math.random() * 10),
    show : function(){
    	// 添加我的邀请按钮
    	...
    }
});*/


// 公用方法
var method = {
	// 0-9的随机数
	createRandom : function(){
		return Math.floor(Math.random() * 10);
	},
	// 验证
	validateThing : function(val,lav){
		if(val == lav) return true;else false;
	},
	// 拼接url
	mosaicURL : function(attr,changeJson){
		var result = 'renwohua://com.renwohua.conch/js?';
		if(changeJson != undefined) attr = method.changeVal(attr,changeJson);
		for(var key in attr){
			if((typeof attr[key]).toLowerCase() == 'object' || (typeof attr[key]).toLowerCase() == 'function') continue;
			result += key + '=' + encodeURI(attr[key]) + '&';
		}

		return result.substring(0,result.length - 1);
	},
	// 需要变化的值
	changeVal : function(attr,changeJson){
		var result = {};
		for(var key in attr){
			result[key] = attr[key];
			for(var key2 in changeJson) if(key == key2) result[key] = changeJson[key2];
		}
		return result;
	},
	// 发请求
	req : function(url){
		console.log(url);
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
};


// 管理数据
// 管理类似token的数据
var likeTokenManger = {};

/*{
	validateToken : 12,
	token : 456
}*/


// 开关
var bl = true;

// 接json
var j;

// h5给native发请求函数
window.HN = function(json){
	// 回调函数
	window.HN.show = function(nativeJson){
		// 设置ajax请求头
	    $.ajaxSettings.beforeSend = function(xhr, settings) {
			xhr.setRequestHeader('Authorization', nativeJson.data.authorization);
			xhr.setRequestHeader('Version',       nativeJson.data.version);
			xhr.setRequestHeader('Gis-Lat',       nativeJson.data.gis_lat);
			xhr.setRequestHeader('Gis-Lng',       nativeJson.data.gis_lng);
	    };

	    console.log('nativeJson.validateToken=' + nativeJson.validateToken + 'nativeJson.token=' + nativeJson.token + 'likeTokenManger.validateToken=' + likeTokenManger.validateToken + 'likeTokenManger.token=' + likeTokenManger.token);

		// 验证我的token与native的token保持一致
		if(method.validateThing(likeTokenManger.token,nativeJson.validateToken)){
			// 创建随机token传给native，用来炼式请求
			likeTokenManger.validateToken = nativeJson.token;
			json.show && json.show(nativeJson);
			console.log('ok');
		}else{
			// 验证token错误
			console.log('验证token错误');
			
		}

	};

	// 发请求
	// 第一次用传给我的url参数，第二次开始就用我自己创建的值了
	if(!bl){
		likeTokenManger.token = method.createRandom();
		method.req(method.mosaicURL(json,likeTokenManger));
	}else{
		// 第一次是获取传进来的参数值，
		likeTokenManger.token = json.token;
		likeTokenManger.validateToken = json.validateToken;
		method.req(method.mosaicURL(json));
	}
	bl = false;

};


