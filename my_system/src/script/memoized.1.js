/*
    记忆函数
*/

export default const memoized = function (fn) {
    const lookupTable = {};
    return function (arg) {
        return lookupTable[arg] || (lookupTable[arg] = fn(arg));
    }
};