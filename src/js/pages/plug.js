require('../../views/pages/plug.html');



// 渲染模板
var art_template = require('../plugs/artTemplate');

var data = {  
    list : ["第一个元素", "第二个元素"]  
};  

var html = art_template('ssss', data);
document.getElementById('a').innerHTML = html;



require('../../scss/plugs/sm.scss');
require('../../scss/plugs/sm-extend.scss');
require('n-zepto');
require('../plugs/sm.min');
require('../plugs/sm-extend.min');
// 地区选择器
require('../plugs/sm-city-picker.min');

$("#city-picker").cityPicker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择收货地址</h1>\
    </header>'
});



// 日期时间
$("#datetime-picker").datetimePicker({
	value: ['1985', '12', '04', '9', '34']
});



// 日历选择器
$("#my-input").calendar({
    value: ['2015-12-05']
});



// 单选select
$("#picker").picker({
	toolbarTemplate: '<header class="bar bar-nav">\
	<button class="button button-link pull-left">按钮</button>\
	<button class="button button-link pull-right close-picker">确定</button>\
	<h1 class="title">标题</h1>\
	</header>',
	cols : [{
		textAlign: 'center',
		values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
	}]
});



// tips
$('#toast').click(function () {
	$.toast("操作成功");
});



// loading
$('.open-preloader').click(function () {
	$.showPreloader();
	setTimeout(function () {
    	$.hidePreloader();
    }, 2000);
});



// alert
$('.alert-text').click(function () {
	$.alert('我是单行弹窗');
})



// 下拉刷新



// 幻灯片
