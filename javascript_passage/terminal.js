// 名称：mScore.js
// 版本：1.0
// 时间：2016.4
// ------------------------------------------------------------

// 判断移动终端
var u = navigator.userAgent

//android终端或者uc浏览器
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;

//ios终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 


// 判断微信打开网页
// isWeixnOpen()
function isWeixnOpen(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == "micromessenger") return true;else return false;
}