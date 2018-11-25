// 名称：takenDataForAlipaySDK.js
// 版本：1.1
// 时间：2016.11
// 更新：1.动态加载js
//       2.加html加body标签形成html文档
//       3.每提交给客户端一次同时告诉客户端这次提交的数据是什么内容
//       4.去掉账户设置页面信息

// ------------------------------------------------------------

// 用法-格式
// 在支付宝页面注入js代码。

(function() {
    loadJs('//rwhstorage-pub.oss-cn-shanghai.aliyuncs.com/dist/js/jsBridge.min.js', function() {
        var url = location.href;
    	// 调节手机适配
        toMobile();

        xt();

        // 验证码
    	//consumeprod.alipay.com/record/checkSecurity.htm?securityId=web%7Cconsumeprod_record_list%7Cc1cf97a3-5443-41fd-9179-325477e260b6GZ00&consumeVersion=standard

        // 在用户设置页面删除
        
    	// 不是交易记录不抓取
    	if(!(/consumeprod.alipay.com\/record\/standard.htm/.exec(url))) {
            delete localStorage.num;
            return;
        }

        // 初始化sdk
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
                data : '/credit/setAlipay',
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

        // 初始localStorage.num
        if (!localStorage.num) localStorage.num = 1;

        var jx = JSON.parse(localStorage.num);


        if (jx < 4) {
            // 交易记录页面

            // 处理原始数据
            var af = dataFilter();
            // 先上传到客户端
            user.client({
                data : encodeURIComponent(af())
            });

            // 累计去下一页下一页
    		localStorage.num = ++jx;

    		// 去下一页交易记录，只抓2页
    		if (document.querySelector('.page-next.page-trigger')) {
                // 有的话就去下一页
                setTimeout(function() {
                    document.querySelector('.page-next.page-trigger').click();
                }, nm(2000, 11000));

            } else {

    			user.server({
                    data : '/credit/setAlipay',
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
                // 在用户设置页面删除
                delete localStorage.num;
    		}
            
            
        } else {
            // 在用户设置页面删除
            delete localStorage.num;

            

            // 告知native可以上传服务器了
            user.server({
                data : '/credit/setAlipay',
                success : function (res) {
                    // 添加成功
                    // alert('上传服务端成功');
                    // 告诉native已经完成
                    user.mask({
                        data : {
                            //标题
                            // 成功或失败由客户端返回
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
                   // 添加失败
                   // alert('上传服务端失败');
                }
            });

        }
    });



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
                // /data-.*?=".*?"/g

            ];

            // 初始替换内容为空格
            var ir1 = initRep('');

            arr.forEach(function(that) {
                oldTxt = ir1(that, oldTxt);
            });

            oldTxt = oldTxt.replace(/\s{2,}/g, ' ');

            return '<html><body>' + oldTxt + '</body></html>';

        };
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
        t1.style.cssText = 'z-index:1000;top:0;left:0;box-shadow:0 0 2px 2px #000;background-color:#08c1c1;color:#fff;border:1px solid #fff;line-heigth:40px;width:100%;text-align:center;font-size:18px;position:absolute;'

        window.onscroll = function() {
            t1.style.cssText = 'top:' + (document.body.scrollTop || document.documentElement.scrollTop) + 'px;left:' + (document.body.scrollLeft || document.documentElement.scrollLeft) + 'px;z-index:1000;box-shadow:0 0 2px 2px #000;background-color:#08c1c1;color:#fff;border:1px solid #fff;line-heigth:30px;width:100%;text-align:center;font-size:18px;position:absolute;';
        };
    }

    // n到m之间的随机数
    function nm(n,m) {
        return parseInt(n + Math.random() * (m - n));
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








