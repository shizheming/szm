<template>
    <div>compose</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import compose from '../script/compose.1';

function toUp (str) {
    return str.toUpperCase();
}

function add (str) {
    return str + '!';
}
var p = compose(add, toUp);

export default {
    created () {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>