/* 
    这里具体的动作操作都是基于对象级别的
    比如undersore的max方法就是基于对象级别的，我的方法也要多往这方面靠，操作数据也要面向对象，而不是单单一个值
*/


let _ = {};

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

/* 
    获取，要，拿，摘，分，分组，删，合
*/

// 取键
_.keys = function (obj) {
    return Object.keys(obj);
};

// 取值
_.values = function (obj) {
    return Object.values(obj);
};

// 摘取
_.pluck = function (arr, key) {
    return arr.map(current => current[key]);
};

// 条件分组
_.group = function (arr, predicate) {
    let result = [[], []];
    arr.forEach((current, index, a) => {
        if (predicate(current, index, a)) result[0].push(current); else result[1].push(current);
    });
    return result;
};

// 长度分组
_.chunk = function (arr, count) {
    let result = [];
    let i = 0;
    while (i < arr.length) {
        result.push(arr.slice(i, i += count));
    }
    return result;
};

// 删除值
_.without = function (arr, ...predicate) {
    if (_.isFunction(predicate[0])) {
        predicate = predicate[0];
        return arr.filter((current, index, a) => {
            return !predicate(current, index, a);
        });
    } else {
        return arr.filter(current => !predicate.includes(current));
    }
};

// 去重
_.uniq = function (arr) {
    return [...new Set(arr)];
};

// 并集
_.union = function (...arr) {
    return _.uniq(arr.flat());
};

// 交集
_.intersection = function (...arr) {
    let result = [];
    let f = arr.flat();
    let u = _.union(f);
    f.forEach(current => {
        if (u.includes(current)) {
            u = _.without(u, current);
        } else {
            arr.every(item => {
                return item.includes(current);
            }) && result.push(current);
        }
    });
    return _.uniq(result);
};

// 差集
_.differenceset = function () {
    let w = _.union(...arguments);
    let i = _.intersection(...arguments);
    return _.without(...[...[w], ...i]);
};

// 这个不用对象级别的，因为只是需要把一个数组和对象里面的假植干掉，就是直接作用于值上的
// 去假值
_.compact = function (collection) {
    let result;
    if (_.isObject(collection)) result = {};
    if (_.isArray(collection)) result = [];
    _.forEach(collection, (value, key, a) => {
        if (value) result[key] = value;
    });
    return result;
};

/* 
    形态变化，结构变化
*/

// 对象数组相互转换
_.entries = function (collection) {
    if (_.isArray(collection)) return Object.fromEntries(collection);
    if (_.isObject(collection)) return Object.entries(collection);
};

// 冻结对象
_.freeze = function (obj) {
    return Object.freeze(obj);
};

/* 
    循环
*/

_.forEach = function (collection, iteratee) {
    _.keys(collection).forEach(value => {
        iteratee(collection[value], value, collection);
    });
};

/* 
尚未定义
*/

// 反谓词
_.negate = function (predicate) {
    return function () {
        return predicate.apply(this, arguments);
    };
};

// 包含
_.includes = function (collection, value) {
    if (_.isObject(collection)) collection = _.values(collection);value;
    return collection.includes(value);
};

// 最大
_.max = function (arr, iteratee) {
    if (_.isFunction(iteratee)) {
        let result = -Infinity;
        let lastComputed = -Infinity;
        let computed;
        arr.forEach((current, index, a) => {
            computed = iteratee(current, index, a);
            if (computed > lastComputed) {
                result = current;
                lastComputed = computed;
            }
        });
        return result;
    } else {
        return max(arr);
    }
};

function max () {
    return Math.max(...arguments);
}

// 最小
_.min = function (arr, iteratee) {
    if (_.isFunction(iteratee)) {
        let result = Infinity;
        let lastComputed = Infinity;
        let computed;
        arr.forEach((current, index, a) => {
            computed = iteratee(current, index, a);
            if (computed < lastComputed) {
                result = current;
                lastComputed = computed;
            }
        });
        return result;
    } else {
        return min(arr);
    }
};

function min () {
    return Math.min(...arguments);
}

// 压缩
_.zip = function (...arr) {
    let result = Array(arr.length);
    for (let index = 0; index < arr.length; index++) {
        result[index] = _.pluck(arr, index);
    }
    return result;
};

// 解压
_.unzip = function (arr) {
    return _.zip(arr);
};

// 值都变成函数级别了
_.identity = function (value) {
    return value;
};

// 延迟执行，换地方执行
_.constant = function (value) {
    return function () {
        return value;
    };
};

// 默认回调
_.noop = function () {};

// 次数

_.after = function (times, func) {
    return function () {
        if (--times < 1) {
            return func.apply(this, arguments);
        }
    };
};

_.before = function (times, func) {
    var memo;
    return function () {
        if (--times > 0) {
            memo = func.apply(this, arguments);
        }
        if (times <= 1) func = null;
        return memo;
    };
};

_.once = function (func) {
    return _.before(2, func);
};



/*
    随机
*/

var random = function () {
    return Math.floor(Math.random() * 10);
};

// 随机数字

_.randomNumber = function (digit, digit2) {
    switch (arguments.length) {
        case 0:
            return random();
        case 1:
            return Math.floor((Math.random() + '').replace(/\.0+/, '.') * Math.pow(10, digit));
        default:
            return parseInt(digit + Math.random() * (digit2 - digit));
    }
};

// 随机字母

_.randomAlphabet = function (digit) {
    var array = [];

    for (var i = 0; i < digit; i++) array.push(_.randomNumber(0, 25));
    //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()
    var upperCase = String.fromCharCode.apply(null, array.map(function (currentValue, index, array) {
        return currentValue + 65;
    }));
    var result = upperCase;
    var number = _.randomNumber(0, upperCase.length);

    while (number--) {
        var alphabet = upperCase[_.randomNumber(1, upperCase.length)];

        result = upperCase.replace(alphabet, alphabet.toLocaleLowerCase());
    }
    return result;
};

// 随机数字字母

_.randomNumberAlphabet = function (digit) {
    var number = _.randomNumber(0, digit);
    var string = _.randomNumber(number) + _.randomAlphabet(digit - number);

    return _.isNaN(number) ? NaN : _.shuffle(string.split('')).join('');
};


// 随机颜色


_.randomColor = function (saturation, light) {
    saturation = _.isString(saturation) ? saturation : '50%';
    light = _.isString(light) ? light : '50%';
    if (arguments.length == 1) light = saturation;
    var hsl = ['hsl(', ')'];

    hsl.splice(1, 0, [_.randomNumber(0, 360), saturation, light].join(','));
    /*var r = (0, 60)
    var r = (300, 360)
    var g = (60, 180)
    var b = (180, 300);*/
    return hsl.join('');
};

// 之间的随机数
_.randomBetween = function (min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

// 打乱顺序

_.shuffle = function (original) {
    let result = [];
    return original.map(function (currentValue, index) {
        var random = _.randomNumber(0, index);

        if (random !== index) result[index] = result[random];
        result[random] = currentValue;
    });
};

export default _;