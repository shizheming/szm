<template>
    <div>motion</div>
</template>
<script>
/* eslint-disable no-console */
import motion from '../script/motion';
// 连续
var d = motion(
    function a (aa) { console.log(aa, 'a'); return 1 + 100; }, 
    function b (aa) { console.log(aa, 'b'); return aa + 200; }, 
    function c (aa) { console.log(aa, 'c'); return aa + 300; }, 
    function d (aa) { console.log(aa, 'd'); return 10000000;},
);


// 间断
var d1 = motion(
    function a1 (aa, bb) { console.log(aa, bb, 'a1'); return 1 + 'aaaaa'; }, 
    function b1 (aa, bb, cc) { console.log(aa, bb, cc, 'b1'); return aa + 'bbbbb'; }, 
    function c1 (aa, bb) { console.log(aa, bb, 'c1', 'c1运行完了'); return aa + 'ccccc'; }, 
    function j1 (aa, bb) { console.log(aa, bb, 'j1', 'j1运行完了'); return aa + 'ddddddd';},
    true
);






export default {
    created () {
        // 中间连续
        var a1 = d1(999999);
        var x = motion.handle(a1, 'c1');
        console.log(x, 4545);
        var xx = x(88);
        console.log(xx, '到底了没');
        // 既然间断了，那怎么把这个原来吐出来的函数给干掉
        // 里面做判断，如果调用了handle方法后再去掉
        // a1(7777, 4444445555555555555555);



        // 一开始连续
        /* var h1 = motion.handle(d1, 'c1');
        h1(999, 8888); */

        // 这是每一步都断
        /* var a1 = d1(999999);
        var a3 = a2(777777);
        var a4 = a3(6666);
        console.log(a4, 'a4'); */

        // 连续
        // 发现连续的时候没地方传第一个值
        d(414141);
    }
};
</script>