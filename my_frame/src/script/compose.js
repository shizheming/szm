/*
    组合
*/
// 最少的2个函数的组合
var c = function (a, b) {
    return function () {
        return a(b.apply(null, arguments));
    };
};
// 多个函数组合
export default const compose = function (...args) {
    return function (...a) {
        return args.reduceRight(function (res, cb) {
            return cb(res);
        }, a);
    }
};