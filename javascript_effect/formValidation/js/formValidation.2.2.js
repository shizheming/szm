// 名称：formValidation.js
// 版本：2.2
// 时间：2016.2
// ------------------------------------------------------------



// 2.1的版本我是想直接从所有的input着手验证，然后个别像密码，勾选框提供接口，写一些不一样的东西，后来发现这个太不靠谱了，因为里面还有一个input和另一个input的联系，比如说确认密码和密码联系在一起，获取验证码和手机联系在一起，或是验证顺序的问题，后一个input必须在前一个input验证正确的情况下才能允许验证，第一耦合度太高了，第二验证的条件千变万化，不单单只是自己的失焦获焦验证，没有办法在一个整体中把这些所有的不同性包括进去，简单点就是不可能每种情况都去协议中接口，不现实，所以我决定在2.2版本中降低他的权重，增加他的灵活性，而不是从整个表单入手了，是从一个单一的input对象入手去构建整个表单，从局部到整体。

// 函数式
// 面向对象式

// 数据：
// 1.inputName----不同的
// 2.正则表达式----不同的
// 3.错误的提示信息----不同的
// 4.正确的提示信息----同样的
// 4.空的提示信息----同样的

// 对象
// input

// 逻辑过程

// 有些需要配合后台一起验证的，那么就要留个接口了，不能写死

// 编程最核心的方法就是把人类的语言转变或可以说是抽象成计算机的语言！！！！！！！！！！！！！

function formValidation(json,fn){

    // 原始数据
    function originalData(request){
        // input的name数据
        var inputName = Object.keys(json);
        var exp = [];
        var tip = [];
        for(var key in json){
            exp.push(json[key][0]);
            tip.push(json[key][1]);
        }
        switch(request){
            case 'exp' : return exp;
            case 'errorTip' : return tip;
            case 'inputName' : return inputName;
        }
    }

    // 我要的数据
    // 把正则数组数据转化成对象数据
    var expJson = m.toObject(originalData('inputName'),originalData('exp'));
    // 把用户提示信息数组数据转化成对象数据
    var errorTipJson = m.toObject(originalData('inputName'),originalData('errorTip'));

    // input对象
    function InputClass(domInput){
        // domInput
        this.ipt = domInput;
        var key = this.ipt.name;
        // input的name属性
        this.inputName = this.ipt.name;
        // input的正则表达式
        this.exp = expJson[this.inputName];
        // input错误的提示信息
        this.errorTip = errorTipJson[this.inputName];
    }
    // input正确的提示信息
    InputClass.prototype.correctTip = '对了';
    // input为空的时候的提示信息
    InputClass.prototype.emptyTip = '草拟吗，你倒是填啊';
    // input验证方法
    InputClass.prototype.check = function(fn){
        var thisValue = this.ipt.value;
        if(thisValue === ''){
            this.removeDomTip();
            this.addDomTip(this.emptyTip);
            return false;
        }
        if(checkTest(thisValue,this.exp)){
            // 额，有点斜不下去了，不能这么搞，不能让外面给里面返回东西，
            fn && fn();
            method.rep(this.ipt,'false','true');
            this.removeDomTip();
            return true;
        }else{
            method.rep(this.ipt,'true','false');
            this.removeDomTip();
            this.addDomTip(this.errorTip);
            return false;
        }
    };
    // 添加提示信息到dom
    InputClass.prototype.addDomTip = function(activeTip){
        var domTip = document.createElement('div');
        domTip.className = 'domTip';
        domTip.innerHTML = activeTip;
        method.insertAfter(this.ipt,domTip);
    };
    // 删除提示信息到dom
    InputClass.prototype.removeDomTip = function(){
        var domTip = this.ipt.nextElementSibling;
        if(domTip && domTip.className === 'domTip') this.ipt.parentNode.removeChild(domTip);
    };

    // 逻辑过程
    // 还是沿用class，因为如果标签变了的话很讨厌
    var domInput = document.getElementsByClassName('check');
    for(var i = 0,len = domInput.length; i < len; i++){
        // 我要把这些创建的不同的对象返回出去，别的地方还要用
        var that = domInput[i];
        var input = window[that.name] = new InputClass(that);
        (function(input){
            domInput[i].onblur = function(){
                input.check();  
            };
        })(input);
    }

    // 这里是接口
    fn && fn();

    // 测试验证
    function checkTest(userValue,expJson){
        return expJson.test(userValue);
    }

}