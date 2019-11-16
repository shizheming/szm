/*
    组合
    ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥函数与函数之间的组合关系♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
    组合函数，然后目的是什么呢？？？？
*/
// 最少的2个函数的组合
export default function (a, b) {
    return function () {
        return a(b.apply(null, arguments));
    };
}
