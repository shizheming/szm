/****************
    私有
****************/

/*
    输入输出迭代工厂
*/

// 对柯理化的进一步理解
var factory = function (callback, original, iterator, array) {
    // 以前这是第一步
    /* callback = callback || function (original, output) {
        return output;
    }; */

    // 现在没有手动分布返回新函数，而现在一开始把定义的函数全部写完整，直接一步返回结果，然后通过动态柯理化去控制参数，也就是说以前是手动柯理化，现在是自动柯理化

    // 以前这是第二步
    original = processCollection(original);
    iterator = processFunction(iterator);
    var output = callback(original, array || {});

    Object.keys(original).forEach(function (currentValue, index, array) {
        iterator(original[currentValue], currentValue, output);
    });
    return output;
};

var factoryClone = factory.bind('', function (original, output) {
    _.forEach(original, function (currentValue, key, collection) {
        output[key] = collection[key];
    });
    return output;
});

var factoryNew = factory.bind('', function (original, output) {
    return output;
});

/*
    集合统一转换
*/

var objectTransformation = function (original, output, isArrayShift) {
    return _.isArray(original) ? transformation(output, [], isArrayShift) : transformation(output, {});
};

/*
    对象数组转换
*/

var transformation = function (collection, dataType, isArrayShift) {
    // 这里是把对象数组统一了，但还是有个小问题[empty,'1']，会有这种情况
    _.forEach(collection, function (currentValue, key, collection) {
        isArrayShift === true ? dataType.push(currentValue) : dataType[key] = currentValue;
    });
    return dataType;
};

/*
    递归
*/

var recursive = function (collection, baseCallback, ObjectCallback, level) {
    level = _.isNumber(level) ? ++level : 1;
    baseCallback = processFunction(baseCallback);
    ObjectCallback = processFunction(ObjectCallback);
    var result = {
        collection: [],
        value: []
    };

    _.forEach(collection, function (currentValue, key, collection) {
        if (_.isArray(currentValue) || _.isObject(currentValue)) {
            // 对象值的时候一个断点回调
            var output = ObjectCallback(currentValue, key, collection, level);

            output && result.collection.push(output);
            var recursiveValue = recursive(currentValue, baseCallback, ObjectCallback, level);

            result.value = result.value.concat(recursiveValue.value);
            result.collection = result.collection.concat(recursiveValue.collection);
        } else {
            // 基础值的时候一个断点回调
            result.value.push(baseCallback(currentValue, key, collection, level));
        }
    });
    return result;
};

/*
    处理参数集合
*/

var processCollection = function (value) {
    return !_.isObject(value) && !_.isArray(value) ? [] : value;
};

/*
    处理数组
*/

var processArray = function (value) {
    return _.isArray(value) ? value : [];
};

/*
    处理参数函数
*/

var processFunction = function (value) {
    return _.isFunction(value) ? value : _.identity;
};

var _ = {};

_.recursive = recursive;
/*
★★★★动词★★★★
*/

/*
    过滤出所有集合的基础类型值
*/

var value = function (original) {
    return factoryNew(original, function (value, key, output) {
        _.isArray(value) || _.isObject(value) ? _.forEach(value, function (currentValue, key, collection) {
            output.push(currentValue);
        }) : output.push(value);
    }, []);
};

_.value = function (collection, isDeep) {
    return isDeep !== true ? value(collection) : recursive(collection, function (value, key, collection, level) {
        return value;
    }).value;
};

/*
    通过value找key
*/

_.findKey = function (original, value) {
    var invert = _.invert(original);

    return value in invert && invert[value];
};

/*
    通过值寻找所在的集合
    这里本来想深度复制集合后操作的但是我想只是寻找像做原始的迭代一样，我并没有去改变原集合，所以想想占时想作罢吧
*/

var findCollection = function (collection, value) {
    var keyResult = Object.keys(collection).indexOf(String(value.key)) > -1 && collection;
    var valueResult = transformation(collection, [], true).indexOf(value.value || value) > -1 && collection;

    if (_.isObject(value)) {
        return Object.keys(value).length === 2 ? keyResult && valueResult && collection[value.key] === value.value && collection : keyResult || valueResult;
    } else return valueResult;
};

_.findCollection = function (collection, value, callback, isDeep) {
    if (!collection) return;
    isDeep = _.isBoolean(callback) ? callback : isDeep;
    callback = processFunction(callback);
    var result = [];
    var output = findCollection(collection, value);

    output && result.push(output);
    return isDeep !== true ? result : result.concat(recursive(collection, null, function (currentValue, key, collection, level) {
        return findCollection(currentValue, value) && callback(currentValue, key, collection, level) && currentValue;
    }).collection);
};

/****************
    消抖
****************/

_.debounce = function (func, wait) {
    func = processFunction(func);
    var lock = true;

    return function () {
        if (!lock) return;
        else {
            lock = false;
            var timer = setTimeout(function () {
                lock = true;
                clearTimeout(timer);
            }, wait);
        }
        return func.apply(this, arguments);
    };
};

/****************
    映射
****************/

/*
    对象通过一张映射表来映射
    值与值之间的映射
    这里也要处理下是深映射还是浅映射--那我把深浅的概念提出来吧
    再加个暴力的参数一种是在原有的对象上加映射完的属性，另一种是我直接把原来的干掉
    那这里就又是二维的概念了，一个是映射key还是映射value，另一个是保留原来的还是干掉原来的
*/

var mapping = function (original, form, tag, type, isDestroy) {
    tag = isDestroy ? '' : tag || '_';
    var typeList = {
        key: function (value, key, output, form) {
            output[tag + form[key]] = value;
            isDestroy && delete output[key];
        },
        value: function (value, key, output, form) {
            // 映射值的时候有个小问题，当当前的值是个集合，不是单值的时候，是找不到映射表里面的值的，例如映射表是['a']，迭代的当前值是[1, 2]，那么去找映射的值的时候会是这样['a'][1, 2]，这显然是个undefined，所以要处理下值是集合的情况
            if (typeof (value) === 'object' || _.isFunction(value)) return;
            output[tag + key] = form[key][value];
        }
    };
    // 通过表的key找到obj的key后的值对应表的key的值

    return objectTransformation(original, factoryClone(original, function (value, key, output) {
        // 我觉得还是要保留原来的值，不然其他地方用到就蛋疼了
        if (key in form) typeList[type](value, key, output, form);
    }));
};

/*
    映射value
*/

_.mappingValue = function (collection, form, tag, isDeep, isDestroy) {
    var param = [tag, isDeep, isDestroy].filter(function (currentValue, index, array) {
        return currentValue === true || currentValue === false;
    });

    if (param.length == 2) {
        isDeep = param[0];
        isDestroy = param[1];
    }
    if (param.length == 1) {
        isDeep = param[0];
        isDestroy = false;
    }
    tag = _.isBoolean(tag) ? undefined : tag;
    var OneMappingValue = mapping(collection, form, tag, 'value', isDestroy);

    if (isDeep !== true) return OneMappingValue;
    else {
        recursive(OneMappingValue, null, function (value, key, collection, level) {
            collection[key] = mapping(value, form, tag, 'value', isDestroy);
        });
    }
    return OneMappingValue;
};

/*
    映射key
*/

_.mappingKey = function (collection, form, tag, isDeep, isDestroy) {
    var param = [tag, isDeep, isDestroy].filter(function (currentValue, index, array) {
        return currentValue === true || currentValue === false;
    });

    if (param.length == 2) {
        isDeep = param[0];
        isDestroy = param[1];
    }
    if (param.length == 1) {
        isDeep = param[0];
        isDestroy = false;
    }
    tag = _.isBoolean(tag) ? undefined : tag;
    var OneMappingKey = mapping(collection, form, tag, 'key', isDestroy);

    if (isDeep !== true) return OneMappingKey;
    else {
        recursive(OneMappingKey, null, function (value, key, collection, level) {
            collection[key] = mapping(value, form, tag, 'key', isDestroy);
        });
    }
    return OneMappingKey;
};

/*
    辩证法-你是我，我是你
    键值互换
*/

_.invert = function (original, array) {
    // array是指那些不需要互换的，并不是所有情况都要互换
    function surplus (key) {
        return array.every(function (currentValue, index, array) {
            return currentValue == key;
        });
    }
    // eslint-disable-next-line no-func-assign
    surplus = array ? surplus : function () {};
    return factoryNew(original, function (currentValue, key, output) {
        surplus(key) ? output[key] = currentValue : output[currentValue] = key;
    });
};

/****************
    形式转换
****************/

/*
    把一个集合转换为一个[key, value]形式的数组
*/

_.pairs = function (original) {
    return factoryNew(original, function (currentValue, key, output) {
        output.push([key, currentValue]);
    }, []);
};

/****************
    删除
****************/

var removeSomething = function (collection, deleteCollection, type) {
    var isArrayShift = type !== 'key';
    var result = objectTransformation(collection, factoryNew(collection, function (currentValue, key, output) {
        if (type === 'value' && !_.isExistence(deleteCollection, [currentValue])) output[key] = currentValue;
        if (type === 'key' && !_.isExistence(deleteCollection.join().split(','), [key])) output[key] = currentValue;
    }), isArrayShift);

    return result;
};

/*
    删除vlaue
*/

_.removeValue = function (collection, deleteCollection, isDeep) {
    var oneRemoveValue = removeSomething(collection, deleteCollection, 'value');

    if (isDeep !== true) return oneRemoveValue;
    else {
        recursive(oneRemoveValue, null, function (currentValue, key, collection, level) {
            collection[key] = removeSomething(currentValue, deleteCollection, 'value');
        });
        return oneRemoveValue;
    }
};

/*
    删除key
*/

_.removeKey = function (collection, deleteCollection, isDeep) {
    var oneRemoveKey = removeSomething(collection, deleteCollection, 'key');

    if (isDeep !== true) return oneRemoveKey;
    else {
        recursive(oneRemoveKey, null, function (currentValue, key, collection, level) {
            collection[key] = removeSomething(currentValue, deleteCollection, 'key');
        });
        return oneRemoveKey;
    }
};

/****************
    数字
    我从倒计时，日期，数字的分隔中抽象出数字，也就是抽象出了质料，我又从倒计时，数字的分隔中中抽象出了时间，金钱，也就抽象出了形式，这是数字赋予形式后的2的意思
****************/

/*
    补零
*/

_.fillZero = function (value) {
    return value < 10 ? '0' + value : String(value);
};

/*
    把字符串数字变成数字
*/

var toNumber = function (original) {
    return objectTransformation(original, factoryClone(original, function (currentValue, key, output) {
        var value = _.isString(currentValue) && Number(currentValue);

        if (_.isNumber(value)) output[key] = value;
    }));
};

_.toNumber = function (original, isDeep) {
    var oneToNumber = toNumber(original);

    if (isDeep !== true) return oneToNumber;
    else {
        recursive(oneToNumber, null, function (currentValue, key, collection, level) {
            collection[key] = toNumber(currentValue);
        });
        return oneToNumber;
    }
};

/****************
    金钱
****************/

/*
    数字3位加逗号，金钱显示
*/

_.money = function (value) {
    // eslint-disable-next-line no-useless-escape
    return String(value).split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^\,/, '');
};

/****************
    获取集合的某个值
    目的是为了，不管访问层级都做到兼容不报错
****************/

_.getValue = function (collection, node) {
    node = String(node).split('.');
    var result = '';
    var levelCollection = collection;

    _.forEach(node, function (currentValue, index, array) {
        if (typeof levelCollection === 'object' && currentValue in levelCollection) result = levelCollection[currentValue];
        else result = '';
        levelCollection = _.isObject(levelCollection) ? '' : levelCollection[currentValue];
    });
    return result;
};

/****************
    次数
****************/

/*
    达到次数后才执行
*/

_.after = function (times, func) {
    func = processFunction(func);
    return function () {
        if (--times < 1) return func.apply(this, arguments);
    };
};

/*
    多少次前可以执行函数
*/

_.before = function (times, func) {
    func = processFunction(func);
    var result;

    return function () {
        if (--times >= 0) return func.apply(this, arguments);
        return result;
    };
};

/*
    单次
*/

_.once = _.before.bind('', 1);

/****************
    时间
****************/

/*
    获取某个月份的天数
*/

_.getDays = function (year, month) {
    return new Date(year, month, 0).getDate();
};

/*
★★★★名词★★★★
*/

/*
    原始迭代器
*/

_.identity = function (value) {
    return value;
};

/****************
    数据包裹
****************/
_.wrap = function (oldObj, addObj) {
    return factoryClone(oldObj, function (val, key, newObj) {
        newObj[key] = Object.assign({
            value: val
        }, addObj[key]);
    });
};

/****************
    解除包裹
****************/
_.wrapBack = function (oldObj) {
    return factoryClone(oldObj, function (val, key, newObj) {
        newObj[key] = val.value;
    });
};

export default _;

/* eslint-disable no-console */
/*
    运行
    直到条件成立才停止
    （这个东西我要怎么去把它范畴化呢，一大串描述）
    范畴是最高的概念，没有比他更高的概念了

    有2个问题，一个问题是条件函数的参数怎么传，第二个就是fn函数体怎么传参。。。。。。
    var g = 1;
var a = run(function () {
    console.log(g, 12);
    return g++ > 10;
}, function (v) {
    return v++;
});
var b = a(7777777);

console.log(b(11111), 37);
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