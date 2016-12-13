// 名称：takenTbSDK.js
// 版本：1.0
// 时间：2016.11
// 更新：1. 动态加载js
//       2. 淘宝添加了图片和短信验证码机制，我这里需要排除验证页面不注入
// ------------------------------------------------------------

// 用法-格式
(function() {

    loadJs('//rwhstorage-pub.oss-cn-shanghai.aliyuncs.com/dist/js/jsBridge.min.js', function() {

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


            // 万一用户在抓数据的半当中退出了，我要在下次重新登录页的时候销毁这个值
            // 删除数组链接数组
            delete localStorage.a;

            // 登录页引导文案
            ct(jd ? '京东' : '淘宝');

            // alert('这个页面是登录页面，所以我不抓');

            return;
        }

        // 过滤验证码
        if (/passport.taobao.com\/iv/.exec(url)) {

            return;
        }
        // config初始化
        var user = new JsBridge({
            success : function(data) {
                // alert('config初始化成功');
            },
            error : function(val) {
                // alert('config初始化失败');
            }
        });


        // 我挂了native主动调我
        JsBridge.forResult.getUploadParams = function() {
            user.server({
                data : '/credit/setTaobao',
                success : function (res) {
                    // 添加成功
                    // alert('上传服务端成功');
                    // 告诉native已经完成
                    // 成功失败由服务端返回
                    user.mask({
                        data : {
                            //标题
                            title:'认证成功',
                            //认证失败提示
                            tips: ['认证成功'],
                            //点击按钮跳转地址
                            action:'js://com.renwohua.conch/closeWindow',
                            //按钮文案
                            text:'返回' 
                        }
                    });
                },
                error : function (res) { 
                    user.mask({
                        data : {
                            //标题
                            title:'认证失败',
                            //认证失败提示
                            tips: ['认证失败'],
                            //点击按钮跳转地址
                            action:'js://com.renwohua.conch/closeWindow',
                            //按钮文案
                            text:'返回' 
                        }
                    });
                   // 添加失败
                   // alert('上传服务端失败');
                }
            });
        };

        // 告诉native我开始抓数据了要他把webview遮掉
        user.mask({
            data : {
                //标题
                title:'认证中',
                //认证失败提示
                tips: ['请保留在本页，大约需要120秒~']
            }
        });


        // 淘宝
        if (taobao) {

            
        // alert('遮罩');
            setTimeout(function() {
                // 这是列表页
                if (document.querySelectorAll('.order-list>li').length > 2) {
                    // alert(localStorage.a);
                    // alert(window.location);

                    var listA;
                    if (!localStorage.a) {
                        var aArr = [1, 2, 3, 4, 5];

                        // 打乱要抓取的网页顺序，尽量模拟人的操作
                        listA = shuffle(aArr);

                        // 最多只抓5条
                        // if(listA.length > 5) listA = intercept(listA, 5);

                        localStorage.a = JSON.stringify(listA);
                    } else {

                        listA = JSON.parse(localStorage.a);
                        // 挂了就停掉
                        if (listA.length == 0) {
                            // 删除数组链接数组
                            delete localStorage.a;

                            // 告诉native已经完成
                            user.server({
                                data : '/credit/setTaobao',
                                success : function (res) {
                                    // 添加成功
                                    // alert('上传服务端成功');
                                    // 告诉native已经完成
                                    // 成功失败由服务端返回
                                    user.mask({
                                        data : {
                                            //标题
                                            title:'认证成功',
                                            //认证失败提示
                                            tips: ['认证成功'],
                                            //点击按钮跳转地址
                                            action:'js://com.renwohua.conch/closeWindow',
                                            //按钮文案
                                            text:'返回' 
                                        }
                                    });
                                },
                                error : function (res) { 
                                    user.mask({
                                        data : {
                                            //标题
                                            title:'认证失败',
                                            //认证失败提示
                                            tips: ['认证失败'],
                                            //点击按钮跳转地址
                                            action:'js://com.renwohua.conch/closeWindow',
                                            //按钮文案
                                            text:'返回' 
                                        }
                                    });
                                   // 添加失败
                                   // alert('上传服务端失败');
                                }
                            });
                        };
                    }

                    // 点吧淘宝刷不了
                    setTimeout(function() {
                        // 我在列表页点商品进入商品详情页
                        if (document.querySelector('.order-list>li:nth-of-type(' + listA[0] + ') h3')) document.querySelector('.order-list>li:nth-of-type(' + listA[0] + ') h3').click(); else {
                            // alert('没有找到商品标题按钮去商品详情页！');
                        }
                        
                    }, nm(4000, 10000));


                    // 这里是商品详情页
                } else if (document.querySelectorAll('.submsg').length > 0) {
                    // alert(localStorage.a);
                    // alert(window.location);


                    // alert('我已经在抓数据了，请稍等。。。');
                    if (!localStorage.a || JSON.parse(localStorage.a).length == 0) {
                        // 删除数组链接数组
                        delete localStorage.a;

                        // 告诉native已经完成
                        user.server({
                            data : '/credit/setTaobao',
                            success : function (res) {
                                // 添加成功
                                // alert('上传服务端成功');
                                // 告诉native已经完成
                                // 成功失败由服务端返回
                                user.mask({
                                    data : {
                                        //标题
                                        title:'认证成功',
                                        //认证失败提示
                                        tips: ['认证成功'],
                                        //点击按钮跳转地址
                                        action:'js://com.renwohua.conch/closeWindow',
                                        //按钮文案
                                        text:'返回' 
                                    }
                                });
                            },
                            error : function (res) { 
                                user.mask({
                                    data : {
                                        //标题
                                        title:'认证失败',
                                        //认证失败提示
                                        tips: ['认证失败'],
                                        //点击按钮跳转地址
                                        action:'js://com.renwohua.conch/closeWindow',
                                        //按钮文案
                                        text:'返回' 
                                    }
                                });
                               // 添加失败
                               // alert('上传服务端失败');
                            }
                        });

                        return;
                    }

                    var af = dataFilter();

                    // alert(af);

                    // 先上传到客户端
                    user.client({
                        data : encodeURIComponent(af)
                    });

                    var aArr = JSON.parse(localStorage.a);

                    // 队列弹出
                    aArr.shift();

                    localStorage.a = JSON.stringify(aArr);

                    // 弹出以后再做判断
                    if (JSON.parse(localStorage.a).length == 0) {

                        // alert('perfect，全部完成，haha！');
                        // 删除数组链接数组
                        delete localStorage.a;
                        // 发请求告诉native我已抓完让她关掉页面

                        // 告知native可以上传服务器了
                        user.server({
                            data : '/credit/setTaobao',
                            success : function (res) {
                                // 添加成功
                                // alert('上传服务端成功');
                                // 告诉native已经完成
                                // 成功失败由服务端返回
                                user.mask({
                                    data : {
                                        //标题
                                        title:'认证成功',
                                        //认证失败提示
                                        tips: ['认证成功'],
                                        //点击按钮跳转地址
                                        action:'js://com.renwohua.conch/closeWindow',
                                        //按钮文案
                                        text:'返回' 
                                    }
                                });
                            },
                            error : function (res) { 
                                user.mask({
                                    data : {
                                        //标题
                                        title:'认证失败',
                                        //认证失败提示
                                        tips: ['认证失败'],
                                        //点击按钮跳转地址
                                        action:'js://com.renwohua.conch/closeWindow',
                                        //按钮文案
                                        text:'返回' 
                                    }
                                });
                               // 添加失败
                               // alert('上传服务端失败');
                            }
                        });

                        

                        return;
                    }
                    // alert('ok，去抓下一个');
                    

                    // 防止作弊赔屏蔽
                    setTimeout(function() {
                        // 点吧淘宝刷不了
                        // 我在商品详情页点击左上角的回退按钮回到列表页
                        if (document.querySelector('.icon-back')) document.querySelector('.icon-back').click(); else {
                            // alert('没有找到回退按钮回到列表页！');
                        }
                        
                    }, nm(4000, 10000));
                } else {
                    // alert(localStorage.a);
                    // alert(window.location);
                    

                    // alert('oh，这里不是列表页，我得去列表页，请稍等。。。');
                    // 麻蛋还是点击吧，像点人
                    // 我在首页我要去列表页
                    // 查看全部订单按钮
                    (function() {
                        var arg = arguments.callee;
                        setTimeout(function() {
                            // 在首页
                            
                            delete localStorage.a;
                            if (document.querySelector('.label-act .sub')) document.querySelector('.label-act .sub').click(); else arg();
                        }, nm(4000, 10000));
                    })();
                    
                    return;

                }
            }, 2000);
        }
    });




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


        return '<html><body>' + aa2 + '</body></html>';

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

    // 动态加载js
    function loadJs(url, fn) {
        var oHead = document.getElementsByTagName('HEAD')[0]; 
        var oScript = document.createElement("script"); 
        oScript.src = url; 
        oHead.appendChild( oScript);
        oScript.onload = function() {
            fn && fn();
        };
    }


})();