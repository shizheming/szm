function wordsNumber(id,number){
	var obj = document.getElementById(id);
	var objText = obj.children[1];
	var objWords = obj.children[0];
	var number = number * 1;
	objText.onkeydown = objText.onkeyup = function(){
		var valLen = this.value.length;
		if(valLen < number){
			objWords.innerHTML = '您还能输入' + (number - valLen) + '个字';
			objWords.className = 'pass';
		}else{
			objWords.innerHTML = '您已超了' + Math.abs(number - valLen) + '个字';
			objWords.className = 'nopass';
		};
	};
};