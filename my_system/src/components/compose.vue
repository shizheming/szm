<template>
    <div>compose</div>
</template>
<script>
/* eslint-disable no-console */
import compose from '../script/compose';
function a (v) {
    console.log('a我在计算结果，然后返回给下一个函数');
    return v;
}
function b (v) {
    console.log('b我在计算结果，然后返回给下一个函数');
    return ++v;
}
function c (v) {
    console.log('c我在计算结果，然后返回给下一个函数');
    return ++v;
}
function d (v) {
    console.log('d我在计算结果，然后返回最终值');
    return ++v;
}

export default {
    created () {
        var s = compose(a, b, c, d);

        console.log(s(100));
    }
};
</script>