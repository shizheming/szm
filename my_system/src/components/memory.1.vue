<template>
    <div>memoized</div>
</template>
<script>
/* eslint-disable no-console */
import memoized from '../script/memory.1';

var me = {
    eat (a) {
        console.log(a, '我在吃饭');
    },
    think () {
        console.log('我在思考');
    },
    motion () {
        console.log('我在运动');
    },
    sleep () {
        console.log('我在睡觉');
    }
};

var m = memoized(me);

m.eat(1);
m.think();
m.eat(4);

console.log(memoized.storage, '步骤');

export default {
    created () {

    }
};
</script>