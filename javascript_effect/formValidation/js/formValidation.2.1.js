// 名称：formValidation.js
// 版本：2.1
// 时间：2016.1
// ------------------------------------------------------------


// 1.数据有了
// 2.函数方法有了
// 3.对象有了
// 4.逻辑过程有了
// 面向对象是把对象传来传去，对象是名词，对象是具体的
// 函数式是把函数传来传去，函数是动词，函数是抽象的


// 表单对象
function formValidation(id,data,data2){
    var form1 = document.getElementById(id);
    if(!form1) return;

    var domInput = form1.getElementsByTagName('input');
    // 动态插入dom需要的一个支点，一个位置
    // 太恶心了
    var subDom = document.getElementById('wz');
    var stip = form1.getElementsByClassName('stip')[0];
    
    // 原始数据
    function originalData(request){
        // input的name数据
        var inputName = Object.keys(data);
        var exp = [];
        var tip = [];
        for(var key in data){
            exp.push(data[key][0]);
            tip.push(data[key][1]);
        }
        switch(request){
            case 'exp' : return exp;
            case 'tip' : return tip;
            case 'inputName' : return inputName;
        }
    }


    // 我要的数据
    function myData(request,fn){
        // 把正则数组数据转化成对象数据
        
        var expJson = m.toObject(inputName,originalData('exp'));
        // 把用户提示信息数组数据转化成对象数据
        var tipJson = m.toObject(inputName,originalData('tip'));
        if(m.isFunction(request)){
            fn = request;
            request = 'fn';
        }
        // 请求什么样的数据就返回什么样的数据
        switch(request){
            case 'expJson' : return expJson;
            case 'tipJson' : return tipJson;
            case 'fn' : return fn();
        }
    }
    

    // 要为逻辑过程准备数据了
    // inputName数据
    var inputName = originalData('inputName');
    // 正则对象
    var expJson = myData('expJson');
    // 提示信息对象
    var tipJson = myData('tipJson');
    // 用户填写数据对象
    var userJson = myData(function(){
        // 创建一空空对象，未来储存用户输入的数据
        return m.cloneName(inputName,function(){
            return null;
        });
    });


    // 创建input对象
    function Fobj(dom,key){
        this.inputName = key;
        this.exp = expJson[this.inputName];
        this.tip = tipJson[this.inputName];
        // 为什么创建new对象后就取不到
        // this.user = userJson[this.inputName];
        this.dom = dom;
    }
    Fobj.prototype.check = function(){
        return checkTest(this.dom.value,this.exp);
    };
    Fobj.prototype.oBlur = function(fn){
        userJson[this.inputName] = this.dom.value;
        if(this.check()){
            switch(this.dom.name){
                case 'password' :
                this.dom.type = 'password';
                break;
                case 'passwordConfirmation' :
                if(this.dom.value === userJson.password){
                    this.dom.type = 'password';
                }else{
                    // 提示信息和ajax
                    fn && fn(this.dom,this);
                    this.dom.type = 'text';
                    method.rep(this.dom,'true','false');
                    return false;
                }
                break;
            }
            // 提示信息和ajax
            fn && fn(this.dom,this);
            var xx = document.getElementById('pt')
            if(xx) xx.innerHTML = '';
            method.rep(this.dom,'false','true');
            return true;
        }else{
            // 提示信息和ajax
            fn && fn(this.dom,this);
            if(this.inputName === 'password' || this.inputName === 'passwordConfirmation') this.dom.type = 'text';
            method.rep(this.dom,'ture','false');
            return false;
        }
    };
    Fobj.prototype.oFocus = function(fn){
        method.removeClass(this.dom,'true');
        method.removeClass(this.dom,'false');
        if(this.inputName === 'password' || this.inputName === 'passwordConfirmation') this.dom.type = 'password';
        fn && fn(this.dom,this);
    };

    // 提示信息方法
    // 在自己的输入框内
    Fobj.prototype.myTip = function(){
        switch(active){
            case 1 : this.dom.value = this.tip;
            break;
            case 2 : this.dom.value = userJson[this.inputName];
        }
        // 失去焦点的时候
        // this.dom.value = this.tip;
        // 获取焦点的时候
        // this.dom.value = userJson[this.inputName];
    };
    // 在公共的div中
    Fobj.prototype.publicTip = function(){
        var pt = document.getElementById('pt');
        if(!pt){
            var pt = document.createElement('div');
            pt.id = 'pt';
            form1.appendChild(pt);
        }
        switch(active){
            case 1 : 
                if(!act) pt.innerHTML = this.tip;
            break;
            case 2 : pt.innerHTML = '';
            break;
            case 3 : pt.innerHTML = '';
            break;
            default : 
                pt.innerHTML = this.tip;
        }
        
    };

    // 创建的所有input对象放进去
    var iptArr = [];
    // 逻辑过程
    // 失去焦点，获取焦点状态
    // 1 失去焦点
    // 2 获取焦点
    var active;
    // 判断验证成功或失败
    var act;
    for(var key in data){
        // 利用name属性找对象的input对象
        var domIpt = (function(){
            for(var i = 0,len = domInput.length; i < len; i++){
                if(domInput[i].name === key) return domInput[i];
            }
        })();
        if(!domIpt) continue;
        var iName = domIpt.name;
        (function(domIpt,iName,key){
            var ipt = new Fobj(domIpt,key);
            iptArr.push(ipt);
            domIpt.onblur = function(){
                active = 1;
                var dom1,ecma1;
                var ive = ipt.oBlur(function(dom,ecma){
                    dom1 = dom;
                    ecma1 = ecma;
                });
                act = ive;
                // 提示信息的接口
                data2.mouseBlur(dom1,ecma1);
            };
            domIpt.onfocus = function(){
                active = 2;
                ipt.oFocus();
            };
        })(domIpt,iName,key);
    }



    // 获取验证码
    // 短信验证码
    var code = iptArr[m.findIndex(iptArr,function(a,b){
        return a.inputName === 'UserName';
    })];
    // 图片验证码
    var imgCode = iptArr[m.findIndex(iptArr,function(a,b){
        return a.inputName === 'imgCode';
    })];
    
    if(code === void 0) code = {};
    code.getCode = function(){
        var domCode = document.getElementById('getCode');
        if(!domCode) return;
        var timer = null;
        domCode.onclick = countTime;
        function countTime(){
            // 1.点获取验证码时第一步单独验证手机
            if(!code.oBlur(function(dom,ecma){
                data2.mouseBlur(dom,ecma);
            })) return;
            // 2.点获取验证码时第二步单独验证图片验证吗
            if(!imgCode.oBlur(function(dom,ecma){
                data2.mouseBlur(dom,ecma);
                pt.innerHTML = '请输入正确的图片验证码';
            })) return;
            
            // ajax数据获取成功或失败
            data2.getCode(domCode);

            domCode.onclick = null;
            method.addClass(domCode,'true');
            var m = 120;
            domCode.value = m + '秒后发送';
            clearInterval(timer);
            timer = setInterval(function(){
                m--;
                domCode.value = m + '秒后重新获取';
                if(m == 0){
                    clearInterval(timer);
                    domCode.value = '获取验证码';
                    method.removeClass(domCode,'true');
                    domCode.onclick = countTime; //递归
                }
            },1000);
        };  
    };
    // 绑定获取验证码click事件
    code.getCode();
    
    // 统计点击提交的次数来显示图片验证码
    var num = 0;
    var div = document.createElement('div');
    div.className = 'imgCode';
    div.innerHTML = '<div class="controls" id="preg_show">\
                    <input id="CaptchaDeText" name="CaptchaDeText" type="hidden" value="ii8Mjxxi19rrag4J6LWSoQ==">\
                    <input class="verify" id="imgCode" name="imgCode" type="text" placeholder="验证码">\
                    <img id="CaptchaImage" src="http://m.yonglibao.com/User/auth/verifynew/1454122716" title="点击刷新">\
                </div>';

    // 提交按钮
    form1.onsubmit = function(){
        active = 3;
        var arr = [];
        for(var i = 0,len = iptArr.length; i < len; i++){
            var bl = iptArr[i].oBlur(function(dom,ecma){
                data2.mouseBlur(dom,ecma);
            });
            arr.push(bl);
        }
        num++;
        
        var reg = document.getElementById('sLog');
        
        if(reg && '{$error_num}' >= 2){
            this.insertBefore(div,subDom);
            var domIptImgCode = (function(){
                for(var i = 0,len = domInput.length; i < len; i++){
                    if(domInput[i].name === 'imgCode') return domInput[i];
                }
            })();
            // 创建imgCode对象
            var imgCode = new Fobj(domIptImgCode,'imgCode');
            iptArr.push(imgCode);

            shua();

            domIptImgCode.onblur = function(){
                var that = this;
                active = 1;
                
                imgCode.oBlur(function(dom,ecma){
                    // 提示信息的接口
                    // 1.提示信息在输入框里面
                    data2.mouseBlur(dom,ecma);
                });

                data2.imgCode(function(imgA){
                    method.rep(that,'true','false');
                    pt.innerHTML = '请输入正确的图片验证码';
                },function(imgA){
                    method.rep(that,'false','ture');
                });
            };
            domIptImgCode.onfocus = function(){
                active = 2;
                imgCode.oFocus(function(dom,ecma){
                    ecma.myTip();
                });
            };
        }
            


        if(m.contains(arr,false)) return false;
        var checkBox = document.getElementById('Checkbox');
        if(checkBox && !checkBox.checked){
            pt.innerHTML = '请勾选同意永利宝用户协议和投资人注册协议';
            return false;
        }
    };

    // 点击图片验证码去刷新
    function shua(){
        $("#CaptchaImage").click(function() {
            var timestamp = new Date();
            $("#CaptchaImage").attr("src", "/User/auth/verifynew/" + timestamp.getTime());
        });

        $("#change_preg").click(function() {
            var timestamp = new Date();
            $("#CaptchaImage").attr("src", "/User/auth/verifynew/" + timestamp.getTime());
        });

        $('#imgCode').focus(function() {
            var timestamp = new Date();
            $("#CaptchaImage").attr("src", "/User/auth/verifynew/" + timestamp.getTime());
        });
    }

    // 图片绑定事件
    function imgMouse(){

    }
    var reg = document.getElementById('sLog');
    if(!reg){
      shua();
        var domIptImgCode = document.getElementsByName('imgCode')[0];
        var imgCode = new Fobj(domIptImgCode,'imgCode');
        domIptImgCode.onblur = function(){
            var that = this;
            active = 1;
            
            imgCode.oBlur(function(dom,ecma){
                // 提示信息的接口
                // 1.提示信息在输入框里面
                data2.mouseBlur(dom,ecma);
            });

            data2.imgCode(function(imgA){
                method.rep(that,'true','false');
                pt.innerHTML = '请输入正确的图片验证码';
            },function(imgA){
                method.rep(that,'false','ture');
            });
        };
        domIptImgCode.onfocus = function(){
            active = 2;
            imgCode.oFocus(function(dom,ecma){
                ecma.myTip();
            });
        };  
    }
    
    
};


// 测试验证
function checkTest(userValue,expJson){
    return expJson.test(userValue);
}
