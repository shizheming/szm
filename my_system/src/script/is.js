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

// 判断值是不是NaN
_.isNaN = function (n) {
    // eslint-disable-next-line no-self-compare
    return n !== n;
};

// 判断一个值是不是数字类型
_.isNumber = function (n) {
    return typeof n === 'number' && !_.isNaN(n);
};

// 判断一个值是不是整数
_.isInteger = function (n) {
    return _.isNumber(n) && n % 1 === 0;
};

// 判断一个值是不是奇数
_.isOdd = function (n) {
    return Math.abs(n % 2) === 1;
};

// 判断一个值是不是偶数
_.isEven = function (n) {
    return n % 2 === 0;
};

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