// 名称：formValidation.js
// 版本：2.0
// 时间：2016.1
// 更新内容：把静态数据变成动态获取生成数据，写法变为面向对象
// ------------------------------------------------------------

// 用法-格式
/*formValidation('formValidation',{
    chinaName : [/^[\u4e00-\u9fa5]+$/,'草拟吗写中文'],
    email : [/^.+@[a-z0-9\-]+(\.[a-z]{2,6}){1,2}$/i,'请正确输入邮箱'],
    password : [/^.{6,}$/,'不能少于6位'],
    passwordConfirmation : [/^.{6,}$/,'输入与上次不符'],
    phone : [/^1\d{10}$/,'手机不对'],
    code : [/^\d{4}$/,'验证码不对'],
    imgCode : [/^\d{4}$/,'验证码不对']
},{
    mouseBlur : function(dom,ecma){
           // ecma.myTip();
           ecma.publicTip();
    },
    getCode : function(arg){
        // $.ajax({});
    },
    mouseSumbit : function(arg){}
});*/


// 1.数据有了
// 2.方法有了
// 3.逻辑过程有了
// 面向对象是把对象传来传去，对象是名词，对象是具体的
// 函数式是把函数传来传去，函数是动词，函数是抽象的


// 表单对象
function formValidation(id,data,data2){
    var form1 = document.getElementById(id);
    if(!form1) return;

    var domInput = form1.getElementsByTagName('input');

    
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
        if(isFunction(request)){
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
                    // 提示信息位置
                    fn && fn(this.dom,this);
                    // this.dom.value = this.tip;
                    this.dom.type = 'text';
                    method.rep(this.dom,'true','false');
                    return false;
                }
                break;
            }
            method.rep(this.dom,'false','true');
            return true
        }else{
            // 提示信息
            fn && fn(this.dom,this);
            // this.dom.value = this.tip;
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
        // this.dom.value = userJson[this.inputName];
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
            case 1 : pt.innerHTML = this.tip;
            break;
            case 2 : pt.innerHTML = '';
            break;
            case 3 : pt.innerHTML = '';
        }
        
    };

    // 创建的所有input对象放进去
    var iptArr = [];
    // 逻辑过程
    // 失去焦点，获取焦点状态
    // 1 失去焦点
    // 2 获取焦点
    var active;
    for(var key in data){
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
                ipt.oBlur(function(dom,ecma){
                    // 提示信息的接口
                    // 1.提示信息在输入框里面
                    data2.mouseBlur(dom,ecma);
                });
            };
            domIpt.onfocus = function(){
                active = 2;
                ipt.oFocus(function(dom,ecma){
                    ecma.myTip();
                });
            };
        })(domIpt,iName,key);
    }



    // 获取验证码
    var code = iptArr[m.findIndex(iptArr,function(a,b){
        return a.inputName === 'phone';
    })];
    code.getCode = function(){
        var domCode = document.getElementById('getCode');
        var timer = null;
        domCode.onclick = countTime;
        function countTime(){
            // 点获取验证码时单独验证手机
            if(!code.oBlur(function(dom,ecma){
                data2.mouseBlur(dom,ecma);
            })) return;
            // ajax数据获取成功或失败
            // data2.getCode();
            domCode.onclick = null;
            method.addClass(domCode,'true');
            var m = 5;
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
    div.innerHTML = '<label><span>图片验证码</span><input type="text" name="imgCode" placeholder="图片验证码"></label>';

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
        // 这里会有ajax失败判断
        if(num === 3){
            this.appendChild(div);
            var domIptImgCode = (function(){
                for(var i = 0,len = domInput.length; i < len; i++){
                    if(domInput[i].name === 'imgCode') return domInput[i];
                }
            })();
            // 创建imgCode对象
            var imgCode = new Fobj(domIptImgCode,'imgCode');
            iptArr.push(imgCode);
            domIptImgCode.onblur = function(){
                active = 1;
                imgCode.oBlur(function(dom,ecma){
                    // 提示信息的接口
                    // 1.提示信息在输入框里面
                    data2.mouseBlur(dom,ecma);
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
        if(!document.getElementById('checkbox').checked) return false;
    };
    

    
    
    

};


// 测试验证函数
function checkTest(userValue,expJson){
    return expJson.test(userValue);
}

