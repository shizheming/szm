/*
    这里具体的动作操作都是基于对象级别的
    比如undersore的max方法就是基于对象级别的，我的方法也要多往这方面靠，操作数据也要面向对象，而不是单单一个值
*/

const _ = {};

/*
    是不是
*/

['Arguments', 'Array', 'Function', 'String', 'Date', 'RegExp', 'Object', 'Boolean'].forEach(function (currentValue) {
    _['is' + currentValue] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + currentValue + ']';
    };
});

/*
    是否
*/

// 是否冻结
_.isFrozen = function (obj) {
    return Object.isFrozen(obj);
};

// 是否相等
_.is = function (a, b) {
    return Object.is(a, b);
};

export default _;