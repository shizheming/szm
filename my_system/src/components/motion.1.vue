<template>
    <div>motion</div>
</template>

<script>
import motion from '../script/motion.1';

/*
        2019/07/03
        间断性
        概念：

        间断性作用于什么对象？
        作用于函数对象，在每个函数运行后停顿

        作用于函数，本质上的实现和柯里化一样，不一样的在于概念理解
        目的是有多个函数运行时，每当一个函数运行完以后能停顿下，这和柯里化一样，无非一个是传作为函数的参数，而另一个知只是参数
        这概念打个比方，我要做很多件事情，柯里化就是我做一件停一下，做一件停一下，而这个是有很过个人，这个人做完了停一下，下个人做完了停一下，
        本质是一样的，不同的是形式，我把这种内容赋予了一种新的形式

        哦，不对，柯里化是惰性加载，我这个就是要让他运行，我想想
        柯里化是作用在一个函数上面的所有参数，而我这个是作用在许多函数上面
        所以上面的比方打错了，呵呵哒，还是对柯里化理解不深刻，但是也是有收货的，就是形式的提炼
    */

var d = motion(
    function a () { console.log(arguments); return 1; },
    function b () { console.log(arguments); return 2; },
    function c () { console.log(arguments); return 3; },
    function d () { console.log(arguments); }
);
var a1 = d(11);
var a2 = a1(22);
var a3 = a2(33);
var a4 = a3(44);

export default {
    created () {

    }
};
</script>