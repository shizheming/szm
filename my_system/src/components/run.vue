<template>
    <div>run</div>
</template>
<script>
/* eslint-disable no-console */
import run from '../script/run';
var g = 1;
var a = run(function () {
    console.log(g, 12);
    return g++ > 10;
}, function (v) {
    return v++;
});
var b = a(7777777);
console.log(b(11111), 37);


export default {
    created () {

    }
};
</script>