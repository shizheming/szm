/* eslint-disable no-console */
/*
    关系
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数两者之间的关系❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
    动态静态：（运动）
        1，添加关系
        2，删除关系
        3，替换关系
        4，查看关系
    核心就是：
        1，一对一
        2，一对多

    目的：
    目的就是我在写逻辑代码的时候，
    第一想把纯粹做事情的代码比如处理数据的代码和逻辑代码，比如判断逻辑的代码分开来，这样子的目的就是更好的可读性站在人理解的角度，同时也能换一种写法写代码，爽
    比如我打个比方，页面里面我写了一个关系表，通过这个关系表我就能知道页面的主要逻辑，这样能短时间聚焦再必要的东西上面
    第二就是依附的关系写法，目的是一个函数专注于干一件事情，其他的都是依附，比如打点

*/
import {forEach, flatten, uniq, isArray} from 'lodash';
const relationship = function (table) {
};
// 我想了下，还是直接配个关系表把，不要转换数据格式了，好麻烦

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

const table = [
    {
        name: a,
        relationship: {
            name: b,
            relationship: f
        }
    },
    {
        name: b,
        relationship: f
    },
    {
        name: c,
        relationship: [
            {
                name: f
            },
            {
                name: a,
                relationship: {
                    name: b,
                    relationship: f
                }
            }
        ]
    }
];

console.log(table, '关系表');
export default relationship;