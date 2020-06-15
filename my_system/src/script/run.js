/* eslint-disable no-console */
/*
    运行
    直到条件成立才停止
    （这个东西我要怎么去把它范畴化呢，一大串描述）
    范畴是最高的概念，没有比他更高的概念了

    有2个问题，一个问题是条件函数的参数怎么传，第二个就是fn函数体怎么传参。。。。。。
*/

function run (predicate/* 停止的条件 */, fn/* 运行的函数体 */) {
    return function running () {
        if (!predicate.apply(null, arguments)) {
            return running.apply(null, arguments);
        } else {
            return function () {
                return fn.apply(null, arguments);
            };
        }
    };
}

export default run;