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

export default {
    mounted () {
        var s = relationship([
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
        console.log(s, 81119);
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>