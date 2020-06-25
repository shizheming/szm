<template>
    <div>attachment</div>
</template>
<script>
/* eslint-disable no-console */
import attachment from '../script/attachment';
function a (v) {
    console.log('我出门了');
}
a.attachment = [
    function () {
        console.log('顺带便买个早饭');
    }
];
export default {
    created () {
        var s = attachment(a);

        console.log(s());
    }
};
</script>