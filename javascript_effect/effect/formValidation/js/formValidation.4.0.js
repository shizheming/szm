// 名称：formValidation.js
// 版本：4.0
// 时间：2017.1
// 更新：1.把表单验证从面向对象变成函数式的写法
// 		 2.把静态添加验证方法变成实时动态添加验证
// 		 3.分离数据层，dom事件绑定层
// ------------------------------------------------------------



// dom
// data
// reg
// 动态

/*{
	正则
	reg : /\d{11}/,
	是什么框
	name : '电话',
	框的id
	id : 'phone',
	用内置的正则判断
	type : 'tel',

	验证这个框之前需要先验证框的id----待定
	before : 'verify'
}*/

window.formverify = function(request, fn, allMsg) {
	var dl = testData();
	var cl = testClick(request, dl, fn, allMsg);
	// DATA-layer
	function testData() {
		var common = {
			tel : /^\d{11}$/,
			IDcard : /(?:^\w{18}$)|(?:^\w{15}$)/,
			mail : /^.+?@.+?$/,
			init : /^\w+$/
		};
		var inputObj = [];
		// ID
		var inputID = [];
		// 验证
		function onceVerify(rex, val) {
			return rex.test(val);
		}
		
		var method = {
			add : function(ipt, msgFn) {
				var act = inputID.some(function(a, b, c) {
					return a === ipt.id;
				});
				if (act) return;
				if (ipt.type) ipt.regex = common[ipt.type];
				if (!ipt.regex) ipt.regex = common.init;
				inputObj.push(ipt);
				inputID.push(ipt.id);
				// 初始化val
				ipt.val = '';
				// 触发dom层事件添加绑定
				// c,d都是运行产生的对象，2个钩子都要对挂主次有点问题
				cl.addBind(ipt.id, dl, msgFn);
			},
			remove : function(id) {
				inputObj.some(function(a, b, c) {
					var status = false;
					if (a.id === id) {
						c.splice(b, 1);
						inputID.splice(b, 1);
						// 触发dom层事件接触绑定
						cl.removeBind(a.id);
						status = true;
					}
					return status;
				});
			},
			addVal : function(id, val) {
				var index = inputID.indexOf(id);
				if (val === '' || inputObj[index].val === val) return {
					name : inputObj[index].name,
					active : false
				};
				inputObj[index].val = val;
				// 有了值后就要触发验证了
				return {
					name : inputObj[index].name,
					active : onceVerify(inputObj[index].regex, val)
				};
			},
			verify : function() {
				var content;
				inputObj.some(function(a, b, c) {
					var active = onceVerify(a.regex, a.val);
					var index = inputID.indexOf(a.id);
					if (!active) content = inputObj[index].name;
					return !active;
				});
				return content ? content : true;
			}
		};
		return method;
	}

	// DOM-layer
	function testClick(request, dl, fn, allMsg) {
		var domID = {};
		var doc = document;
		doc.getElementById(request).addEventListener('touchstart', function() {
			var active = dl.verify();
			if (active !== true) {
				allMsg && allMsg(active);
				console.log(active);
				return;
			}
			// ajax提交的地方
			fn && fn();
		});
		return {
			addBind : function(ID, dataLayer, msgFn) {
				domID[ID] = {};
				domID[ID].obj = doc.getElementById(ID);
				domID[ID].fn = function() {
					// 触发data层数据改变
					var pass = dataLayer.addVal(ID, this.value);
					var msgResult = msgFn || allMsg;
					// 当独立信息和统一信息一同存在是，独立信息权重高于统一信息
					if (!pass.active) msgResult && msgResult(pass.name);
					// msgFn独立验证信息操作
					// allMsg统一信息操作
				};
				// 如果不是text，是radio，checkbox，或是不作用在自己身上，比如获取验证码
				// 这只是一种情况,先不管其他情况
				domID[ID].obj.addEventListener('blur', domID[ID].fn);
			},
			removeBind : function(ID) {
				domID[ID].obj.removeEventListener('blur', domID[ID].fn);
			}
		};

	}
	return dl;
}
