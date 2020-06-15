<template>
    <div>state</div>
</template>
<script>
/* eslint-disable no-console */
import state from '../script/state';

var stateCollection = {
    run () {
        console.log('我在跑');
    },
    jump () {
        console.log('我在跳');
    },
    walk () {
        console.log('我在走');
    },
    squat (v) {
        console.log('我在蹲下', v);
    }
};

var s = state(stateCollection);

s.go();
s.go();
s.go();
s.change('squat');
s.go();
s.go();
s.go(111);
s.go(222);

export default {
    created () {

    }
};
</script>