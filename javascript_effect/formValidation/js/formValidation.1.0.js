// 名称：formValidation.js
// 版本：1.0
// 时间：2015.7
// ------------------------------------------------------------
function formValidation(id){
    var form1 = document.getElementById(id);
    if(!form1) return;
    var test = document.getElementsByClassName('test');
    var testJson = {
        time : /^(?:2[0-3]|[01][0-9]):(?:[0-5][0-9])$/,
        date : /^(?:0[13578]|1[02])(?:3[01]|[12][0-9]|0[1-9])$|^(?:0[469]|11)(?:30|[12][0-9]|0[1-9])$|^02(?:[12][0-9]|0[1-9])$/,
        chinaName : /^[\u4e00-\u9fa5]+$/,
        IDcard : /(^[1-9]\d{5}[12]\d{3}((0[1-9])|1[0-2])(([012]\d)|3[01])\d{3}(\d|x)$)|(^[1-9]\d{7}((0[1-9])|1[0-2])(([012]\d)|3[01])\d{3}$)/i,
        company : /^[^\s]+$/,
        landline : /^(0[1-9]\d{1,2}-)?[1-9]\d{6,7}$/,
        phone : /^1[358]\d{9}$/,
        email : /^\w+@[a-z0-9\-]+(\.[a-z]{2,6}){1,2}$/i,
        bank_number : /^\d{16}|\d{19}$/,
        money : /^[1-9](\d+)?$/,
        password : /^.{6,}$/,
        password_confirmation : /^.{6,}$/
    };
    var testJsonText = {
        time : '请输入正确的时间',
        date : '请正确输入的日期',
        chinaName : '请输入正确的中文',
        IDcard : '请正确输入身份证',
        company : '请输入机构',
        landline : '请正确输入固定电话',
        phone : '请正确输入手机',
        email : '请正确输入邮箱',
        bank_number : '请正确输入银行卡',
        money : '请输入有效的整数',
        password : '不能少于6位',
        password_confirmation : '输入与上次不符'
    };
    var testJsonTextUser = {
        time : null,// 时间
        date : null,// 日期
        chinaName : null,// 中文用户名
        IDcard : null,// 身份证
        company : null,// 公司名称
        landline : null,// 座机号
        phone : null,// 手机号码
        email : null,// 电子邮件
        bank_number : null,// 银行卡号
        money : null,// 提现金额
        password : null,// 新密码
        password_confirmation : null// 确认新密码
    };
    for(var i = 0,len = test.length; i < len; i++){
        var re = testJson[test[i].name];
        var re2 = testJsonText[test[i].name];
        (function(re,re2){
            test[i].onblur = function(){
                if(this.value === '') return;
                checkTest(this,re,re2,testJsonTextUser);
            };
            test[i].onfocus = function(){
                if(this.value !== '' && /false/.test(this.className)){
                    this.value = testJsonTextUser[this.name];
                    this.style.color = '#333';
                    if(this.name === 'password' || this.name === 'password_confirmation') this.type = 'password';
                };
            };
        })(re,re2);
    };
    form1.onsubmit = function(){
        var bl = true;
        for(var i = 0; i < len; i++){
            var re = testJson[test[i].name];
            var re2 = testJsonText[test[i].name];
            if(checkTest(test[i],re,re2,testJsonTextUser) === false) bl = false;
        };
        if(!bl) return false;
    };
    function errorMessage(obj,re2,bl,testJsonTextUser){
        if(!bl && obj.value !== ''){
            var oldV = obj.value;
            testJsonTextUser[obj.name] = oldV;
            obj.value = re2;
            obj.style.color = 'red';
            if(obj.name === 'password' || obj.name === 'password_confirmation') obj.type = 'text';
        };
    };
    function checkTest(obj,re,re2,testJsonTextUser){
        if(obj.value === re2) return false;
        var bl = re.test(obj.value);
        if(bl){
            method.addClass(obj,'true');
            method.removeClass(obj,'false');
            if(obj.name === 'password_confirmation' && document.getElementsByName('password')[0].value !== obj.value){
                method.addClass(obj,'false');
                method.removeClass(obj,'true');
                bl = false;
                errorMessage(obj,re2,bl,testJsonTextUser);
                return false;
            };
            errorMessage(obj,re2,bl,testJsonTextUser);
            return true;
        }else{
            method.addClass(obj,'false');
            method.removeClass(obj,'true');
            errorMessage(obj,re2,bl,testJsonTextUser);
            return false;
        };
    };
};