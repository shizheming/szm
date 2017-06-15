// 名称：form.js
// 版本：1.0
// 时间：2015.8
// ------------------------------------------------------------
// 多选按钮
function initCheckBox(id,name){
	var obj = document.getElementById(id),
		ipt = document.getElementsByName(name),
		myCheckBox = obj.getElementsByClassName('myCheckBox');
	for(var i = 0,len = ipt.length; i < len; i++){
		var cSpan = document.createElement('span');
		cSpan.className = 'myCheckBox';
		cSpan.href = '';
		(function(index){
			cSpan.onclick = function(){
				if(this.className.indexOf('active') + 1){
					method.removeClass(this,'active');
					ipt[index].checked = false;
				}else{
					method.addClass(this,'active');
					ipt[index].checked = true;
				};
			};
		})(i);
		obj.insertBefore(cSpan,ipt[i]);
	};
};
// 单选按钮
function initRadio(id,name){
	var obj = document.getElementById(id),
		ipt = document.getElementsByName(name),
		myRadio = obj.getElementsByClassName('myRadio');
	for(var i = 0,len = ipt.length; i < len; i++){
		var cSpan = document.createElement('span');
		cSpan.className = 'myRadio';
		cSpan.href = '';
		(function(index){
			cSpan.onclick = function(){
				for(var i = 0,len = myRadio.length; i < len; i++){
					method.removeClass(myRadio[i],'active');
				};
				method.addClass(this,'active');
				ipt[index].checked = true;
			};
		})(i);
		obj.insertBefore(cSpan,ipt[i]);
	};
};
// 下拉框
function initSelect(id,name){
	var obj = document.getElementById(id),
		sel = document.getElementsByName(name)[0],
		mySel = document.createElement('div'),
		cSpan = document.createElement('span'),
		cSpanT = document.createTextNode(sel.value),
		cUl = document.createElement('ul');
	cSpan.appendChild(cSpanT);
	mySel.appendChild(cSpan);
	mySel.className = 'mySelect';
	var bl = true;
	cSpan.onclick = function(ev){
		if(bl){
			cUl.style.display = 'block';
			bl = false;
		}else{
			cUl.style.display = 'none';
			bl = true;
		};
		ev.stopPropagation();
	};
	// document要绑一下，如果用属性的话会被后面的事件覆盖
	document.addEventListener('click',function(){
		cUl.style.display = 'none';
		bl = true;
	},false);
	for(var i = 0,len = sel.options.length; i < len; i++){
		var cLi = document.createElement('li'),
			cLiT = document.createTextNode(sel.options[i].text);
		(function(index){
			cLi.onclick = function(){
				cSpan.childNodes[0].nodeValue = this.childNodes[0].nodeValue;
				sel.selectedIndex = index;
				cUl.style.display = 'none';
				bl = true;
			};
		})(i);
		cLi.appendChild(cLiT);
		cUl.appendChild(cLi);
		mySel.appendChild(cUl);
	};
	obj.appendChild(mySel);
};
// tips
function inputCue(id,val){
	var obj = document.getElementById(id);
	// var val = obj.value;用户点返回后会有问题，会记录下用户输的内容
	obj.onfocus = function(){
		if(this.value === val) this.value = '';
		method.addClass(obj,'active');
	};
	obj.onblur = function(){
		if(this.value === ''){
			this.value = val;
			method.removeClass(obj,'active');
		};
	};
};