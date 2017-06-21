

// 引入scss
require('../../scss/pages/demo.scss');
// 监听html
var e = require('../../views/pages/demo.html');
document.body.innerHTML = e;

console.log(d);
// document.body.style.backgroundColor = '#ccc';

var dom = require('../libs/dom');
dom.addLoad();
setTimeout(function() {dom.removeLoad()}, 1000);



