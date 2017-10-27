module.exports = {
	// 返回当前日期信息
	date : function(time) {
	    var n = new Date(time);
	    return [n.getFullYear(), fillZero(n.getMonth() + 1), fillZero(n.getDate()), fillZero(n.getHours()), fillZero(n.getMinutes()), fillZero(n.getSeconds())];
	},
	// 数字3位加逗号，金钱显示
	money : function(num) {
		num = num + '';
		return num.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^\,/,'');
	},
	
	// 秒倒计时
	second : function(time, fn1, fn2) {
		fn1 && fn1(time);
		var timer = setInterval(function(){
		    fn1 && fn1(--time);
		    if (time == 0) {
		        clearInterval(timer);
		        fn2 && fn2();
		    }
		},1000);
	},
	// 完整的倒计时
	countDown : function(c, fn) {
		upDate(c, fn);
		var timer = setInterval(function() {
			if (!upDate(c, fn)) clearInterval(timer);
		},1000);

		function upDate(c, fn){
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
			mist = mist % 86400	
			var hours = parseInt(mist / 3600);
			//去小时后的秒数
			mist = mist % 3600;
			var minutes = parseInt(mist / 60);
			mist = mist % 60;
			fn && fn(date, hours, minutes, mist);
			return date + hours + minutes + mist;
		}
	},
	
	// 获取某一时间段的时间戳
	getStamp : function (val) {
		return Date.parse(new Date(val + ' ' + '00:00:00'));
	},
	// 2017-08-20 11:09:25
	getTime : function (stamp) {
		var time = this.date(stamp);
		return time[0] + '-' time[1] + '-' + time[2] + ' ' + time[3] ':' + time[4] + ':' time[5];
	},
	// 这个没有脱离形
	fillZero : function (nub) {
		return nub < 10 ? '0' + nub : nub;
	}
};