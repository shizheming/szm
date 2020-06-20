<template>
    <div>strategy</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import strategy from '../script/strategy';

var o = {
    a (j, k) {
        return j < k;
    },
    a_1 (j, k) {
        return true;
    },
    b (j, k) {
        return j > k;
    },
    c (j, k) {
        return j === k;
    },
    a1 (v) {
        return v + '小于';
    },
    b1 () {
        return '大于';
    },
    c1 () {
        return '等于';
    }
};

var s = strategy([
    {
        m: [o.a, o.a_1],
        y: o.a1,
        rule: 'a()&&a_1()'
    },
    {
        m: o.b,
        y: o.b1
    },
    {
        m: o.c,
        y: o.c1
    }
], o/* , true */);

var v = s(3, 2);

console.log(v, 1838);
// var t = v(666);

// console.log(t, 6565);

export default {
    created () {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>