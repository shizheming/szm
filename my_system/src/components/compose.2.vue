<template>
    <div>compose</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import compose from '../script/compose.2';

const fn1 = s => s.toLowerCase();
const fn2 = s => s.split('').reverse().join('');
const fn3 = s => s + '!';

const newFunc = compose(fn1, fn2, fn3);
const result = newFunc('Time'); // emit!

export default {
    created () {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>