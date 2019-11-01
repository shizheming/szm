// 版本：0.2
// 时间：2016.12
// 更新：分类1.一阶函数2.高阶函数3.设计模式4.DOM
// ------------------------------------------------------------

window._ = {

    /******************常用一阶函数******************/

    // 随机n-m之间的数
    random: function (n, m) {
        return parseInt(n + Math.random() * (m - n));
    },
    // 去重
    only: function (arr) {
        var arr2 = [];

        function findInArr (arr, num) {
            for (var i = 0, len = arr.length; i < len; i++) if (arr[i] === num) return true;
            return false;
        };
        i = 0;
        while (i < arr.length) {
            if (!findInArr(arr2, arr[i])) arr2.push(arr[i]);
            i++;
        };
        return arr2;
    },
    // 补零
    zero: function (n) {
        return n < 10 ? '0' + n : '' + n;
    },
    // 打乱顺序
    shuffle: function (obj) {
	    var length = obj.length;
	    var shuffled = Array(length);

	    for (var index = 0, rand; index < length; index++) {
	        rand = n(0, index);
	        if (rand !== index) shuffled[index] = shuffled[rand];
	        shuffled[rand] = obj[index];
	    }
	    return shuffled;
    },
    // k函数 返回一个用一次的变量
    val: function (val) {
	    return val;
    },
    // 最大值
    max: function (arr) {
        return Math.max.apply(null, arr);
    },
    // 最小值
    min: function (arr) {
        return Math.min.apply(null, arr);
    },
    // 判断一个值存在数组中没有
    include: function (arr, target) {
        return arr.indexOf(target) != -1;
    },
    // 删除数组中的元素
    without: function (array, del) {
        var result = [];

        array.forEach(function (a, b, c) {
            if (a != del) result.push(a);
        });
        return result;
    },
    // 动态加载js
    loadJs: function (url, fn) {
        var doc = document;
	    var oHead = doc.querySelector('head'); 
	    var oScript = doc.createElement('script'); 

	    oScript.src = url;
	    oScript.onload = function () {
	    	fn && fn();
	    }; 
	    oHead.appendChild(oScript);
    },
    // 数组扁平化
    arrFlatten: function (input) {
        var result = [];

        for (var i = 0, length = input.length; i < length; i++) {
            var value = input[i];

            if (Array.isArray(value)) {
                value = arrFlatten(value);
                for (var j = 0, len = value.length; j < len; j++) result.push(value[j]);
            } else result.push(value);
        }
        return result;
    },
    // 返回当前日期信息
    date: function (time) {
	    var n = new Date(time);

	    return [n.getFullYear(), n.getMonth() + 1, n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds()];
    },
    // 数字3位加逗号，金钱显示
    money: function (num) {
        return num.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^\,/, '');
    },
    // 获取某个月份的天数
    days: function (year, month) {
	    return new Date(year, month, 0).getDate();
    },
    // 秒倒计时
    second: function (time, fn1, fn2) {
        var timer = setInterval(function () {
		    time--;
		    fn1 && fn1();
		    if (time == 0) {
		        clearInterval(timer);
		        fn2 && fn2();
		    }
        }, 1000);
    },
    // 完整的倒计时
    countDown: function (c, fn) {
        upDate(c, fn);
        var timer = setInterval(function () {
            if (!upDate(c, fn)) clearInterval(timer);
        }, 1000);

        function upDate (c, fn) {
            var d = new Date();
            //获取当前时间戳
            var nowTime = d.getTime();
            // 后台直接给了时间戳，我这里不用写
            // d.setFullYear(y1, y2, y3);
            // d.setHours(0, 0, 0, 0);
            //结束时间戳
            // var overTime = d.getTime();
            var overTime = c * 1000;
            //结束事件戳-当前时间戳 
            var mist = parseInt((overTime - nowTime) / 1000);
            var date = parseInt(mist / 86400);
            //去天后的秒数

            mist = mist % 86400;	
            var hours = parseInt(mist / 3600);
            //去小时后的秒数

            mist = mist % 3600;
            var minutes = parseInt(mist / 60);

            mist = mist % 60;
            fn && fn(date, hours, minutes, mist);
            return date + hours + minutes + mist;
        }
    },
    // 随机颜色
    randomColor: function () {
        return '#' + Math.floor(Math.random() * parseInt('0xffffff', 16).toString(10)).toString(16);
    },
    // 判断2个集合是否相等
    equal: function (a, b, aStack, bStack) {
        var c1 = Object.prototype.toString.call(a);
        // 类型不同直接out

        if (c1 !== Object.prototype.toString.call(b)) return false;
        // 判断不同类型
        // 最终还是直达基本类型来比较
        switch (c1) {
            case '[object String]' :
            case '[object RegExp]' :
                return '' + a === '' + b;
            case '[object Number]' :
            case '[object Date]' :
            case '[object Boolean]' :
                return +a === +b;
        }
        // 初次就产生栈
        aStack = aStack || [];
        bStack = bStack || [];
        // 进栈
        aStack.push(a);
        bStack.push(b);
        // 从a的key入手
        var akeys = Object.keys(a);
        var key;
        var length = akeys.length;
        // 首先判断2个集合的长度是否一样，不一样就立马停掉，后面都不需要做了

        if (length !== Object.keys(b).length) return false;
        while (length--) {
            // 每个key
            key = akeys[length];
            // 开始判断了
            if (!equal(a[key], b[key], aStack, bStack)) return false;
        }
        // 这个维度验证通过，栈弹出

        // 直接递归就可以了，为什么还要用到栈呢？？？？？

        aStack.pop();
        bStack.pop();
        // 到这里就说明这一维度的数组的值相等
        return true;
    },
    // html渲染模板
    /*
		[??] : 重复输出-放哪里都一样
		(=属性名=) : 需要套的地方的语法
		<div id="mm">
			<script type="szm" id="mod">
				[??]
				<div class="img">
					<input value="商品名称：(=thumb=)">
				</div>
				<div class="main">
					<span class="text-org mui-h4"><em>商品价格：￥(=shop_price=)</em></span>
				    <div class="hd-h5 margin-small-top">到货天数：(=days.hello=)</div>
				</div>
			</script>
		</div>
		var a = rendering(document.getElementById('mm').innerHTML, {
			thumb : 1,
			shop_price : 2,
			days : {
				hello : 3
			}
		});
	*/
    // 现在只能在结构不变的情况下循环动态渲染，结构变了就挂了
    // data如果不是json而是数组呢，那就又挂了
    // 如果后台返回的数据有判断状态的，那就又挂了
    // 这种模板也需要中间层不是因为有时候需要处理后台给的原始数据，比如时间戳
    rendering: function (m, data) {
        var result = '';
        var re = /\[\?\?\]/.exec(m);
        // 循环输出

        if (re) {
            m = m.replace(re[0], '');
            var keys = Object.keys(data);

            keys.forEach(function (a, b, c) {
                result += che(m, data[a]);
            });
            return result;
        }
        // 单输出
        function che (m, data) {
            // 匹配属性替换json的值
            var re = /\(=.*?=\)/g;
            var rs;

            while ((rs = re.exec(m)) != null) {
                // 去标签,吧标签变成属性名
                // 如果是嵌套属性？？？？？？？
                // 解决了
                var x = rs[0].replace(/\(=(.*?\.?)=\)/, '$1');
                // 有嵌套

                if (/.*?\./.exec(x)) {
                    var lastz;
                    // 嵌套变数组
                    var jk = x.split('.');

                    for (var u = 0, ll = jk.length; u < ll; u++) {
                        if (!lastz) {
                            lastz = data[jk[0]];
                        } else {
                            lastz = lastz[jk[u]];
                        }
                    }
                    // 替换属性名变属性值
                    m = m.replace(rs[0], lastz);
                } else {
                    // 替换属性名变属性值
                    m = m.replace(rs[0], data[x]);
                }
            }
            return m;
        }
        return che(m, data);
    },

    /******************常用高阶函数******************/

    /*
		var a = once(function() {
			alert(1);
		});
		a();
		a();
		a();
	*/
    // 只运行一次的函数
    once: function (fn) {
        var sc = true;

        return function () {
            if (sc) fn();
            sc = false;
        };
    },
    // 函数节流
    throttle: function (fn, interval) {
        var self = fn;
        var timer;
        var firstTime = true;

        return function () {
            var args = arguments;
            var me = this;

            if (firstTime) {
                self.apply(me, args);
                return firstTime = false;
            }
            if (timer) {
                return false;
            }
            timer = setTimeout(function () {
                clearInterval(timer);
                timer = null;
                self.apply(me, args);
            }, interval || 500);
        };
    },
    // always函数 存一个变量的状态
    always: function (val, arr) {
	    return function () {
	        return Array.isArray(arr) ? val.apply(null, arr) : val;
	    };
    },
    // 延迟列队
    queue: function (time) {
	    return (function (arr, t) {
	        return function (fn) {
	            arr.push(fn);
	            setTimeout(function () {
	                arr[0]();
	                arr.shift();
	            }, ++t * time);
	        };
	    })([], 0);
    },
    // ajax提交的开关，可以设置多个开关
    // 异步的开关
    // 一个都不能少开关
    /*
		var a = biro({
			bl : true,
			argee : true
		});
		submit.addEventlistener('touchstart', function() {
			// 开关
			if (a.get()) return;
			a.set({
				bl : true,
				argee : true
			});
			$.ajax({
			    complete: function () {
			        a.set({
			        	bl : true,
			        	argee : true
			        });
			    },
			    error: function (msg) {
			    },
			    success: function (msg) {
			    }
			});
		}, false);
	*/
    btnActive: function (json) {
        var status = true;

        return {
            set: function (n) {
                for (var key in n) {
                    if (json[key] === void 0) continue;
                    json[key] = n[key];
                }
            },
            get: function () {
                for (var key in json) if (!json[key]) status = false;
                return status;
            }
        };
    },

    /********************设计模式******************/

    // 状态对象
    /*var myState = {
		openState : function() {
			console.log('开');
			// 切换状态
			objState.setState(myState.big);
		},
		closeState : function() {
			console.log('关');
			// 切换状态
			objState.setState(myState.openState);
		},
		big : function() {
			console.log('大');
			objState.setState(myState.small);
		},
		small : function() {
			console.log('小');
			objState.setState(myState.closeState);
		}
	};

	var objState = {
		setState : function(stateObj) {
			this.currState = stateObj;
		},
		// 以前当前状态的值是其本类型，现在变成对象，状态对象，使得状态变的更立体，更丰满
		// 默认指向开对象
		currState : myState.openState
	};
	<body>
		<div id="ss"></div>
	</body>
	ss.onclick = function() {
		
		objState.currState();
	};*/
    // 职责连设计模式
    /*
		function a(a1) {
			if (a1 == 'a') alert('我是一等公民'); else return true;
		}
		function b(b1) {
			if (b1 == 'b') alert('二等公民是我'); else return true;
		}
		function c() {
			alert('我是农民');
		}
		var s1 = chain(a);
		var s2 = chain(b);
		var s3 = chain(c);
		s1.setNext(s2);
		s2.setNext(s3);
		s1.request('d');
	*/
    chain: (function () {
        function setNext (successor) {
            this.successor = successor;
        }
        function request () {
            var ret = this.fn.apply(null, arguments);

            if (ret) this.successor && this.successor.request.apply(this.successor, arguments);
        }
        return function (fn) {
            return {
                fn: fn,
                setNext: setNext,
                request: request
            };
        };
    })(),
    // 发布订阅设计模式
    /*
	{
		accont : '',
		password : '',
		smscode : ''
	}
	// 初始化key
	var a = myData(['accont', 'password', 'smscode']);
	// 监听
	a.listen('accont', function () {
		console.log('我动了accont');
	});
	a.listen('password', function () {
		console.log('我动了password');
	});
	a.listen('smscode', function () {
		console.log('我动了smscode');
	});
	// 发布新数据
	accont.addEventListener('blur', function() {
		a.set({
			accont : this.value
		});
	}, false);
	password.addEventListener('blur', function() {
		a.set({
			password : this.value
		});
	}, false);
	smscode.addEventListener('blur', function() {
		a.set({
			smscode : this.value
		});
	}, false);
	// 提交
	submit.addEventListener('touchstart', function() {
		// 获取数据
		console.log({
			accont : a.get('accont'),
			password : a.get('password'),
			smscode : a.get('smscode')
		})
	}, false);*/
    myData: function (arr) {
        var d = {
            client: []
        };
        // 老数据
        var od = {};
        // 数据层初始化

        for (var i = 0, len = arr.length; i < len; i++) {
            d[arr[i]] = '';
            od[arr[i]] = '';
        }
        var method = {
            set: function (json) {
                var num = 0;
                var newarr = [];

                for (var key in json) {
                    // 1. 过滤有没有
                    if (d[key] === void 0) continue;
                    // 2. 还得过滤和之前的发生了变化没有
                    d[key] = json[key];
                    if (d[key] === od[key]) continue; else od[key] = d[key];
                    newarr.push(key);
                    num++;
                }
                // 有变化的时候再去执行对应的函数
                if (num) {
                    for (var i = 0, len = d.client.length; i < len; i++) {
                        for (var j = 0, len2 = newarr.length; j < len2; j++) {
                            // key
                            for (var key in d.client[i]) {
                                if (key == newarr[j]) {
                                    d.client[i][newarr[j]]();
                                }
                            }
                        }
                    }
                }
            },
            get: function (key) {
                return d[key];
            },
            listen: function (key, fn) {
                var j = {};

                j[key] = fn;
                d.client.push(j);
            }
        };

        return method;
    },

    /******************DOM******************/

    // 弹窗
    popUp: function (str, uf, btn) {
        btn = btn || '确定';
	    // 创建div
	    function createDom (n, fn) {
	        var doc = document;
	        var popUp = doc.createElement('div');

	        popUp.id = 'popUp';
	        popUp.innerHTML = '<div class="content"><div class="con">' + n + '</div><div class="ys">' + btn + '</div><div class="close"><img src="//rwhstorage-pub.oss-cn-shanghai.aliyuncs.com/dist/images/webr_icon_x.png"></div></div><div class="mark"></div>';
	        fn(popUp, doc, uf);
	        return popUp;
	    }
	    // 绑定事件
	    function et (dom, doc, fn) {
	    	// 确定按钮
	        dom.querySelector('.ys').addEventListener('click', function () {
	            doc.body.removeChild(dom);
	            fn && fn();
	        });
	        // 关闭按钮
	        dom.querySelector('.close').addEventListener('click', function () {
	            doc.body.removeChild(dom);
	        });
	    }
	    return createDom(str, et);
    },
    // 复制内容到剪切板
    clipboard: function (text) {
        var doc = document;
        var input = doc.createElement('input');

        input.value = text;
        doc.body.appendChild(input);
        input.select();
        doc.execCommand('copy');
        doc.body.removeChild(input);
    }
};

// 判断数据类型
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Array'].forEach(function (element, index, array) {
    window['is' + element] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + element + ']';
    };
});

// 算法-先排序整理

/*{
    id : id
    title : 借款-借款用途//标题
    request_time : //请求时间
    req_money : //借款金额
    operation_fee_status : //平台运营费状态 0初始状态 1正常 2已退还 3已扣除
    status_text : //状态字符串
    operation_fee : //运营费
}

<script type="szm" id="ssss">
	<div class="con" title="(=id=)">
		<div class="title"><span>(=title=)</span><span class="fr">(=request_time=)</span></div>
		<div class="je">
			<span>(=req_money=)</span>
			<span>借款金额(元)</span>
		</div>
		<div class="je">
			<span>(=operation_fee=)</span>
			<span>运营费(元)</span>
		</div>
		<div class="je">
		// (=status_text=)会读不出来
			<span title="(=operation_fee_status=)" class="zt">(=status_text=)</span>
			<span  class="tz">运营状态</span>
		</div>
	</div>
</script>*/

// 如何判断一个对象是不是另一个对象的子集

// 表单策略模式
// 对象加功能的装饰者模式
// 表单还要改成单体模式

// 我现在要的js
// 函数式编程
// 设计模式
// 设计原则

// 泛型函数
// 函数纯度