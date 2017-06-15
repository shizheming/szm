// 面向对象编程
// 面向过程编程
// 面向数据编程
// 函数式编程

// 对象的特点：1，继承，2，封装，3，多态，
// 对象，（构造函数）类
// 是先有对象还是先有类？
// 传统的编程语言都是先创建一个类，再由类去创建对象，而js没有类，只有对象，类只是一个概念
// 举个例子，如果你是造物主，先会构造一个人的类，有属性和方法，然后再去创造一个人，
// 如果按照生物演化的过程，那是只有对象，然后发现，不同的人与人之间有很多共同的东西，就会把他提炼出来成为一个类
// js更贴切于后者

// 创建对象的方式：1，由构造函数创建对象，2，由对象直接量创建对象
// 对象继承的方式：1，由原型继承，2，由对象直接复制去过继承（1，浅复制，2，深复制）
// 多用组合，少用继承，如何组合，需要提供接口（特权方法）

// 封装：1，私有性（对外是访问不到的，安全性），2，接口（对外只提供接口操作，特权方法）

// 人类
// 组成属性：头，躯干，手，脚。属性是静态的
// 功能方法：吃，拉，跑，跳。。。。。。（等等）功能可以无限加，是动态的
// 由人的类创建一个具体的人的对象
// 只有头和躯干也能创建人对象，因为他是活的，所以人的类可以简化成
// 组成属性：头，躯干
// 功能方法：吃，拉
// 也就是说类这种抽象的概念有静态的成员属性和动态的方法，是些最最底层的东西，不单单是静态成员的概念
// 但网页中不像生活中有可以具体到实物的对象去思考类的概念，
// 那提取的还是活的，动的概念，那么就是功能，从功能出发创建类

// 性能：减少对象的创建，减少对dom的操作，多用变量缓存，减少判断，减少循环
// 把要操作的dom变成数组或是对象去操作它，也就是把dom放到数组或对象中，然后和操作对象和数组，而不是去不断的访问dom

// 面向对象就是不关心对象的内部是如何构造的，只要知道怎么使用这个对象就行了，就是使用接口


// 命名空间
var general = {
	// 去除后代元素的空白节点
	cleanGrandsonWhiteSpace : function(obj){
		var cishu = 0,
			_id = document.getElementById(obj),
			// id下面所有的后代元素不是节点
			_x = _id.getElementsByTagName('*'),
			_xl = _x.length;
			i = 0;
		// 删除id下面的子节点中的空白节点
		for(i = 0;i < _id.childNodes.length;i++){		
	        var node = _id.childNodes[i];
	        if(node.nodeType === 3 && !/\S/.test(node.nodeValue)){
	            node.parentNode.removeChild(node);
	        };
		};
		// 删除id下面后代元素中子节点中的空白节点
		for(var i = 0;i < _xl;i++){
			for(var ii = 0;ii < _x[i].childNodes.length;ii++){
				var node = _x[i].childNodes[ii];
				if(node.nodeType === 3 && !/\S/.test(node.nodeValue)){
				    node.parentNode.removeChild(node);
				};
			};
		};	
	}
};



// tab切换对象
// 做这个我需要标题，内容
// 保持面向对象，保持封装，保持私有性，保持接口
function Tab(obj){
	// 删除空白节点
	general.cleanGrandsonWhiteSpace(obj);
	// 准备工作
	var getId = obj,
		_id = document.getElementById(getId),
		_title = _id.childNodes[0],
		_content = _id.childNodes[1],
		i = 0,
		l = _title.childNodes.length,
		// 当动画运动中的变量
		dong = 0;
	// 索引标题
	for(i = 0;i < l;i++){
		_title.childNodes[i].index = i;
	};
	// 方法
	function method(o){
			//在不传入某些参数的情况下的默认值
		var j = o || {},
			_event = j._event || 'click',
			_fade = j._fade || false,
			newStyle = j._class || 'style',
			// 取到标题和内容的class，需要操作class
			baseContentStyle = _content.childNodes[0].className,
			baseTitleStyle = _title.childNodes[0].className,
			newContentStyle = baseContentStyle + ' ' + newStyle,
			newTitleStyle = baseTitleStyle + ' ' + newStyle,
			// 记录鼠标前一个的位置
			_position = 0;
		// 追加渐变函数，自动播放函数需要参数，我也写成这个函数的属性去外部获取
		arguments.callee.autoPlay = j._auto || false;
		arguments.callee.transitionSpeed = j._transitionSpeed || 10;
		arguments.callee.intervalSpeed = j._inervalSpeed || 3000
		// 让标题和内容的第一个元素加上class
		_content.childNodes[0].className = newContentStyle;
		_title.childNodes[0].className = newTitleStyle;
		// 鼠标事件
		function mouseEvent(e){
			var $this = e.target.index;
			// 判断鼠标事件进行同一个事情停止函数，当动画运动中是停止函数
			if(_position === $this || dong === 1){
				return;
			};
			// 前一个淡出
			var fadeOrNot = !_fade || fade(101,-1,_position,-1);
			// 把前一个class还原
			_content.childNodes[_position].className = baseContentStyle;
			_title.childNodes[_position].className = baseTitleStyle;
			// 添加删除class，隐藏显示交给css去做，js就控制行为
			_content.childNodes[$this].className = newContentStyle;
			_title.childNodes[$this].className = newTitleStyle;
			_position = $this;
			// 后一个淡入
			fadeOrNot = !_fade || fade(0,101,_position,1);
		};
		// 模拟鼠标事件
		!method.autoPlay || (function(){
			var e = document.createEvent('MouseEvents'),
					dot = 0,
					interval = 0;
	　　		e.initMouseEvent(_event,true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
			function imitationEvent(){
				dot = _position;
				if(dot < l - 1){
					++dot;
				}else if(dot === l - 1){
					dot = 0;
				};
				_title.childNodes[dot].dispatchEvent(e);
			};
			interval = setInterval(imitationEvent,method.intervalSpeed);
			function stopInterval(){
				clearInterval(interval);
			};
			function starInterval(){
				interval = setInterval(imitationEvent,method.intervalSpeed);
			};
			_id.addEventListener('mouseover',stopInterval,false);
			_id.addEventListener('mouseout',starInterval,false);
		})();
		_title.addEventListener(_event,mouseEvent,false);
	};
	// 追加渐隐效果方法
	function fade(_op,num,_p,_sp){
		var needle = _op;
		(function(){
			needle += _sp;
			if(needle === num){
				// 停止后的dong值
				dong = 0;
				return;
			};
			_content.childNodes[_p].style.opacity = needle/100;
			setTimeout(arguments.callee,method.transitionSpeed);
			// 运动中的dong值
			dong = 1;
		})();
	};
	// 接口
	this.cut = function(o){
		method(o);
	};
};


// 图片库对象
// 做这个我需要a，img
// 保持面向对象，保持封装，保持私有性，保持接口
function Pic(obj){
	// 准备工作
	var _id = document.getElementById(obj),
		_title = _id.getElementsByTagName('a'),
		_bigPic = _id.getElementsByTagName('img'),
		aLength = _title.length,
		i = 0,
		img = '',
		a = [];
	// 把所有a的href从dom中拿过来，组成数组，然后去操作数组
	for(i = 0;i < aLength;i++){
		a.push(_title[i].getAttribute('href'));
	};
	// 遍历a索引
	for(i = 0;i < aLength;i++){
		_title[i].index = i;
	};
	// 方法
	function s(sj){
		// 在不是点击的情况下取消点击的效果，只运行一次		
		if(sj !== 'click'){
			_id.getElementsByTagName('div')[0].addEventListener('click',function(e){
				e.preventDefault();
			},false);
		};
		// 绑定事件的函数
		function m(e){
			var $this = e.target.index;		
			// 取消鼠标默认效果
			e.preventDefault();
			// 当点击父亲的身体的时候停止函数，当鼠标在同一个对象上重复操作的时候停止函数
			if(e.target === e.currentTarget || a[$this] === img){
				return;
			};
			img = a[$this];
			// 替换src属性
			_bigPic[0].setAttribute('src',a[$this]);
		};
		// 绑定事件
		_id.getElementsByTagName('div')[0].addEventListener(sj,m,false);
	};
	// 接口
	this.showBigPic = function(sj){
		s(sj);
	};
};


// 滚动对象
// 构造函数创建类
var Strip = function(obj){
	this._id = document.getElementById(obj);//对象
	if(typeof(Strip.prototype.roll) === 'function'){
		return;
	};
	Strip.prototype.roll = function(obj){//滚动-成员方法
		var i = i2 = 0,
			now = 0,
			$this = this,
			style,
			l = this._id.childNodes.length;
		while(i < l){//查找内容元素后代节点，好蛋疼
			var node = this._id.childNodes[i];
			if(node.nodeType === 1){
				var l2 = node.childNodes.length;
				while(i2 < l2){
					var node2 = node.childNodes[i2];
					if(node2.nodeType === 1){
						this._con = node2;//内容-成员属性
						node.appendChild(this._con.cloneNode(true));//把克隆好的添加到文档里
					};
					i2++;
				};
			};
			i++;
		};
		var roll = function(){//滚动的不同方向的方法
			switch(obj._direction){
				case 'marginLeft' : style = 'width' 
				break;
				case 'marginTop' : style = 'height' 
				break;
				default : return false 
			};
			$this._con.style[obj._direction] = now + 'px';//每次调用函数设置边距
			now--;//调用一次函数减1
			if(now === -parseInt(document.defaultView.getComputedStyle($this._con).getPropertyValue(style))){
				now = 0;
			};
		};
		var set = setInterval(roll,obj._timeFast);
		this._id.onmouseover = function(){
			clearInterval(set);
		};
		this._id.onmouseout = function(){
			set = setInterval(roll,obj._timeFast);
		};
	};
};


// 拖拽对象
// 构造函数创建类
var Drag = function(obj,e){
	this._id = document.getElementById(obj);//对象id
	if(Drag.prototype.drag === 'function'){
		return;
	};
	Drag.prototype.drag = function(){//拖拽对象方法
		var $this = this,
			d = function(_this,e){//元素的位置属性，指针的位置属性
				$this._left = parseInt(document.defaultView.getComputedStyle(_this).getPropertyValue('left'));
				$this._top = parseInt(document.defaultView.getComputedStyle(_this).getPropertyValue('top'));
				$this._eX = e.clientX;
				$this._eY = e.clientY;			
			},
			m = function(e){//变化时的元素位置
				$this._id.style.left = e.clientX - $this._eX + $this._left + 'px';
				$this._id.style.top = e.clientY - $this._eY + $this._top + 'px';
			},
			u = function(){//取消绑定鼠标事件
				document.onmousemove = null;
				document.onmouseup = null;
			};
		this._id.onmousedown = function(e){//事件执行逻辑
			d(this,e);
			document.onmousemove = m;
			document.onmouseup = u;
			return false;
		};
	};
};


var ah = 0,
	speed2 = 0,
	timer = null,
	_id = document.getElementById('dd');

_id.onmouseover = function(){
	kk(100);
};

_id.onmouseout = function(){
	kk(0);
};

function kk(tt1){
	clearInterval(timer);
	timer = setInterval(function(){
		if(tt1 > ah){
			speed2 = 10;
		}else{
			speed2 = -10;
		};
		ah += speed2;
		if(ah === tt1){
			clearInterval(timer);
		};
		_id.style.opacity = ah/100;
		// console.log(ah)
	},100)
};