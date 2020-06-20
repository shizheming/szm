<template>
    <div>strategy</div>
</template>
<script>
import chain from '../script/strategy.3';
function xxxx () {
    // 职责连设计模式

    function a (a1) {
        if (a1 == 'a') alert('我是一等公民'); else return true;
    }
    function b (b1) {
        if (b1 == 'b') alert('二等公民是我'); else return true;
    }
    function c () {
        alert('我是农民');
    }
    var s1 = chain(a);
    var s2 = chain(b);
    var s3 = chain(c);

    s1.setNext(s2);
    s2.setNext(s3);
    s1.request('d');
}
export default {
    created () {}
};
</script>