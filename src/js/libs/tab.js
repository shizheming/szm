module.exports = function(id) {
	var obj = document.getElementById(id),
		title = obj.children[0],
		content = obj.children[1],
		titleChild = title.children,
		contentChild = content.children,
		pos = 0,// 这个能和now连着写2个tab切换会出问题why？
		now = 0,// 因为 pos = now = 0，这样的写法后面的now就变成全局变量了
		timer = null;
	titleChild[0].classList.add('cur');
	contentChild[0].classList.add('cur');
	for(var i = 0,len = titleChild.length; i < len; i++){
		(function(index) {
			titleChild[i].addEventListener('click', function() {
				now = index;
				doThing();
			});
		})(i);
	};
	function doThing() {
		if(pos === now) return;
		titleChild[now].classList.add('cur');
		titleChild[pos].classList.remove('cur');
		contentChild[now].classList.add('cur');
		contentChild[pos].classList.remove('cur');
		pos = now;
	};
};