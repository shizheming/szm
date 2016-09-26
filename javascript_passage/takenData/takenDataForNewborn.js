// // 名称：takenDataForNewborn.js
// 版本：1.0
// 时间：2016.8

// ------------------------------------------------------------

// 用法-格式
// 在新生页面注入js代码。

(function() {
	

	
	// 过滤新生选择地区页面不运行
	if (/freshman/.exec(window.location)) {
		// alert('我在新生通道入口，不注入js');
		return;
	}

	if (/provinceSelect/.exec(window.location)) return;

	toMobile();
	// alert('oye,进来了');
	

	var initQueue = queue(100);

	// 数据带上url
	var y = '<div id="gkurl">' + window.location.href + '</div>';

	// 确认按钮
	an(function() {
		initQueue(always(reNative, ['work', encodeURIComponent(y + dataFilter()())]));
		// alert('完成认证');
		initQueue(always(reNative, ['finished']));
	});

	// 拿到的数据过处理下
	// 删除js，css，img标签，然后在删除剩余标签中的所有属性，除了留下id和class
	function dataFilter(txt) {

	    var oldTxt = txt || document.body.innerHTML;

	    // alert('本页的原始已经抓到，需要处理下，请稍等。。。');
	    return function() {
	        var arr = [
	            // 把script标签里面的代码缩成一行，否则是匹配不到script标签的
	            // 学信网居然下面那个没有空格的能匹配到，我也是醉了
	            // /<script.*?>(?:(?:.*?\s*?)+|(?:\s*?.*?)+)<\/script>/g,
	            // 干掉js
	            /<script.*?>.{0,}?<\/script>/g,
	            // 干掉style
	            /<style.*?>.{0,}?<\/style>/g,
	            // 干掉img
	            // 学信网要留img要用户的照片
	            // /<img.{0,}?>/g,
	            // 除去换行
	            /\n/g,
	            // 去掉注释
	            /<!--.+?-->/g,
	            // 去掉input标签
	            /<input.+?>/g,
	            // 去除空标签
	            // 1次
	            /<[^\/<>]+?><\/[^<>]+?>/g,
	            // 2次
	            /<[^\/<>]+?><\/[^<>]+?>/g,
	            // 3次
	            /<[^\/<>]+?><\/[^<>]+?>/g
	        ];

	        var arr2 = [
	            // 除去标签与文字之间的空格的2中情况
	            /(>)\s+(\S)/g,
	            /(\S)\s+(<)/g
	        ];




	        // 初始替换内容为空格
	        var ir1 = initRep('');
	        // 初始替换内容为><
	        var ir2 = initRep('><');
	        // 初始替换内容为$1 $2
	        var ir3 = initRep('$1 $2');

	        // for循环函数
	        function f(obj, fn) {
	            for (var i = 0, len = obj.length; i < len; i++) fn(obj[i]);
	        }

	        f(arr, function(that) {
	            oldTxt = ir1(that, oldTxt);
	        });
	        // 学信网的script里面的东西匹配起来有点奇怪，上面那次匹配居燃把js缩成一行了，并没有干掉，真他妈奇葩，所以又干了一次才把js干掉
	        f(arr, function(that) {
	            oldTxt = ir1(that, oldTxt);
	        });

	        f(arr2, function(that) {
	            oldTxt = ir3(that, oldTxt);
	        });

	        // 去除标签之间的空格
	        oldTxt = oldTxt.replace(/>\s+?</g, '><');



	        // 干掉存在class不存在id情况下的以外的属性
	        var re = /.*?class.*?>/g;
	        var rs;
	        var aa = '';
	        //剩余的结尾标签
	        // 标记最后的位置，之后需要切
	        var nn = 0;
	        while ((rs = re.exec(oldTxt)) != null) {
	            // console.log(rs[0]);
	            !/\sid/.exec(rs[0]) ? aa += rs[0].replace(/(<\w+)\s[^>]*?(?!>)(class=".*?").*?(>)/, '$1 $2 $3') : aa += rs[0];
	            nn = re.lastIndex;
	            /*console.log('start' + rs.index);
	            console.log('end' + re.lastIndex);*/
	        }

	        aa += oldTxt.substring(nn);


	        // 干掉没有class没有id情况下的以外的属性
	        var re2 = /<[^<>]+?>(?:(?=<)|.*?(?=<))/g;
	        var rs2;
	        var aa2 = '';
	        var nn2 = 0;
	        while ((rs2 = re2.exec(aa)) != null) {
	            // console.log(rs2[0]);
	            !/<\w+(?=\s).*(?=\sclass)|<\w+(?=\s).*(?=\sid)/.exec(rs2[0]) ? aa2 += rs2[0].replace(/(<\w+)\s.*(>)/, '$1 $2') : aa2 += rs2[0];
	            nn2 = re2.lastIndex;
	        }

	        // alert('已完成原始数据过滤');

	        aa2 += oldTxt.substring(nn2);

	        return aa2;

	    };
	}


	// 让pc页面在手机上看得清
	function toMobile() {
	    var mt = document.createElement('meta');
	    mt.name = 'viewport';
	    mt.content = 'width=device-width, initial-scale=1, maximum-scale=1';
	    document.querySelector('head').appendChild(mt);
	}

	// 页面上添加确认认证按钮
	function an(callback) {
		var t1 = document.createElement('div');
		t1.innerHTML = '请登陆您的录取结果页面点击确认认证进行新生认证！';
		document.body.appendChild(t1);
		t1.style.cssText = 'top:0;left:0;box-shadow:0 0 2px 2px #000;background-color:#f73e3e;color:#fff;border:1px solid #fff;line-heigth:20px;width:100%;text-align:center;font-size:14px;position:absolute;'

		var div = document.createElement('div');
		div.innerHTML = '确认认证';
		document.body.appendChild(div);
		div.style.cssText = 'top:20px;left:0;box-shadow:0 0 2px 2px #000;background-color:#f73e3e;color:#fff;border:1px solid #fff;line-heigth:30px;width:100px;text-align:center;font-size:22px;position:absolute;z-index:100;'
		window.onscroll = function() {
			div.style.cssText = 'top:' + ((document.body.scrollTop || document.documentElement.scrollTop) + 20) + 'px;left:' + (document.body.scrollLeft || document.documentElement.scrollLeft) + 'px;box-shadow:0 0 2px 2px #000;background-color:#f73e3e;color:#fff;border:1px solid #fff;line-heigth:30px;width:100px;text-align:center;font-size:22px;position:absolute;z-index:100;';
			t1.style.cssText = 'top:' + (document.body.scrollTop || document.documentElement.scrollTop) + 'px;left:' + (document.body.scrollLeft || document.documentElement.scrollLeft) + 'px;box-shadow:0 0 2px 2px #000;background-color:#f73e3e;color:#fff;border:1px solid #fff;line-heigth:30px;width:100%;text-align:center;font-size:14px;position:absolute;';
		};
		div.addEventListener('touchstart', callback, false);
	}

	// 纯净版native请求
	function reNative(act, data) {
	    var ifr = document.getElementById('ifr');
	    if(ifr) ifr.parentNode.removeChild(ifr);
	    var div = document.createElement('div');
	    var iframe = '<iframe id="iframe"></iframe>';
	    div.id = 'ifr';
	    div.style.display = 'none';
	    div.innerHTML = iframe;
	    document.body.appendChild(div);
	    data = data ? '?data=' + data : '';
	    document.getElementById('iframe').contentWindow.window.location = 'js://com.renwohua.conch/crawler/' + act + data;
	}

	// 配置初始替换内容
	function initRep(txt) {
	    return function(rex, str) {
	        return str.replace(rex, txt);
	    };
	}

	// 简陋的列队
	function queue(time) {
	    return (function(arr, t) {
	        return function(fn) {
	            arr.push(fn);
	            setTimeout(function() {
	                arr[0]();
	                arr.shift();
	            }, ++t * time);
	        }
	    })([], 0);
	}

	// always函数 存一个变量的状态
	function always(val, arr) {
	    return function() {
	        return Array.isArray(arr) ? val.apply(null, arr) : val;
	    };
	}

})();