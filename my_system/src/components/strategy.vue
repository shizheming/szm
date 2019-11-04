<template>
    <div>strategy</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import strategy from '../script/strategy';

function a (j, k) {
    return j < k;
}

function b (j, k) {
    return j > k;
}

function c (j, k) {
    return j === k;
}

function a1 () {
    return '小于';
}

function b1 () {
    return '大于';
}

function c1 () {
    return '等于';
}

var s = strategy([
    {
        m: a,
        y: a1
    },
    {
        m: b,
        y: b1
    },
    {
        m: c,
        y: c1
    }
]);



export default {
    created () {
        
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
