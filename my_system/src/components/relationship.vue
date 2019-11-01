<template>
    <div>relationship</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import relationship from '../script/relationship';


function a () {
    alert('a');
}
function b () {
    alert('b');
}
function c () {
    alert('c');
}
function d () {
    alert('d');
}
function e () {
    alert('e');
}
function f () {
    alert('f');
}
  
var relationshipTable = [
    {
        m: b,
        y: c
    },
    {
        m: c,
        y: [d, a, e]
    },
    {
        m: b,
        y: a
    },
    {
        m: a,
        y: f
    }
];




export default {
    created () {
        var r = relationship(relationshipTable);
        console.log(r, 137);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
