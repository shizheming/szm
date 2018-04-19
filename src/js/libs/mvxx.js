alert(123123);

/*****************************MVC**********************************/
/*
使用MVC的目的是将M和V的实现代码分离
C存在的目的则是确保M和V的同步，一旦M改变，V应该同步更新。

Model（模型）是应用程序中用于处理应用程序数据逻辑的部分。
通常模型对象负责在数据库中存取数据。

也就是说m层不单单是储存纯数据，还有数据之间的业务逻辑

MVC 分层有助于管理复杂的应用程序，因为您可以在一个时间内专门关注一个方面。例如，您可以在不依赖业务逻辑的情况下专注于视图设计。同时也让应用程序的测试更加容易。


Model（模型）是应用程序中用于处理应用程序数据逻辑的部分。
　　通常模型对象负责在数据库中存取数据。
View（视图）是应用程序中处理数据显示的部分。
　　通常视图是依据模型数据创建的。
Controller（控制器）是应用程序中处理用户交互的部分。
　　通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

控制器
控制器接受用户的输入并调用模型和视图去完成用户的需求，所以当单击Web页面中的超链接和发送HTML表单时，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后再确定用哪个视图来显示返回的数据。

*/


/*
我要写个公共调试的方法，不然分的很开后，上线忘了去掉很麻烦
需要个有些时候需要手机加密，然后我用游览器调试的时候就过不去，我得写个兼容的测试方法
我要写个各种测试的调试代码
*/





/************************mvp*************************/
// 怎么用
// 协议
// controller通过data-bind来从dom获取，model通过ajax后的josn映射来获取
// ajax通过jsonkey在model里面找obj，view通过tagname来找赋值对应的方法


// model只提供给view和controller增删改查的功能
// 数据模型
window.model = (function() {
	// 内部方法
	var privateMethod = {
		// 1.观察者
		observer : (function() {
			var myData;
			return function(json) {
				for (var key in json) {
					var arrKey = [];
					var arrVal = [];
					for (var key2 in json[key]) {
						arrKey.push(key2);
						arrVal.push(json[key][key2]);
					}
					// 创建观察者
					myData = _.myData(arrKey);
					(function(name) {
						var getObj = _.getObj(model.records, key);
						arrKey.forEach(function(a, b, c) {
							// 现在这里是一对一观察，如何变成一对多观察，减少观察者的同时提高性能，一个数据模型对象只有一个观察者，这个观察者观察这个数据模型对象里面所有的值的变化
							myData.listen(a, function(data) {
								// 通过a来判断监听的内容
								var obj = {
									reg : function() {
										// 这个值来判定他是空还是验证错了
										var num;
										if (!getObj[key].value) num = 0; else num = 1;
										var pass = privateMethod.verification(getObj[key].value, getObj[key].reg);
										if (pass) num = 2;
										// 设置验证状态
										var obj = {};
										obj[key] = {
											// regActive : pass
											regActive : num
										};
										model.set(obj);
										return num;
									}
								};
								// 给个默认运行函数
								obj[a] = isFunction(obj[a]) ? obj[a] : function() {}; 
								obj[a]();
								// 告知controller，model有变动
								controller.modelHooks({
									data : data,
									tagName : getObj[key].tagName,
									key : key,
									isWant : a,
									pass : a == 'reg' ? obj.reg() : undefined,
									placeholder : getObj[key].placeholder
								});
							});
							var obj = {};
							obj[a] = arrVal[b];
							myData.set(obj);
						});
					})(key);
				}
			};
		})(),
		// 2.单验证
		verification : function(str, reg) {
			return new RegExp(reg).test(str);
		},
		// 3.全验证
		allVerification : function() {
			for (var key in model.records) {
				for (var key2 in model.records[key]) {
					if (key2 == 'regActive') {
						// 通过0和1来告诉controller我是空还是验证失败
						// 0和1是给input框用的，因为input有2种状态，空的和错的，还同意只有一种，空的
						if (model.records[key][key2] === 0 || model.records[key][key2] === 1) {
							return key + model.records[key][key2];
						// 这里是给同意的
						} else if (model.records[key][key2] === false) return key;
					}
				}
			}
			return true;
		}
	};
	
	

	var newObj = {
		// 所有的数据
		records : '',
		// 删除某条数据
		del : function(key) {
			delete model.records[key];
		},
		// 删除所有的数据
		delAll : function() {
			model.records = {};
		},
		// 找到某条数据
		get : function(key) {
			// 这里要更新下如果是去找某个下面的下面的对象,现在先不管
			var arr = [];
			arr.push(model.records);
			arr.push(key);
			return _.getObj.apply(null, arr)[key];
		},
		// 设置数据
		set : function(json) {
			/*
				{
					phone : {
						ggg : 555
					},
					password : {
						jjj : 999
					}
				}
			*/
			for (var key in json) {
				var result = _.getObj(model.records, key);
				if (result) {
					// 初始化有的值对象里面添加或是修改值
					result = result[key];
					for (var key2 in json[key]) result[key2] = json[key][key2];
				} else {
					// 添加初始化没有的值对象
					model.records[key] = json[key];
				}
			}
			// 绑定观察者
			privateMethod.observer(json);
		},
		// 初始化数据层
		init : function(json) {
			model.records = json;
		},
		// 全验证
		allVerification : function() {
			// 添加选择
			return privateMethod.allVerification();
		}
	};
	return newObj;
})();

// 视图
window.view = (function(doc) {
	// 所有的方法
	var fnAll = {};

	// 1.赋值方法
	var fnName = ['innerHTML', 'value', 'src'];
	var fnBody = function(key) {
		return function(name, val) {
			var dom = doc.querySelector('[data-bind=' + name + ']');
			dom[key] = val;
		};
	};
	fnName.forEach(function(a, b, c) {
		fnAll['set' + a] = fnBody(a);
	});

	// 2.提示信息的方法
	fnAll.title = _.proxy(_.title, 2000);

	// 3.用户选择选项
	fnAll.choose = (function() {
		var choice = doc.querySelector('[data-choose]');
		if (!choice) return;
		var classN = choice.className;
		return function(active) {
			if (active) {
			    choice.classList.remove(classN);
			    active = false;
			} else {
			    choice.classList.add(classN);
			    active = true;
			}
		};
	})();

	// 倒计时
	fnAll.countDown = (function() {
		var down = doc.querySelector('[data-code]');
		if (!down) return;
		return function(text, time) {
			down.style.cssText = 'border:1px;background-color:#ccc;color:#333;';
			_.second(time, function(time) {
			    down.innerHTML = time;
			}, function() {
			    down.innerHTML = text;
			    down.style.cssText = '';
			});
		};
	})();


	return fnAll;
})(document);

// 控制器
window.controller = (function(doc) {
	// controller要初始化生成id
	var obj = {};
	var dom = doc.querySelectorAll('[data-bind]');
	var sub = doc.querySelector('[data-submit]');
	var choice = doc.querySelector('[data-choose]');
	var vertifyCode = doc.querySelector('[data-code]');
	if (!dom) return;
	[].forEach.call(dom, function(a, b, c) {
		

		// 添加对象属性
		obj[a.dataset.bind] = {};
		// 添加标签属性
		obj[a.dataset.bind].tagName = a.tagName.toLowerCase();
		obj[a.dataset.bind].reg = a.dataset.reg;
		obj[a.dataset.bind].placeholder = a.placeholder;
		obj[a.dataset.bind].regActive = a.regActive ? a.regActive : 0;
		// 初始化绑定事件
		if (obj[a.dataset.bind].tagName == 'input') {
			// 实时监控
			a.addEventListener('input', function() {
				var obj2 = {};
				obj2[a.dataset.bind] = {
					value : a.value
				};
				model.set(obj2);
			});
			// 失去焦点
			a.addEventListener('blur', function() {
				var obj2 = {};
				obj2[a.dataset.bind] = {
					reg : a.dataset.reg
				};
				model.set(obj2);
			});
		}
	});
	// 验证提交
	sub ? sub.addEventListener('click', function() {
		var result = model.allVerification();
		if (result !== true) {
			var key = /[^\d]+/.exec(result);
			var num = /\d/.exec(result);
			var arr = [function() {
				view.title('请填写' + _.getObj(model.records, key)[key].placeholder);
			}, function() {
				view.title(_.getObj(model.records, key)[key].placeholder);
			}];
			// 因为这里有可能是同意
			num === null ? num = 1 : num;
			arr[num]();
			return;
		}
		controller.ajax();
	}) : '';
	// 用户选择项
	if (choice) {
		obj[choice.dataset.choose] = {};
		obj[choice.dataset.choose].placeholder = choice.dataset.placeholder;
		obj[choice.dataset.choose].regActive = choice.dataset.active;
		choice.addEventListener('touchstart', function() {
			var choiceActive = model.get(choice.dataset.choose).regActive;
			var newO = {};
			newO[choice.dataset.choose] = {};
			newO[choice.dataset.choose].regActive = choiceActive ? false : true;
			model.set(newO);
			view.choose(choiceActive);
		});
	}
	// 验证码
	if (vertifyCode) {
		vertifyCode.addEventListener('touchstart', function() {
			if (!isNaN(vertifyCode.innerHTML)) return;
			controller.vertifyCode();
		});
	}

	// 初始model
	model.init(obj);
	
	return {
		modelHooks : function(json) {
			// 不同的key触发不同的view或是用户自己绑定的时间
			// value内定
			var obj = {
				value : function() {
					var tag = {
						value : ['input'],
						src : ['img'],
						innerHTML : ['div']
					};
					// view显示值
					for (var key in tag) {
						if (json.tagName == tag[key]) view['set' + key](json.key, json.data);
					}
				},
				reg : function() {
					var arr = [function() {
						// 空的不提示
						// view.title('请填写' + json.placeholder);
					}, function() {
						view.title(json.placeholder);
					}, function() {}];
					arr[json.pass]();
				}
			};
			var want = isFunction(obj[json.isWant]) ? obj[json.isWant] : function() {};
			want();
		},
		viewHooks : function() {},
		ajax : function() {
			console.log('success!!!');
		},
		vertifyCode : function() {
			view.countDown('验证码', 60);
		},
		init : function() {
			// 初始页面也要初始数据，万一人家输入数据跳出页面然后又回退回来，游览器会记录数据，我不会
			if (!dom) return;
			// 看看是不是第一次，看看有没有一个值
			if ([].every.call(dom, function(that) {
				return that.value == '';
			})) return;
			[].forEach.call(dom, function(a, b, c) {
				// 获取并触发验证
				var cObj2 = {};
				cObj2[a.dataset.bind] = {
					value : a.value,
					reg : a.dataset.reg
				};
				model.set(cObj2);
			});
		}
	};
})(document);