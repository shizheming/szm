// 名称：takenDataForTaobaoAndJingdong.js
// 版本：2.2
// 时间：2016.7
// 更新：1. 把登录页面的注册链接去掉，防止用户点击造成抓数据顺序混乱

// ------------------------------------------------------------

// 用法-格式
// 在淘宝京东页面注入script标签。src引静态资源


(function() {

    // alert('webview加入js成功');
    // alert(localStorage);

    // native干遮罩，我这里刷新页面会闪屏

    // 判断京东还是淘宝
    var url = window.location;
    var taobao = /taobao\.com/.exec(url) ? 1 : 0;
    var jd = /jd\.com/.exec(url) ? 1 : 0;

    // 过滤登录页面
    if (/login/.exec(url)) {
        // 淘宝登录页去掉注册链接，防止用户点进去，开始抓取不必要的数据
        taobao ? document.querySelector('.other-link').style.display = 'none' : 0;
        // 京东登录页去掉注册链接，防止用户点进去，开始抓取不必要的数据
        if(jd) {
            document.querySelector('.quick-login').style.display = 'none';
            document.querySelector('.quick-nav').style.display = 'none';
        }


        // 万一用户在抓数据的半当中退出了，我要在下次重新登录页的时候销毁这2个值
        // 删除状态
        delete localStorage.bl;
        // 删除数组链接数组
        delete localStorage.a;

        // 登录页引导文案
        ct(jd ? '京东' : '淘宝');

        // alert('这个页面是登录页面，所以我不抓');

        return;
    }

    // 抓京东用户数据
    if (jd) {
        // alert('这里是京东');

        // alert(localStorage.bl);

        // 告诉native我开始抓数据了要他把webview遮掉

        reNative('start');


        if (!localStorage.bl) {

            // alert('我需要抓些列表页的链接');

            // 所有链接
            var aArr = [];

            // ajax请求的页数
            var page = 0;

            // 全部订单列表页获取最终详情页链接
            (function() {
                var t = arguments.callee;
                $.ajax({
                    type : 'get',
                    url: '//home.m.jd.com/newAllOrders/newAllOrders.json?sid=' + /sid=(.+)/.exec(window.location)[1] + '&page=' + ++page,
                    dataType : 'json',
                    success : function(json) {
                        // 没有数据后就停止请求
                        // 或只抓20条
                        if (json.orderList.length == 0) {
                            // alert('good，通过ajax我已抓到列表页所有订单的链接了，可以开始抓我想要的数据了');

                            // 通过aARR数组里面有没有抓到要链接来判断这家伙有没有订单
                            if(aArr.length == 0){
                                // alert('你妹的，啥东东都没有~');
                                setTimeout(function() {
                                    reNative('finished');
                                }, 300);
                                return;
                            }

                            // ajax请求开关
                            localStorage.bl = 1;

                            // 打乱要抓取的网页顺序，尽量模拟人的操作
                            var na = shuffle(aArr);

                            // 最多只抓20条
                            na.length > 20 ? na = intercept(na, 20) : 0;

                            // 存入本地存储
                            localStorage.a = JSON.stringify(na);

                            window.location = na[0];
                            return;
                        }

                        // 要自己拼链接地址
                        for (var i = 0,len = json.orderList.length; i < len; i++) {
                            aArr.push('//home.m.jd.com/newAllOrders/queryOrderDetailInfo.action?orderId=' + json.orderList[i].orderId + '&from=newUserAllOrderList&passKey=' + json.passKeyList[i] + '&sid=' + json.sid);
                        }

                        // 递归列队ajax请求，把她所有的列表都请求出来
                        t();
                    },
                    error : function(json) {
                        // 如果请求失败抓到多少是多少
                        // 如果是半道上挂了就开始抓页面有的订单链接
                        window.location = na[0];
                        
                    }
                });
            })();

        }else{

            // alert('我已经在抓数据了，请稍等。。。');
            if (!localStorage.a) {
                // 用户强退造成的localStorage.a为undefined
                // 删除状态
                delete localStorage.bl;
                // 关掉webview
                setTimeout(function() {
                    reNative('finished');
                }, 300);
                return;
            }

            if (JSON.parse(localStorage.a).length == 0) {

                // alert('perfect，全部完成，haha！');

                // 删除状态
                delete localStorage.bl;
                // 删除数组链接数组
                delete localStorage.a;
                // 发请求告诉native我已抓完让她关掉页面
                setTimeout(function() {
                    reNative('finished');
                }, 300);

                return;
            }

            // 处理原始数据
            var af = dataFilter();

            // alert(af);

            // native拦截confirm方法拿取数据
            // 延迟不让native接收太快而产生并发
            setTimeout(function() {
                reNative('work', encodeURIComponent(af));
            }, 200);
            var aArr = JSON.parse(localStorage.a);

            // 队列弹出
            aArr.shift();
            
            localStorage.a = JSON.stringify(aArr);

            // alert('ok，去抓下一个');

            // 防止作弊赔屏蔽

            setTimeout(function() {
                window.location = aArr[0];
            }, nm(4000, 7000));
            
        }
    }

    // 淘宝
    if (taobao) {
        
        // alert('这里是淘宝');
        // alert(localStorage.bl);

        // 告诉native我开始抓数据了要他把webview遮掉

        reNative('start');


        if (!localStorage.bl) {
            
            // alert('我需要抓些列表页的链接');

            var li = document.querySelectorAll('.order-list>li');
            // 利用dom判断下是不是需要抓的页面
            // 现在native已经帮用户登录的时候直接跳到列表页了，不需要我来判断
            /*if (!li) {
                
                alert('oh，这里不是列表页，我得去列表页，请稍等。。。');
                
                window.location = '//h5.m.taobao.com/mlapp/olist.html';
                return;
            }*/
            
            // 装链接
            var aArr = [];
            
            // 拿orderid的值来拼接链接
            for (var i = 0,len = li.length; i < len; i++) {
               
                // orderID值在class上

                str = /(\d+)/.exec(li[i].querySelector('div').className)[1];
                str = i < 9 ? str.substring(0,str.length - 1) : str.substring(0,str.length - 2);
                aArr.push('//h5.m.taobao.com/mlapp/odetail.html?bizOrderId=' + str);
            }

            // alert('good，我已抓到列表页的链接了，可以开始抓我想要的数据了');

            // 开始抓数据开关
            localStorage.bl = 1;

            // 打乱要抓取的网页顺序，尽量模拟人的操作
            var na = shuffle(aArr);

            // 最多只抓20条
            if(na.length > 20) na = intercept(na, 20);

            localStorage.a = JSON.stringify(na);
            window.location = na[0];

        }else{

            // alert('我已经在抓数据了，请稍等。。。');
            if (!localStorage.a) {
                // 用户强退造成的localStorage.a为undefined
                // 删除状态
                delete localStorage.bl;
                // 关掉webview
                setTimeout(function() {
                    reNative('finished');
                }, 300);
                return;
            }

            if (JSON.parse(localStorage.a).length == 1) {

                // alert('perfect，全部完成，haha！');

                // 删除状态
                delete localStorage.bl;
                // 删除数组链接数组
                delete localStorage.a;
                // 发请求告诉native我已抓完让她关掉页面
                setTimeout(function() {
                    reNative('finished');
                }, 300);
                return;
            }

            var af = dataFilter();

            // alert(af);

            // native拦截confirm方法拿取数据
            // 延迟不让native接收太快而产生并发
            setTimeout(function() {
                reNative('work', encodeURIComponent(af));
            }, 200);

            var aArr = JSON.parse(localStorage.a);

            // 队列弹出
            aArr.shift();
            
            localStorage.a = JSON.stringify(aArr);

            // alert('ok，去抓下一个');

            // 防止作弊赔屏蔽
            setTimeout(function() {
                window.location = aArr[0];
            }, nm(4000, 7000));
        }
    }

})();

// native请求
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

// 拿到的数据过处理下
// 删除js，css，img标签，然后在删除剩余标签中的所有属性，除了留下id和class
function dataFilter() {

    var oldTxt = document.body.innerHTML;

    // alert('本页的原始已经抓到，需要处理下，请稍等。。。');

    // 把script标签里面的代码缩成一行，不让是匹配不到script标签的
    oldTxt = oldTxt.replace(/<script.*?>(?:(?:\s+.+)+|(?:.+\s+)+)<\/script>/g, '');

    // 替换工作
    function rep(txt,rep1,rt,n) {
        // 需要替换几处
        var str = '';
        for(var i = 0; i < n; i++) str += '$' + i + ' ';

        rt = rt || str;
        return txt.replace(rep1, rt);
    }

    var arr = [
        // 干掉js
        /<script.*?>.{0,}?<\/script>/g,
        // 干掉style
        /<style.*?>.{0,}?<\/style>/g,
        // 干掉img
        /<img.{0,}?>/g
    ]

    // for循环函数
    function f(obj, fn) {
        for (var i = 0, len = obj.length; i < len; i++) fn(obj[i]);
    }

    f(arr, function(that) {
        oldTxt = rep(oldTxt, that, '');
    });

    // 去除标签之间的空格
    oldTxt = oldTxt.replace(/>\s+?</g, '><');

    // 除去换行
    oldTxt = oldTxt.replace(/\n/g, '');

    // 除去标签与文字之间的空格
    oldTxt = oldTxt.replace(/(>)\s+(\S)/g, '$1 $2');
    oldTxt = oldTxt.replace(/(\S)\s+(<)/g, '$1 $2');

    // 去掉注释
    oldTxt = oldTxt.replace(/<!--.+?-->/g, '');
    
    // 去掉input标签
    oldTxt = oldTxt.replace(/<input.+?>/g, '');

    // 去除空标签
    // 1次
    oldTxt = oldTxt.replace(/<[^\/<>]+?><\/[^<>]+?>/g, '');
    // 2次
    oldTxt = oldTxt.replace(/<[^\/<>]+?><\/[^<>]+?>/g, '');
    // 3次
    oldTxt = oldTxt.replace(/<[^\/<>]+?><\/[^<>]+?>/g, '');


    // console.log(oldTxt);


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

}

// 登录页引导文案
function ct(logo) {
    var cd = document.createElement('div');
    cd.innerHTML = '请登录你的' + logo + '账号，开始' + logo + '认证<br>任我花不会保存你的账号密码，请放心认证';
    cd.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background-color:#fff;text-align:center;line-height:1.8;font-family:"Microsoft YaHei";color:#333;padding:10px;box-shadow:0 0 30px 0 #e8e8e8 inset;z-index:9999;';
    document.body.appendChild(cd);
}

// n到m之间的随机数
function nm(n,m){
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