<template>
    <div>linkage</div>
</template>
<script>
/* eslint-disable no-console */
import linkage from '../script/linkage5';
function a (v) {
    console.log('我起床了');
    return [v];
}
function b (v) {
    console.log('我穿外套了');
    return [++v];
}
function c (v) {
    console.log('我穿裤子了');
    return [++v];
}
function d (v) {
    console.log('我穿袜子了');
    return [++v];
}
function e (v) {
    console.log('我刷牙了');
    return [++v];
}
function f (v) {
    console.log('我穿鞋了');
    return [++v];
}
function g (v) {
    console.log('我出门了');
    return [`到公司了，我花了${v}分钟`];
}
export default {
    mounted () {
        const l = linkage(a, b, c, d, e, f, g);

        console.log(l(123), 882);
    }
};
</script>