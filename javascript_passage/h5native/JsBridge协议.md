## 协议

```
js://com.renwohua.conch/模块/功能?data=json
```
* native回调：

```
回调方法 ： javascript:JsBridge.forResult(json);

返回值：
{
  "status": 状态码 200 成功，400 action不存在,500逻辑处理错误
  "message": "状态描述",
  "data":返回数据,
  "action": "接口方法"
}
```


* 通过config接口注入权限验证配置

```
var user = new JsBridge({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，接口入参信息会通过log打出
    appId: '', // 必填，合作者的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名
});

备注：user 只能初始化一次；
```

## 接口

* H5跳转
```
user.forward({
    data: {
            'url':'',//跳转页面
            'flags':1//1、新开一个页面；2、同一个栈里面，打开页面;3、移除栈里面的
    }
});

备注：
```

> 菜单接口


* 显示自定义菜单

```
user.showMenu({
    data: [
        {
            'title':'我是新生',//菜单标题
            'icon':'http://xxx.jpg',//菜单图标
            'order':0,//菜单显示顺序
            'action':'' //点击触发的事件  标准url
        }
    ]
});

备注：
```

> 公共接口



* 关闭页面

```
user.closeWindow();

备注：
```
* 刷新页面

```
user.refresh();

备注：
```

* 显示/隐藏loading

```
user.setLoadingIndicator({
    data:{
        active:true//true 显示loading、false 隐藏loading
    }
});
```
* 分享

```
user.showShare();

备注：显示分享弹框，分享参数会回调onShareQQ等方法
```

* 获取分享到社交平台的参数及分享后的回调

```
//分享初始化
user.onShare({
    data:{
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
    },
    success: function () {
       // 用户确认分享后执行的回调函数
    },
    error: function () {
       // 用户取消分享后执行的回调函数
    }
});

onBack();//返回


备注：分享参数会回调的方法
```

* 选择图片

```
user.chooseImage({
    data:{
        count: 1, //
        sourceType: ['album', 'camera','frontIdCard','backIdCard','handIdCard'], // 可以指定来源是相册/相机/身份证拍照，默认相册包含相机
    },
    success:function (res) {
            var url = res.url;//图片
            var key = res.key;//osskey
    }
});

```

* 保存图片到相册

```
user.saveImageToAlbum({//保存图片到相册
data: {
    ‘img_url’:’’,//图片url （一般是http 或是 https）
}
});
```
* 选择视频

```
user.videoRecord({
    data:{
        tip: '请依次朗读:', // 录视频时显示的提示信息
        time: '', // 录制时间
    },
    success:function (res) {
            var url = res.url;//视频地址
            var key = res.key;//osskey
    }
});

```

* 选择联系人

```
user.chooseContact({
    success:function (contacts) {
           contacts  // 返回选定联系人列表；contact包含：name 用户名，phone 手机号，createTime联系人创建时间，count拨打次数
    }
});

备注：
```

* 选择通话记录

```
user.chooseCallLog({
    data:{
        phone: '手机号码',//指定手机号的通话记录
        sourceType: ['calls', 'dialed','missed'], // 可以指定来源是来电，拨出、未接，默认三者都有
    },
    success: function (logs) {
        logs  // 返回选定通话记录列表；log包含：fromName 用户名;fromPhone 手机号;time通话时间;type //'calls', 'dialed','missed'  ; duration //通话时长
    }
});

备注：
```
>设备接口

* 获取网络连接状态 （是否联网，3g连接，wifi连接）

```
user.networkInfo({
    success: function (type) {
        type;//没有网络-0：WIFI网络1：4G网络-4：3G网络-3：2G网络-2
    }
});

备注：
```

* 获取本地系统信息（Android版本，型号，IP，蓝牙mac，IMEI，唯一序列号）

```
user.deviceInfo({
    success: function (resp) {
        resp.imsi;
        resp.imei;
        resp.mac;
        resp.ip;
        resp.vendor; 制造商,
        resp.version;版本-api,
        resp.model;手机型号
    }
});

备注：
```

* 获取地理位置

```
user.getLocation({
    success: function (resp) {
        resp.latitude;//经度
        resp.longitude;//纬度
        resp.locType;//定位类型
    }
});

备注：
```

* 拨打电话

```
user.call({
    data:{
        tel: '电话号码'
    }
});

备注：
```

* 复制剪贴板

```
user.clipboard({
    data:{
        text: '粘贴内容'
    }
});

备注：
```

* 打开APP（支持跳转到应用市场）

```
user.openApp({
    data:{
        url: ''
    }
});

备注：
```

* 弹框（暂不实现）

```
user.dialog({
    data:{
    }
});

备注：
```


> 爬虫接口

1. 遮罩层

***
    接口    js://com.renwohua.conch/crawler/mask
```
调用
user.mask({
    data:{
        title:'认证失败',//标题
        tips: ['很抱歉，认证失败了。在认证过程中，请保留在本页'],//认证失败提示
        action:'js://com.renwohua.conch/closeWindow',//点击按钮跳转地址
        text:'重新认证' //按钮文案
    }
});
```
2. 传输数据

***
    接口    js://com.renwohua.conch/crawler/work
```
调用
user.work({
    data:'抓取的数据',//
    success: function (res) {
        // 添加成功
    },
    error: function (res) {
       // 添加失败
    }
});
```
3. 上传数据

***
    接口    js://com.renwohua.conch/crawler/uploadReport

```
调用
user.uploadReport({
    data:'',//类型   学信网认证 /verify/education   人行认证  /verify/spainBank  社保认证/verify/sheBao  公积金认证  /verify/gjj  京东 /credit/setJd   淘宝 /credit/setTaobao  支付宝  /credit/setAlipay
    success: function (res) {
        // 添加成功
    },
    error: function (res) {
       // 添加失败
    }
});
```

> 用户接口

1. 登录
2. 获取收货地址


> 加解密接口

* 加密

```
    接口    js://com.renwohua.conch/crypt/encrypt
```

```
调用
user.encrypt({
    data: {
        api:'接口地址',
        params:{
            //参数
        }
    },
    success: function (res) {
        // 加密成功
    },
    error: function (res) {
       // 加密失败
    }
});
```


* 解密

```
接口    js://com.renwohua.conch/crypt/decrypt
```

```
调用
user.decrypt({
    data: {
    //参数
    },
    success: function (res) {
        // 解密成功
    },
    error: function (res) {
       // 解密失败
    }
});
```

> APP回调js事件


* 抓数据超时回调

```
回调方法 ： javascript:JsBridge.forResult(json);

传回值：
{
  "status": 1000,//表示抓取数据超时
  "message": "",
  "data":"",
  "action": ""
}
```

> 是什么

* 获取客户端类型

```
user.getClientType({
    success: function (type) {
        type//android / ios
    }
});

备注：
```

* 获取tongdun值

```
user.getBlackBox({
    success: function (val) {
        val//字符串
    }
});

备注：
```

> 事件（占不支持）

* 位置改变
```
onReceiveLocation

备注：
```

* 分享
```
onShare

备注：
```

* 返回

```
onBack

备注：
```

* 收货地址改变

```
onAddressChange

备注：
```
