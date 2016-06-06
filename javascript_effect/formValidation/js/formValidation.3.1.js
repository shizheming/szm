// 名称：formValidation.js
// 版本：3.0
// 时间：2016.3
// 更新内容：事件变为绑定，本来是通过name值来获取对象，现在改为id获取对象，因为如果后台套模板的时候把name都变成一样的时候就费了
// ------------------------------------------------------------

// 用法-格式
/*new FormValidation('formValidation', [{
    iptName: 'userID',
    regex: /(?:^\w{18}$)|(?:^\w{15}$)/,
    chinaName: '身份证'
}, {
    chinaName: '真实姓名',
    iptName: 'userName',
    regex: /^.{1,}$/
}], function (ipt) {
    // 操作验证后的输出信息
}, function (ipts) {
	...
});*/


// 1.首先把传进来的数据变成对象的数据，也就是变成对象的属性或方法，然后就是操作对象了
// 2.然后是添加需要输出的对象，或是对用户开放的扩展方法
// 3.为对象添加独立的事件对象，每创建一个对象就会绑定一个事件，因为是独立的，所以不能写在原型里


// 创建表单对象
function FormValidation(id,fields,callBack,formSubmit){

	// 回调函数变成对象的函数
	this.callBack = callBack;
	// dom表单对象
	this.domForm = document.getElementById(id);

	if(!this.domForm) return;

	// 表单最终能提交与否
	this.errors = [];

	// 储存创建的input对象
	this.inputObject = [];

	// 提交表单时的回调函数
	this.formSubmit = formSubmit;

	// 整个表单input绑定失焦事件
	for(var i = 0,len = fields.length; i < len; i++){
		// 如果找不到iptName的值，那就自动过滤
		if(!document.getElementById(fields[i].iptName)) continue;
		// 把符合的填到inputObject
		this.inputObject.push(new InputClass(fields[i],this.domForm));
		
		var err = this.inputObject[this.inputObject.length - 1];

		// 当时radio或checkbox的时候添加点击事件
		if(err.iptType === 'radio' || err.iptType === 'checkbox'){
			// 有时候err.element是数组，有时候不是数组，如果分为2种情况if else的话我就要写两遍鼠标事件，而现在是把不是数组变成了数组，那就只要写一遍了，也就是重归同意，而不会继续分裂，好厉害，这思想！！
			var arr = [];
			if(err.element.length > 1) for(var k = 0,len3 = err.element.length; k < len3; k++) arr.push(err.element[k]); else arr.push(err.element);

			for(var j = 0,len2 = arr.length; j < len2; j++){
				arr[j].onclick = (function(err,that){
					return function(){
						err.userChecked = this.checked;
						// 开始单个验证
						err.validateField(that.inputObject);
						// 运行回调函数
						that.callBack(err);
					};
				})(err,this);
			}
			
			continue;
		}

		err.element.addEventListener('blur',(function(err,that,thats){
			return function(){
				// 触发事件时给input对象添加属性
				err.userValue = that.value;
				// 开始单个验证
				err.validateField(thats.inputObject);

				// 运行回调函数
				thats.callBack(err);

			};
		})(err,err.element,this),false);
	}
	// 绑定整个表单提交事件

	this.domForm.querySelector('input[type="submit"]').addEventListener('click',(function(that){
		return function(event){
			that.validateForm(that.inputObject);
			for(var i = 0,len = that.errors.length;i < len; i++) if(!that.errors[i]){
				event.preventDefault();
				return;
			};

			that.formSubmit(that.inputObject);

			event.preventDefault();
			// return false;

		};
	})(this),false);


}

// 表单验证
FormValidation.prototype.validateForm = function(inputObjects){
	// 每次点提交请空下
	this.errors = [];

	for(var i = 0,len = inputObjects.length; i < len; i++){
		// 触发事件时给input对象添加属性
		inputObjects[i].userValue = inputObjects[i].element.value;

		inputObjects[i].validateField(this.inputObject);

		if(!inputObjects[i].active) this.errors.push(false);

		// 运行回调函数
		this.callBack(inputObjects[i]);
	}

};


// 创建input对象
function InputClass(field,parents){
	var element = document.getElementById(field.iptName);

	this.parents = parents;
	this.iptName = field.iptName;
	this.element = element;
	// 先确定type类型
	this.iptType = this.element.length > 1 ? this.element[0].type : this.element.type;
	this.chinaName = field.chinaName || '';

	this.regex = field.regex;
	this.message = field.message || ((this.iptType === 'radio' || this.iptType === 'checkbox') ? '你他妈倒是选' + this.chinaName + '啊！！！' : this.chinaName + '不正确');
	this.depends = field.depends;
	this.addRules = field.addRules;
	this.userValue = null;
	this.userChecked = null;
	// 通过还是不通过验证
	this.active = false;
	// 没填的状态
	this.def = (this.iptType === 'radio' || this.iptType === 'checkbox') ? '快选' + this.chinaName + '啊!!!!' : '请输入' + this.chinaName;

	// 2个信息需要互换，先存一下
	var messages = [this.message,this.def];
	this.getMessages = function(){
		return messages;
	};

}

// 验证字单个段
InputClass.prototype.validateField = function(inputObjects){

	// 1.首先看看有没有填
	if(!this.hooks.required.call(this)){
		// 没有填的话就提示她填
		this.message = this.getMessages()[1];
		this.active = false;
		return;
	}else{
		this.active = true;
		// 设置回初始的信息
		this.message = this.getMessages()[0];
	}

	

	// 2.看看正则过了没过
	if(this.regex){
		if(this.checkRegex(this.userValue,this.regex)) this.active = true; else{
			this.active = false;
			return;
		}
	}

	// 没有正则的情况下，像radio或是checkout
	if(this.iptType === 'radio' || this.iptType === 'checkbox') this.active = this.userChecked;

	// 3.才是有没有叠加规则
	if(this.addRules){
		var re = this.addRules.match(/^(.+)\[(.+)\]$/);
		var iptName = re[2];
		var hook = re[1];
		// 这里用call是因为方法里面有this，但指向的对象并不是我想要对象，所以我自己传进去
		if(this.hooks[hook].call(this,iptName,inputObjects)) this.active = true; else{
			this.active = false;
			return;
		}
			
	}

	// 4.看看有没有回调函数的规则
	if(this.depends){
		if(this.depends(this)) this.active = true; else{
			this.active = false;
			return;
		}
	}
};

// 测试正则
InputClass.prototype.checkRegex = function(userValue,expJson){
    return expJson.test(userValue);
};

// 附加验证规则addRules
InputClass.prototype.hooks = {
	// 值为不为空
	required : function(){
		if(this.iptType === 'radio' || this.iptType === 'checkbox') return this.userChecked === true;
		return this.userValue !== '';
	},
	// 2个值相不相等
	matches : function(iptName){
		var el = this.parents[iptName];
		return this.userValue === el.value;
	},
	// 2个之间的验证顺序
	sequence : function(iptName,inputObjects){
		var el = this.parents[iptName];
		for(var i = 0,len = inputObjects.length; i < len; i++){
			// 找到需要首先验证的对象，然后进行验证
			if(inputObjects[i].iptName === iptName){
				if(!inputObjects[i].active){
					el.focus();
					el.blur();
					var mes = this.message;
					this.message = '';
					return inputObjects[i].active;
				}else return this.active;
			}
		}
	}
};