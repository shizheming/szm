// 名称：takenDataForTaobaoAndJingdong.js
// 版本：1.1
// 时间：2016.7
// 更新：bl开关按钮和判断是不是京东或淘宝网页成上下级判断，修改逻辑错误
// ------------------------------------------------------------

// 用法-格式
// 在淘宝京东页面注入script标签。src引静态资源



(function(){

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

                            // 创建数据库
                            localStorage.txt = '';

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
                        window.location = aArr[0];
                        // 重新抓，有可能会一直死循环下去
                        // t();
                    }
                });
            })();

        }else{
            if(JSON.parse(localStorage.a).length == 0){
                // console.log('完成了');
                function str(){
                    return localStorage.txt;
                }
                // 删除状态
                delete localStorage.bl;

                // 删除数据库
                delete localStorage.txt;

                // 给native发请求把数据传过去
                reNative('renwohua://com.renwohua.conch/js?callback=str');
                return;
            }

            // 开始进入最终详情页抓数据
            localStorage.txt = localStorage.txt + '\n' + document.body.innerText;
            var aArr = JSON.parse(localStorage.a);

            // 队列弹出
            aArr.shift();
            
            localStorage.a = JSON.stringify(aArr);
            window.location = aArr[0];
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

            // 创建数据库
            localStorage.txt = '';

            localStorage.a = JSON.stringify(aArr);
            window.location = aArr[0];

        }else{
            alert(localStorage.txt);
            if(JSON.parse(localStorage.a).length == 1){
                // alert('完成了');
                var cu = localStorage.txt;
                function str(){
                    return cu;
                }
                
                // 删除状态
                delete localStorage.bl;

                // 删除数据库
                delete localStorage.txt;

                // 给native发请求把数据传过去
                reNative('renwohua://com.renwohua.conch/js?callback=str');
                return;
            }

            // 开始进入最终详情页抓数据
            localStorage.txt = localStorage.txt + '\n' + document.body.innerText;
            var aArr = JSON.parse(localStorage.a);

            // 队列弹出
            aArr.shift();
            
            localStorage.a = JSON.stringify(aArr);
            window.location = aArr[0];
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




