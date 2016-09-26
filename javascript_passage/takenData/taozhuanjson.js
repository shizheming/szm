// 把原始带标签的字符串最终转换为json传给native
// 这里是淘宝



var oldTxt = document.body.innerHTML; 


// 需要标记的地方
var tagArrRep = [/<div class="(item-info)">/, /<p class="(price)">/, /<p class="(nums)">/]

// 标记工作
function inTag(arr, fn) {
	for(var i = 0, len = arr.length; i < len; i++) fn(arr[i]);
}

// 替换工作
function rep(txt,rep,rt) {
	rt = rt || '$1';
	return txt.replace(rep, rt);
}

// 返回标记后的字符串
inTag(tagArrRep, function(rg) {
	oldTxt = rep(oldTxt, rg);
});

// 干掉标签
var txt2 = rep(oldTxt, /<.+?>/g, 'ssss');

var exc = [
	// 收货人
	/收货人：(.+?)ssss/,
	// 手机号码
	/(\d{11})(?:ssss|\s+)/,
	// 收获地址
	/收货地址：(.+?)ssss/,
	// 购买物品
	/item-info(.+?)ssss/,
	// 实付款
	/price￥(.+?)ssss/,
	// 购买数量
	/numsx(.+?)ssss/,
	// 订单编号
	/订单编号(.+?)ssss/,
	// 支付宝交易号
	/支付宝交易号(.+?)ssss/,
	// 创建时间
	/创建时间(.+?)ssss/,
	// 付款时间
	/付款时间(.+?)ssss/,
	// 发货时间
	/发货时间(.+?)ssss/,
	// 成交时间
	/成交时间(.+?)ssss/
];

// 属性名
var nKey = [
	'收货人',
	'手机号码',
	'收货地址',
	'购买物品',
	'实付款',
	'购买数量',
	'订单编号',
	'支付宝交易号',
	'创建时间',
	'付款时间',
	'发货时间',
	'成交时间'
];

// 属性值
var val = [];

// 数组配对成json

function arrTjson(arr1, arr2){
	var json = {};
	for(var i = 0, len = arr1.length; i < len; i++) json[arr1[i]] = arr2[i];
	return json;
}

// 取值
for(var i = 0, len = exc.length; i < len; i++) val[i] = exc[i].exec(txt2)[1];

var zj = arrTjson(nKey, val);



/*{
    '收货人' : '施哲明',
    '手机号码' : '86-13701745394',
    '收货地址' : '上海 上海市 徐汇区 龙华街道 上海市徐汇区云锦路500号绿地汇中心B座18楼',
    '购买物品' : 'Samsung/三星 MZ-750120B/CN120GSSD固态硬盘台式机笔记本非128g',
    '实付款' : '294.00',
    '购买数量' : '1',
    '订单编号' : '1901486118472701',
    '支付宝交易号' : '2016051521001001150287609957',
    '创建时间' : '2016-05-15 11:35:01',
    '付款时间' : '2016-05-15 11:37:43',
    '发货时间' : '2016-05-15 14:03:50',
    '成交时间' : '2016-05-17 09:50:35'
}*/