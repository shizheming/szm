<template>
    <div>linkage</div>
</template>
<script>
/* eslint-disable no-console */
import linkage from '../script/linkage';
function a (v) {
    console.log('我起床了');
    return v;
}
function b (v) {
    console.log('我穿外套了');
    return ++v;
}
function c (v) {
    console.log('我穿裤子了');
    return ++v;
}
function d (v) {
    console.log('我穿袜子了');
    return ++v;
}
function e (v) {
    console.log('我刷牙了');
    return ++v;
}
function f (v) {
    console.log('我穿鞋了');
    return ++v;
}
function g (v) {
    console.log('我出门了');
    return `到公司了，我花了${v}分钟`;
}
export default {
    created () {
        var s = linkage([
            {
                name: 'a',
                relationship: {
                    name: 'b',
                    relationship: 'f'
                }
            },
            {
                name: 'b',
                relationship: 'f'
            },
            {
                name: 'c',
                relationship: [
                    {
                        name: 'f'
                    },
                    {
                        name: 'a',
                        relationship: {
                            name: 'b',
                            relationship: 'f'
                        }
                    }
                ]
            }
        ]);
        /*
        [c, f]
        [c,a,b,f]
         */

        // console.log(JSON.stringify(s, null, 4), 89);
        console.log(s, 89);
    }
};
</script>