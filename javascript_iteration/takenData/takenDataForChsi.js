// 名称：takenDataForChsi.js
// 版本：1.0
// 时间：2016.7

// ------------------------------------------------------------

// 用法-格式
// 在学信网页面注入js代码。

(function() {
    var url = window.location;

    if (/verify\/chsi/.exec(url)) {
        // 这是我们自己的页面不抓
        return;
    }

    // 调节适配
    toMobile();

    // alert('webview加入js成功');
    // native干遮罩，我这里刷新页面会闪屏

    
    // 过滤登录页面
    if (/account.chsi.com.cn\/passport\/login/.exec(url)) {
        // 学信网登录页去掉除了登录以外任何能跳转的链接，防止用户点进去，开始抓取不必要的数据
        document.querySelector('.login_footer').style.display = 'none';
        document.querySelector('.top_right').style.display = 'none';
        document.querySelector('.btn_registered').style.display = 'none';
        // 不能隐藏的去除a链接
        document.body.innerHTML = document.body.innerHTML.replace(/href=".*?"/g, '');

        // 登录页引导文案
        ct('学信网');

        // alert('这个页面是登录页面，所以我不抓');
        return;
    }
    // 初始native请求列队间隔时间
    var initQueue = queue(100);

    // 告诉native我开始抓数据了要他把webview遮掉
    initQueue(always(reNative, ['start']));

    // 由于内页和登录页存在跨域的问题，我就不能再登录页存数据了，那只能在用户登录完以后存了
    // 判断是不是初始页
    if (/index.action/.exec(url)) {
        // 是初始页
        // 先删
        delete localStorage.bl;
        // 后存
        localStorage.bl = 1;
        // 去抓去学籍信息页
        window.location = '//my.chsi.com.cn/archive/xjarchive.action';
    } else {
        // alert('耶，这就是我要的页面，尽情的抓吧，哈哈哈哈！！');

        // 不是
        if (localStorage.bl) {
            // alert('劳资在学籍信息页面')
            // 学籍信息页面

            // 没有学籍信息的情况
            if (document.querySelector('.edTitle')) {
                initQueue(always(reNative, ['failed']));
                return;
            };


            // 处理原始数据
            var af = dataFilter(document.querySelector('table').outerHTML);
            console.log(af());
            initQueue(always(reNative, ['work', encodeURIComponent(af())]));

            // 抓完删掉
            delete localStorage.bl;
            
            // 返回当前日期信息
            var n = backDate();

            // 劳资超级讨厌写业务逻辑，烦，现在写的这他妈丑，看到if就错气

            // 要3个月个登录日志
            // 月份确定了
            var toDate = [n[0] , n[1] - 3, n[2]];
            // 不在今年
            if (n[1] - 3 == 0) {
                toDate[1] = 12;
                toDate[0] = n[0] - 1;
            }
            if (n[1] - 3 == -1) {
                toDate[1] = 11;
                toDate[0] = n[0] - 1;
                // 10月份只有30天
                if (n[2] > 30) toDate[2] = 30;
            }
            if (n[1] - 3 == -2) {
                toDate[1] = 10;
                toDate[0] = n[0] - 1;
            }
            // 在今年
            // 日子
            if (n[2] > getDays(toDate[0], toDate[1])) toDate[2] = getDays(toDate[0], toDate[1]);
            
            // 抓完登录日志
            // 防止作弊赔屏蔽
            setTimeout(function() {
                window.location = '//account.chsi.com.cn/account/queryloginlog.action?endtime=' + n[0] + '-' + n[1] + '-' + n[2] + '&starttime=' + toDate[0] + '-' + toDate[1] + '-' + toDate[2] + '&count=10000&status=-1&start=0';
            }, nm(4000, 7000));

        } else {
            // 登录日志
            // alert('欧耶，我到登录日志页面了');
            
            // 处理原始数据
            var af = dataFilter(document.querySelector('table').outerHTML);
            console.log(af());
            initQueue(always(reNative, ['work', encodeURIComponent(af())]));

            // 告诉native全部抓完了
            initQueue(always(reNative, ['finished']));
        }
    }


})();



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

// 登录页引导文案
function ct(logo) {
    var cd = document.createElement('div');
    cd.innerHTML = '请登录你的' + logo + '账号，开始' + logo + '认证<br>任我花不会保存你的账号密码，请放心认证';
    cd.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background-color:#fff;text-align:center;line-height:1.8;font-family:"Microsoft YaHei";color:#333;padding:10px;box-shadow:0 0 30px 0 #e8e8e8 inset;z-index:9999;';
    document.body.appendChild(cd);
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

// n到m之间的随机数
function nm(n,m) {
    return parseInt(n + Math.random() * (m - n));
}

// 打乱数据
function shuffle(obj) {
    var length = obj.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = nm(0, index);
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = obj[index];
    }
    return shuffled;
};

// 截取数组
function intercept(arr, num) {
    var result = [];
    for(var i = 0; i < num; i++) result[i] = arr[i];
    return result;
}

// k函数 返回一个用一次的变量
function k(val) {
    return val;
}

// always函数 存一个变量的状态
function always(val, arr) {
    return function() {
        return Array.isArray(arr) ? val.apply(null, arr) : val;
    };
}

// 封装三目
function three(a, b, c) {
    var obj = {
        a : a,
        b : b,
        c : c
    };
    function n(d) {
        return (typeof d).toLowerCase() != 'function' ? always(d) : d;
    }
    for (var key in obj) obj[key] = n(obj[key]);
    return obj.a() ? obj.b() || 1 : obj.c() || 0;
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

// 获取某个月份的天数
function getDays(year, month) {
    return new Date(year, month, 0).getDate();
}

// 返回日期信息
function backDate() {
    var n = new Date();
    return [n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getDay(), n.getHours(), n.getSeconds()]
}

// 让pc页面在手机上看得清
function toMobile() {
    var mt = document.createElement('meta');
    mt.name = 'viewport';
    mt.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    document.querySelector('head').appendChild(mt);
}





