<template>
    <div>state</div>
</template>
<script>
/* eslint-disable no-console */
import {warpState, onceState} from '../script/state';

var stateCollection1 = {
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

var s = warpState(stateCollection1);

const stateCollection2 = {
    ajax () {
        console.log('第一次请求数据，拿');
    },
    doing () {
        console.log('不用请求了，我有数据了，接着干活');
    }
};

const z = onceState(stateCollection2);

export default {
    mounted () {
        s();
        s();
        s();
        s.change('squat');
        s();
        s();
        s(111);
        s(222);

        z();
        z();
        z();
        z();
        z();
    }
};
</script>