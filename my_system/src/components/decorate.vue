<template>
    <div>decorate</div>
</template>
<script>
/* eslint-disable no-console */
import decorate from '../script/decorate';

export default {
    mounted () {
        function a (v) {
            console.log('我在跑步');
            return ++v;
        }

        function b (v) {
            console.log('我迷之微笑');
            return ++v;
        }
        var n = decorate(b, [a]);

        console.log(n(6), 887);
    }
};
</script>