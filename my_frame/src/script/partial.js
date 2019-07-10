/*
    部分应用
*/
export default const partial = function (fn, ...rest) {
    return function () {
        return fn.apply(null, [].slice.apply(arguments).concat(rest));
    };
};