// 名称：takenDataForTaobaoAndJingdong.js
// 版本：1.0
// 时间：2016.6
// ------------------------------------------------------------

// 用法-格式
// 直接注入

(function(){

    // 判断京东还是淘宝
    var url = window.location;
    var taobao = /taobao\.com/.exec(url) ? 1 : 0;
    var jd = /jd\.com/.exec(url) ? 1 : 0;



    // 抓京东用户数据

    if(!localStorage.bl && jd){

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

    // 淘宝

    if(!localStorage.bl && taobao){

        // 装链接
        var aArr = [];

        var li = document.querySelectorAll('.order-list>li');
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