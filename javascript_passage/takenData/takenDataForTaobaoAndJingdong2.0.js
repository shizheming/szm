// 名称：takenDataForTaobaoAndJingdong.js
// 版本：2.0
// 时间：2016.7
// 更新：1. 上版是把全部网页数据抓好放在localstorage.txt属性里然后一下子提交给native，现在是抓一个页面，请求下native，给数据
//       2. 把抓到的html处理，去掉script，img，style标签，然后去掉剩余标签里除了存在id和class的属性
// ------------------------------------------------------------

// 用法-格式
// 在淘宝京东页面注入script标签。src引静态资源



(function(){


    // alert('加入js成功');
    // return;


    // 遮罩层
    // native干遮罩，我这里刷新页面会闪屏
    // mask();
    // 判断京东还是淘宝
    var url = window.location;
    var taobao = /taobao\.com/.exec(url) ? 1 : 0;
    var jd = /jd\.com/.exec(url) ? 1 : 0;



    // 抓京东用户数据
    if(jd){
        if(!localStorage.bl){

            // 所有链接
            var aArr = [];

            // ajax请求的页数
            var page = 0;

            // 全部订单列表页获取最终详情页链接
            (function(){
                var t = arguments.callee;
                $.ajax({
                    type : 'get',
                    url: 'http://home.m.jd.com/newAllOrders/newAllOrders.json?sid=' + /sid=(.+)/.exec(window.location)[1] + '&page=' + ++page,
                    dataType : 'json',
                    success : function(json){

                        // 没有数据后就停止请求
                        if(json.orderList.length == 0){

                            // ajax请求开关
                            localStorage.bl = 1;

                            localStorage.a = JSON.stringify(aArr);
                            window.location = aArr[0];
                            return;
                        }

                        // 要自己拼链接地址
                        for(var i = 0,len = json.orderList.length; i < len; i++){
                            aArr.push('http://home.m.jd.com/newAllOrders/queryOrderDetailInfo.action?orderId=' + json.orderList[i].orderId + '&from=newUserAllOrderList&passKey=' + json.passKeyList[i] + '&sid=' + json.sid);
                        }

                        // 递归列队ajax请求，把她所有的列表都请求出来
                        t();
                    },
                    error : function(json){
                        // 如果请求失败抓到多少是多少
                        if(aArr.length == 0) return;
                        // window.location = aArr[0];
                        // 重新抓，有可能会一直死循环下去
                        // t();
                    }
                });
            })();

        }else{
            if(JSON.parse(localStorage.a).length == 0){
                // 删除状态
                delete localStorage.bl;

                return;
            }

            var af = dataFilter();

            alert(af);

            function str(){
                return af;
            }
            // 发请求给数据
            reNative('renwohua://com.renwohua.conch/js?callback=str');

            var aArr = JSON.parse(localStorage.a);

            // 队列弹出
            aArr.shift();
            
            localStorage.a = JSON.stringify(aArr);

            // 防止作弊赔屏蔽
            setTimeout(function() {
                window.location = aArr[0];
            },444);
            
        }
    }

    // 淘宝
    if(taobao){
        
        if(!localStorage.bl){
            // alert('第一次进入');
            // 装链接
            var aArr = [];

            var li = document.querySelectorAll('.order-list>li');
            // 利用dom判断下是不是需要抓的页面
            if(!li) return;

            // 拿orderid的值来拼接链接
            for(var i = 0,len = li.length; i < len; i++){
               
                // orderID值在class上

                str = /(\d+)/.exec(li[i].querySelector('div').className)[1];
                str = i < 9 ? str.substring(0,str.length - 1) : str.substring(0,str.length - 2);
                aArr.push('https://h5.m.taobao.com/mlapp/odetail.html?bizOrderId=' + str);
            }

            // 开始抓数据开关
            localStorage.bl = 1;

            localStorage.a = JSON.stringify(aArr);
            window.location = aArr[0];

        }else{
            if(JSON.parse(localStorage.a).length == 0){
                // 删除状态
                delete localStorage.bl;
                return;
            }

            var af = dataFilter();

            alert(af);

            function str(){
                return af;
            }
            // 发请求给数据
            reNative('renwohua://com.renwohua.conch/js?callback=str');

            var aArr = JSON.parse(localStorage.a);

            // 队列弹出
            aArr.shift();
            
            localStorage.a = JSON.stringify(aArr);

            // 防止作弊赔屏蔽
            setTimeout(function() {
                window.location = aArr[0];
            },444);
        }
    }
    
})();

// native请求
function reNative(url){
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
// 遮罩
/*function mask(){
    var div = document.createElement('div');
    div.style = 'text-align:center;vertical-align:middle;background-color:#ccc;position:fixed;top:0;left:0;bottom:0;right:0;line-height:400px;font-size:30px;z-index:9999;font-family:"Microsoft YaHei";';
    div.innerHTML = '请稍后...'
    document.body.appendChild(div);
}*/

// 获取到的数据转变成json方便后端

/*{
    '快递商' : '顺丰',
    '签收时间' : '2016-05-17 09:44:00',
    '收货人' : '施哲明',
    '手机号码' : '86-13701745394',
    '收获地址' : '上海 上海市 徐汇区 龙华街道 上海市徐汇区云锦路500号绿地汇中心B座18楼',
    '购买物品' : 'Samsung/三星 MZ-750120B/CN120GSSD固态硬盘台式机笔记本非128g',
    '运费' : '15.00',
    '实付款' : '294.00',
    '购买数量' : '1',
    '淘宝返积分' : '27',
    '订单编号' : '1901486118472701',
    '支付宝交易号' : '2016051521001001150287609957',
    '创建时间' : '2016-05-15 11:35:01',
    '付款时间' : '2016-05-15 11:37:43',
    '发货时间' : '2016-05-15 14:03:50',
    '成交时间' : '2016-05-17 09:50:35'
}*/

// 拿到的数据过处理下
// 删除js，css，img标签，然后在删除剩余标签中的所有属性，除了留下id和class
function dataFilter() {

    var oldTxt = document.body.innerHTML;

    // 把script标签里面的代码缩成一行，不让是匹配不到script标签的
    oldTxt = oldTxt.replace(/<script.*?>(?:(?:\s+.+)+|(?:.+\s+)+)<\/script>/g, '');

    // 替换工作
    function rep(txt,rep,rt,n) {
        // 需要替换几处
        var str = '';
        for(var i = 0; i < n; i++) str += '$' + i + ' ';

        rt = rt || str;
        return txt.replace(rep, rt);
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

    // 去除无用的空格
    oldTxt = oldTxt.replace(/>\s+?</g, '><');

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
        nn = re.lastIndex
        /*console.log('start' + rs.index);
        console.log('end' + re.lastIndex);*/
    }

    aa += oldTxt.substring(nn);


    // 干掉没有class没有id情况下的以外的属性
    var re2 = /<[^<>]+?>(?:(?=<)|.*?(?=<))/g;
    var rs2;
    var aa2 = '';
    while ((rs2 = re2.exec(aa)) != null) {
        // console.log(rs2[0]);
        !/<\w+(?=\s).*(?=\sclass)|<\w+(?=\s).*(?=\sid)/.exec(rs2[0]) ? aa2 += rs2[0].replace(/(<\w+)\s.*(>)/, '$1 $2') : aa2 += rs2[0];
    }

    return aa2;

}




