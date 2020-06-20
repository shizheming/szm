<template>
    <div>memoized</div>
</template>
<script>
/* eslint-disable no-console */
import memoized from '../script/memoized.1';

var fibonacci = memoized([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
});

fibonacci(10);
fibonacci(10);

export default {
    created () {

    }
};
</script>