<template>
    <div>motion</div>
</template>
<script>
/* eslint-disable no-console */
import motion from '../script/motion';
import relationship from '../script/relationship';

const s = relationship([
    {
        name: 'a',
        relationship: {
            name: 'b',
            relationship: 'f'
        }
    }
]);

console.log(s, 'relationship');
const obj = {};

obj.a = function a (aaa) {
    console.log('aaa', aaa++);
    return aaa;
};
obj.b = function b (bbb) {
    console.log('bbb', bbb++, 11);
    return bbb;
};
obj.c = function c (ccc) {
    console.log('ccc', ccc++);
    return ccc;
};
obj.d = function d (ddd) {
    console.log('ddd', ddd++);
    return ddd;
};
obj.e = function e (eee) {
    console.log('eee', eee++);
    return eee;
};
obj.f = function f (fff) {
    console.log('fff', fff++);
    return fff;
};

console.log(obj.f, 991);
s.forEach(current => {
    current.forEach(item => {
        console.log(item, 6);
        const args = item.map(x => {
            return obj[x];
        });

        console.log(args, 999);
        const m = motion(...args);

        const result = m(100);

        console.log(result, 9000);
    });
});
export default {
    mounted () {
        // const m = motion(a, b, c, d, e, f);

        // console.log(m(78), 100);
    }
};
</script>