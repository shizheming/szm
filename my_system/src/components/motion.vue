<template>
    <div>motion</div>
</template>
<script>
/* eslint-disable no-console */
import motion from '../script/motion';
function a (aaa) {
    console.log('a', aaa);
}
function b (aaa) {
    console.log('b', aaa);
}
function c (aaa) {
    console.log('c', aaa);
}
function d (aaa) {
    console.log('d', aaa);
}
function e (aaa) {
    console.log('e', aaa);
}
function f (aaa) {
    console.log('f', aaa);
}

export default {
    mounted () {
        const m = motion(a, b, c, d, e, f);

        console.log(m(78));
    }
};
</script>