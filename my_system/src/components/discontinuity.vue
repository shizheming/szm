<template>
    <div></div>
</template>
<script>
/* eslint-disable no-console */
import discontinuity from '../script/discontinuity';
var d = discontinuity(
    function a (...aa) { console.log(aa); return 1; }, 
    function b (...aa) { console.log(aa); return 2; }, 
    function c (...aa) { console.log(aa); return 3; }, 
    function d (...aa) { console.log(aa); },
);
var a1 = d();
var a2 = a1();
var a3 = a2();
var a4 = a3();
export default {

    
};
</script>