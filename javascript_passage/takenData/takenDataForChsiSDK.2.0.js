// 名称：takenDataForChsiSDK.js
// 版本：2.0
// 时间：2016.12
// 更新：1. 学信网地址变动了
//       2. html结构也变了

// ------------------------------------------------------------

// 用法-格式
// 在学信网页面注入js代码。





(function() {
loadJs('//rwhstorage-pub.oss-cn-shanghai.aliyuncs.com/dist/js/jsBridge.min.js', function() {

    var doc = document;

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
            data : '/verify/education',
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

    var chain = (function () {
        function setNext(successor) {
            this.successor = successor;
        }
        function request() {
            var ret = this.fn.apply(null, arguments);
            if (ret) this.successor && this.successor.request.apply(this.successor, arguments);
        } 
        return function(fn) {
            return {
                fn : fn,
                setNext : setNext,
                request : request
            };
        };
    })();


    
    function mechsi(url) {
        if (/userVerify\/chsi/.exec(url)) {
            // 这是我们自己的页面不抓
        } else return true;
    }

    function youlogin(url) {
        if (/account.chsi.com.cn\/passport\/login/.exec(url)) {

            // 过滤登录页面
            // 这里还需要个注册超时的请求

            // 调节适配
            toMobile();

            // 登录页引导文案
            ct('学信网');

            // alert('这个页面是登录页面，所以我不抓');
        } else return true;
    }

    function youaction(url) {
        if (/index.action/.exec(url)) {
            // 判断是不是初始页
            user.mask({
                data : {
                    //标题
                    title:'认证中...',
                    //认证失败提示
                    tips: ['请保留在本页，大约需要30秒~']
                }
            });
            // 是初始页
            // 去抓去学籍信息页
            if (doc.querySelector('#gdjy-nav dt')) doc.querySelector('#gdjy-nav dt').click(); else alert('没点到');
        } else return true;
    }

    function youjsp(url) {
        if (/index\.jsp/.exec(url)) {
            user.mask({
                data : {
                    //标题
                    title : '认证中...',
                    //认证失败提示
                    tips : ['请保留在本页，大约需要30秒~']
                }
            });
            if (doc.querySelector('.login-btn')) doc.querySelector('.login-btn').click(); else alert('没点到');
        } else return true;
    }

    function meover() {
        // 我在要抓的页面
        user.mask({
            data : {
                //标题
                title : '认证中...',
                //认证失败提示
                tips : ['请保留在本页，大约需要30秒~']
            }
        });

        // 处理原始数据
        var af = dataFilter();

        // 先上传到客户端
        user.client({
            data : encodeURIComponent(af())
        });

        // 告诉native全部抓完了
        // 告知native可以上传服务器了
        user.server({
            data : '/verify/education',
            success : function (res) {
                // 添加成功
                // alert('上传服务端成功');
                // 告诉native已经完成
                user.mask({
                    data : {
                        //标题
                        // 成功或失败由客户端返回
                        title :'认证成功',
                        //认证失败提示
                        tips : ['认证成功'],
                        //点击按钮跳转地址
                        action : 'js://com.renwohua.conch/closeWindow',
                        //按钮文案
                        text : '返回' 
                    }
                });
            },
            error : function (res) { 
                user.mask({
                    data : {
                        //标题
                        // 成功或失败由客户端返回
                        title:'认证失败',
                        //认证失败提示
                        tips: ['认证失败'],
                        //点击按钮跳转地址
                        action:'js://com.renwohua.conch/closeWindow',
                        //按钮文案
                        text:'返回' 
                    }
                });
            }
        });
    }
    

    var a1 = chain(mechsi);
    var a2 = chain(youlogin);
    var a3 = chain(youaction);
    var a4 = chain(youjsp);
    var a5 = chain(meover);
    
    
    a1.setNext(a2);
    a2.setNext(a3);
    a3.setNext(a4);
    a4.setNext(a5);
    a1.request(location.href);


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

        return '<html><body>' + aa2 + '</body></html>';

    };
}

// 登录页引导文案
function ct(logo) {
    var cd = document.createElement('div');
    cd.innerHTML = '请登录你的' + logo + '账号，开始' + logo + '认证<br>任我花不会保存你的账号密码，请放心认证';
    cd.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background-color:#fff;text-align:center;line-height:1.8;font-family:"Microsoft YaHei";color:#333;padding:10px;box-shadow:0 0 30px 0 #e8e8e8 inset;z-index:9999;';
    document.body.appendChild(cd);
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


