<template>
<div></div>
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

//     {
//         b: [
//             [b,c,d],
//             [b,c,a,f],
//             [b,c,e],
//         ]
//         c: [
//             [c,d],
//             [c,a,f],
//             [c,e],
//         ]
//         a: [
//             f,
//         ]
//     }
    
var gggggg = relationship(relationshipTable);





















/* var a = 1;
var b = 2;
var c = 3;
var d = 4;
var e = 5;
var f = 6;
var g = 7;
var h = 8;

var temp = [
    {
        m: a,
        y: [c, b]
    },
    {
        m: b,
        y: [e, f, d]
    },
    {
        m: a,
        y: [g]
    },
    {
        m: d,
        y: [e, f, g, h]
    },
    {
        m: c,
        y: [f, h]
    },
    {
        m: e,
        y: [h]
    }
];

let init = [];

var fun = (aaa, bbb) => {
    let funs = temp.filter(res => {
        return res.m == bbb;
    });

    if (funs && funs.length > 0) {
        let children = [];

        funs.forEach((ite, ind) => {
            let y = ite.y;

            y.forEach((item, index) => {
                fun(children, item);
            });
        });
        
        aaa.push({
            key: bbb,
            children: children
        });
    } else {
        aaa.push({
            key: bbb
        });
    }
};

fun(init, a);

console.log(init);

var show = (parent, init) => {
    init.forEach((item, index) => {
        if (index) parent.pop();
        parent.push(item.key);
        if (item.children) {
            show([...parent], item.children);
        } else {
            console.log(parent);
        }
    });
};

show([], init); */














export default {
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
