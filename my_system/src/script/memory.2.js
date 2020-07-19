/*
    记忆函数
    这个得用处是缓存，调高性能，并不是记忆
*/

export default const memoized = function (fn) {
    const lookupTable = {};
    return function (arg) {
        return lookupTable[arg] || (lookupTable[arg] = fn(arg));
    }
};