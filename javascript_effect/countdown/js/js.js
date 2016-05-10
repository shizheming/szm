function countDown(id,holiday,time){
	var obj = document.getElementById(id);
	count();
	console.log(eval(time))
	setInterval(count,1000);
	function count(){
		var d = new Date(),
			nowTime = d.getTime();
		d.setFullYear(2016,1,1);
		d.setHours(0,0,0,0);
		var overTime = d.getTime(),
			mist = parseInt((overTime - nowTime) / 1000),
			date = parseInt(mist / 86400),
			hours = parseInt(mist % 86400 / 3600),
			minutes = parseInt(mist % 86400 % 3600 / 60),
			second = mist % 86400 % 3600 % 60;
		obj.innerHTML = '距离' + holiday + date + '天' + hours + '小时' + minutes + '分' + second + '秒';
	};
};
