/*
名称：tobe.js
版本：2.4
时间：2018.04

更新：
18. 时间的控制比较蛋疼，比如我要获取3个月前的时间戳，1几小时前（反正就是要获得某一点的时间戳）
19. 增加链式操作
20. 我发现业务逻辑里面好多地方都是相互交叉的耦合，很多很杂，比如说我在操作这个表格的时候，另外某个地方也要有变化，这就非常繁琐，能不能写个类似中介者的东西，虽然vue的数据绑定和watch很方便
21. 想想一个写好的函数如何做好很好的扩展，首先它的核心功能是什么，然后能在不改动内部代码的情况下添加功能和状态？？
22. 有些可以写一个单列模式，干过一次的事情不要再干了
23. 等整理的差不多了，我要好好斟酌一下方法的名字
24. 想想怎么像lodash那样按需加载，我要那个方法就加载哪里方法
25. 把while循环也写成函数迭代的形式
26. var a = [1,2,3]
    var b = [a,b,c]
    请问如何得到c数组
    var c = [1,a,2,b,3,c]
27. 交互中，点自己还是点别人的问题，还有就是位置，上一个是什么，下一个什么，前一个是什么，后一个是什么，也就是空间位置的问题，好好想想，会有收获的，就像一个记忆系统，分2中状态，当前状态，我总能感觉到现在的我，还有种就是过去的我
28. 交互中的上下级关系怎么体现在数据中，比如说父级变了，子集也要变
29. 上面只是1和2的关系，还有连环关系，1和2和3和。。。。连环关系，草，就像这个日历，没选月，日不能选，没选年，月日不能选，不能小看怎么个简单的日历组件，包含着及其丰富的逻辑
30. 写模糊时间组件时候各种显示隐藏的状态也是相当蛋疼的，单显示，单隐藏，然后是满足什么条件隐藏，满足什么条件消失，也就是当前状态的管理
31. 创建单个对象以后可以写关系系统把他嵌入到对象里面（一个关系网）状态的变更：一对一的变更，一对多的变更
32. 写城市切换明白了，布局排版的变化如果不能用样式解决，最终还是可以通过改变数据结构来影响布局
33. 写模糊日期明白了面向对象的优势，就是不同对象属性的独立性和整体性
34. 写个数组交叉
35. 看到sass的权限配置代码里嵌套5,6层的if-else和页面上4,5级联动效果的时候，我隐约感觉到为什么有时候要动态创建对象，而不是字面量的形式（比如我可以先创建一个平级对象，把属性完成后，再去动态创建这个对象的上下级关系）
36. 递归循环做下队列，以免陷入死循环
37. 把所有的功能都网上再找其他的方法，看看人家是怎么写的，不做井底之蛙，把一种功能的实现多元化，尽可能多的用不同的方法实现一种功能，（不要气馁，终究是要通过意见走向真理的）
38. 这里要写个无限进一位的方法（数字加1不就进1了吗。。。。。）但有些不是数字，也就是有连带关系的
39. 我在想有没有突破条件逻辑的写法，至少挣脱一些必须先判断才能做的事情（我现在想到的是从整体到局部写，就像画素描一样，先打框架，在抠细节，想想自己写的toFixed）
40. 加map，every，some
41. 这么庞大的数据结构怎么检测???
42. 等形成了一定的体系核心代码后可以给自己的核心代码写插件和接口，能组装起来
43. _.isExistence有思考，能传谓词函数来判断基本类型，那如果我真的是要判断引用类型呢，就挂了
44. _.findCollection升级一下，让他应用类型也能寻找
45. 操作数据嵌套循环的各种方法，要熟练，就是有一堆数据我想要什么我一下子能拿得到就好了，主要涉及递归，深度查找，广度查找，各种算法查找


抽象是哲学的根本特点，代码亦如此。
（理念和实体）（共相和殊相）（抽象和具象）（现象和本质）（形式和内容）

抽象的程度
    抽象的程度越深，那抽象出来的离抽象本身最近，越一般，与其他抽象越紧密，如果2个抽象依旧没有关系，就说明抽象的程度没有达到联系的那一层，需继续抽象
*/

/*
----关于页面----

♥♥♥♥状态♥♥♥♥
初始状态，修改状态，删除状态，添加状态，重置状态，当前状态

（在抽象弹窗抽象出通知的时候，我一度很困惑，这个概念总感觉是相当的具象，因为他限于人，并非动植物，或是无生命体，有局限性，所以具象，所以还不够通用，不够一般，那就再往上抽，把他的属差去掉，他的属差是什么，是人，是有理性，是主观主动性，然后想了想，“发出信息”就出来了，这就不限客观载体了，生命体能发出信息，非生命体也能发出信息，这样就是更加一般形式了）

♥♥♥♥数据♥♥♥♥

♥♥♥♥可读函数♥♥♥♥
还有就是有些判断和对象的赋值操作乍看之下看不出逻辑是什么意思，要联系上下文才看的懂，所以最好封装成有名字的函数运行，读起来会好很多


♥♥♥♥处理业务逻辑和处理数据分开♥♥♥♥
主体业务逻辑不包含处理数据的部分，我的意思是那些是给人看的代码，和给计算机的代码分开，这样我就能专注业务逻辑了，不会一会写着业务逻辑，一遍处理数据

*/

/* 
★★★★★★★★★★★★★★★★★★★★
我先不要太烦恼和纠结于寻找那个最大种同时让这个最大的种与我现在写的东西的种之间建立关系等级，因为这是终极目标，不可能一下子找到和建立联系的，那么我现在要掉转枪头，把切入点放在我已有的方法上，从我具体的方法出发，往上找他的形式，往下找他的质料，

★★★★★★★★★★★★★★★★★★★★
*/

/*
阅读代码比阅读文章困难是因为，一段代码可能会依赖很多函数，你为了了解每个函数的作用不得不跳到其他代码块，这不符合我们的阅读习惯。 偶尔在一本书中看到这样一句话：“面向对象语言的问题是，它们永远都要随身携带那些隐式的环境。你只需要一个香蕉，但却得到一个拿着香蕉的大猩猩…以及整个丛林”。
哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
这就是纯函数
*/

/****************
    私有
****************/

/*
    输入输出迭代工厂
*/

// 对柯理化的进一步理解
var factory = function (callback, original, iterator, array) {
    // 以前这是第一步
    /*callback = callback || function (original, output) {
        return output;
    };*/
    
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

var objectTransformation =  function (original, output, isArrayShift) {
    return _.isArray(original) ? transformation(output, [], isArrayShift) : transformation(output, {});
}

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
        collection : [],
        value : [],
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

/*
    随机
*/

var random = function () {
    return Math.floor(Math.random() * 10);
};

var _ = {};
_.recursive = recursive;
/*
★★★★动词★★★★
*/

/****************
    复制
****************/

var clone = function (original) {
    return objectTransformation(original, factoryClone(original));
};

_.clone = function (original,  isDeep) {
    original = processCollection(original);
    return isDeep !== true ? clone(original) : JSON.parse(JSON.stringify(original));
};

/****************
    迭代
    迭代，过滤的深度操作没有意思，应为集合也是值，如果判断是集合就深入，那他本身是不能处理的，所以不可取
****************/

_.forEach = function (collection, iterator) {
    collection = processCollection(collection);
    iterator = processFunction(iterator);
    Object.keys(collection).forEach(function (currentValue, key, array) {
        iterator(collection[currentValue], currentValue, collection);
    });
};

/****************
    过滤
****************/

/*
    过滤一些特定条件后的数据
    开始想过滤也加深度，后来发现不靠谱，因为他是根据谓词函数来控制的，控制权在用户手里，用户可以操作集合并非一定要基础类型的值，所以我去通过递归循环过滤没有意义，集合本来就是个值，可以被过滤掉的
*/

_.filter = function (original, predicate) {
    predicate = processFunction(predicate);
    return objectTransformation(original, factoryNew(original, function (currentValue, key, output) {
        if (predicate(currentValue, key, output)) output[key] = currentValue;
    }), true);
};

/*
    过滤假值
*/

_.filterFalse = function (collection) {
    return _.filter(collection, function (currentValue, key, collection) {
        return !!currentValue;
    });
};

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
        if (!lock) return; else {
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
        key : function (value, key, output, form) {
            output[tag + form[key]] = value;
            isDestroy && delete output[key];
        },
        value : function (value, key, output, form) {
            // 映射值的时候有个小问题，当当前的值是个集合，不是单值的时候，是找不到映射表里面的值的，例如映射表是['a']，迭代的当前值是[1, 2]，那么去找映射的值的时候会是这样['a'][1, 2]，这显然是个undefined，所以要处理下值是集合的情况
            if (typeof(value) === 'object' || _.isFunction(value)) return;
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
    if (isDeep !== true) return OneMappingValue; else {
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
    if (isDeep !== true) return OneMappingKey; else {
        recursive(OneMappingKey, null, function (value, key, collection, level) {
            collection[key] = mapping(value, form, tag, 'key', isDestroy);
        });
    }
    return OneMappingKey;
}

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
    surplus = array ? surplus : function () {};
    return factoryNew(original, function (currentValue, key, output) {
        surplus(key) ? output[key] = currentValue : output[currentValue] = key;
    });
};

/****************
    去重
****************/

_.uniq = function (array) {
    array = processArray(array);
    return transformation(factoryNew(array, function (currentValue, index, output) {
        output[currentValue] = currentValue;
    }), [], true);
};

/****************
    打乱顺序
****************/

_.shuffle = function(original) {
    original = processArray(original);
    return factoryNew(original, function (currentValue, index, output) {
        var random = _.randomNumber(0, index);
        if (random !== index) output[index] = output[random];
        output[random] = currentValue;
    }, []);
};

/****************
    分组
****************/

_.chunk = function (collection, size) {
    collection = processCollection(collection);
    var length = Math.ceil(collection.length / size);
    var result = [];
    var index = 0;
    while (index++ < length) result.push(collection.splice(0, size));
    return result;
};

/****************
    集合--并集，交集，补集，
****************/

/*
    不管多少个求交集，补集，都是2个之间集合的比较
*/

var perGenusEtDifferentiam = function (aCollection, bCollection) {
    var equally = [];
    var difference = [];
    // 首先自己要去重，不然就bug了
    var allCollection = _.value([_.uniq(aCollection), _.uniq(bCollection)]);
    _.forEach(allCollection, function (currentValue, key, array) {
        var result = [];
        var index = array.indexOf(currentValue);
        while (index != -1) {
          result.push(index);
          index = array.indexOf(currentValue, index + 1);
        }
        result.length === 2 && equally.push(currentValue);
        result.length === 1 && difference.push(currentValue);
    });
    return {
        equally : _.uniq(equally),
        difference : difference
    };
};

/*
    并集
*/

_.union = function () {
    return _.uniq(_.value([].slice.call(arguments)));
};

/*
    交集
*/

_.intersection = function () {
    if (arguments.length < 2) return [];
    var result = factoryNew(_.chunk([].slice.call(arguments), 2), function (currentValue, key, output) {
        if (currentValue.length === 1) output.push(currentValue[0]); else output.push(perGenusEtDifferentiam(currentValue[0], currentValue[1]).equally);
    }, []);
    if (result.length >= 2) result = _.intersection.apply(null, result);
    return _.value(result);
};

/*
    补集
*/

_.complement = function () {
    var result = factoryNew(_.chunk([].slice.call(arguments), 2), function (currentValue, key, output) {
        if (currentValue.length === 1) output.push(currentValue[0]); else output.push(perGenusEtDifferentiam(currentValue[0], currentValue[1]).difference);
    }, []);
    if (result.length >= 2) result = _.intersection.apply(null, result);
    return _.value(result);
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
    var isArrayShift = type === 'key' ? false : true;
    var result = objectTransformation(collection, factoryNew(collection, function (currentValue, key, output) {
        if (type === 'value' && !_.isExistence(deleteCollection, [currentValue])) output[key] = currentValue;
        if (type === 'key' && !_.isExistence(deleteCollection.join().split(','), [key])) output[key] = currentValue
    }), isArrayShift);
    return result;
};

/*
    删除vlaue
*/

_.removeValue = function (collection, deleteCollection, isDeep) {
    var oneRemoveValue = removeSomething(collection, deleteCollection, 'value');
    if (isDeep !== true) return oneRemoveValue; else {
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
    if (isDeep !== true) return oneRemoveKey; else {
        recursive(oneRemoveKey, null, function (currentValue, key, collection, level) {
            collection[key] = removeSomething(currentValue, deleteCollection, 'key');
        });
        return oneRemoveKey;
    }
};

/*
    删除空格
*/

var trim = function (collection) {
    return objectTransformation(collection, factoryClone(collection, function (currentValue, key, output) {
        if (_.isString(currentValue)) output[key] = currentValue.replace(/(^\s*)|(\s*$)/g,'');
    }));
};

_.trim = function(collection, isDeep) {
    var oneTrim = trim(collection);
    if (isDeep !== true) return oneTrim; else {
        recursive(oneTrim, function (currentValue, key, collection, level) {
            if (_.isString(currentValue)) collection[key] = currentValue.replace(/(^\s*)|(\s*$)/g,'');
        });
    }
    return oneTrim;
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
        if(_.isNumber(value)) output[key] = value;
    }));
};

_.toNumber = function (original, isDeep) {
    var oneToNumber = toNumber(original);
    if(isDeep !== true) return oneToNumber; else {
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
    return String(value).split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^\,/,'');
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
        if (typeof levelCollection === 'object' && currentValue in levelCollection) result = levelCollection[currentValue]; else result = '';
        levelCollection = _.isObject(levelCollection) ? '' : levelCollection[currentValue];
    });
    return result;
};

/****************
    组合对象集合
****************/

var assign = function (original, basics) {
    original = _.clone(processCollection(original), true);
    // 处理引用值的键
    var citeKey = [];
    recursive(basics, function (currentValue, key, collection, level) {
        citeKey.push(key);
    }, function (currentValue, key, collection, level) {
        citeKey.push(key);
    });
    var basicsCollection = factoryNew(citeKey, function (currentValue, key, output) {
        var parent;
        var parentLevel;
        var result = _.findCollection(basics, {
            key : currentValue
        }, function (currentValue, key, collection, level) {
            parent = key;
            parentLevel = level;
            return true;
        }, true);
        result.length && output.push({
            parent : parent,
            parentLevel : parentLevel ? parentLevel : 0,
            value : result[0]
        });
    }, []);
    // 处理基础值的键
    var basicsObject = _.filter(basics, function (currentValue, key, collection) {
        var isCite = _.isObject(currentValue) || _.isArray(currentValue);
        return !isCite || isCite && !Object.keys(currentValue).length;
    });
    _.forEach(basicsCollection.sort(function (a, b) {
        return b.parentLevel - a.parentLevel;
    }), function (currentValue, key, collection, level) {
        // 这是存在属性合并的情况
        recursive(original, null, function (current, bolt, object, grade) {
            if (grade === currentValue.parentLevel && currentValue.parent in object && bolt === currentValue.parent) {
                object[bolt] = Object.assign(current, currentValue.value);
                // 更新原始值
                var result = _.findCollection(basics, {
                    key : currentValue.parent
                }, true);
                if (result.length) result[0][currentValue.parent] = object[bolt];
            }
        });
        // 第一层不存在属性要添加的情况
        if (currentValue.parentLevel === 1 && !(currentValue.parent in original)) original[currentValue.parent] = currentValue.value;
    });
    return Object.assign(original, basicsObject);
};

_.assign = function () {
    var result = factoryNew(_.chunk([].slice.call(arguments), 2), function (currentValue, key, output) {
        if (currentValue.length === 1) output.push(currentValue[0]); else output.push(assign(currentValue[0], currentValue[1]));
    },[]);
    result = result.length >= 2 ? _.assign.apply(null, result) : result[0];
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
        if (--times >= 0) return result = func.apply(this, arguments);
        return result;
    };
};

/*
    单次
*/

_.once = _.before.bind('', 1);

/****************
    装饰
******************/

_.decorate = function (before, after) {
    before = processFunction(before);
    after = processFunction(after);
    return function () {
        var beforeResult = before.apply(this, arguments);
        beforeResult = _.isArray(beforeResult) ? beforeResult : [];
        return after.apply(this, beforeResult);
    };
};

/****************
    随机
******************/

/*
    随机数字
*/

_.randomNumber = function (digit, digit2) {
    switch (arguments.length) {
        case 0 : return random();
        case 1 : 
            return Math.floor((Math.random() + '').replace(/\.0+/, '.') * Math.pow(10, digit));
        default : 
            return parseInt(digit + Math.random() * (digit2 - digit));
    }
};

/*
    随机字母
*/

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

/*
    随机数字字母
*/

_.randomNumberAlphabet = function (digit) {
    var number = _.randomNumber(0, digit);
    var string = _.randomNumber(number) + _.randomAlphabet(digit - number);
    return _.isNaN(number) ? NaN : _.shuffle(string.split('')).join('');
};

/*
    随机颜色
*/

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



/*
★★★★谓词★★★★
*/

/*
    判断值是不是NaN
*/

_.isNaN = function (n) {
    return n !== n;
};

/*
    判断一个值是不是数字类型
*/

_.isNumber = function (n) {
    return typeof n === 'number' && !_.isNaN(n);
};

/*
    判断一个值是不是整数
*/

_.isInteger = function (n) {
    return _.isNumber(n) && n % 1 === 0;
};

/*
    判断一个值是不是奇数
*/

_.isOdd = function (n) {
    return Math.abs(n % 2) === 1;
};

/*
    判断一个值是不是偶数
*/

_.isEven = function (n) {
    return n % 2 === 0;
};

/*
    判断数据类型
*/

['Arguments', 'Array', 'Function', 'String', 'Date', 'RegExp', 'Object', 'Boolean'].forEach(function (currentValue, index, array) {
    _['is' + currentValue] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + currentValue + ']';
    };
});

/*
    判断2个对象是否相等
*/

_.isEqual = function (a, b, aStack, bStack) {
    if (!aStack || !bStack) if (!_.isObject(a) && !_.isArray(a) || !_.isObject(b) && !_.isArray(b)) return false;
    var c1 = Object.prototype.toString.call(a);
    // 类型不同直接out
    if (c1 !== Object.prototype.toString.call(b)) return false;
    // 判断不同类型
    // 最终还是直达基本类型来比较
    switch (c1) {
        case '[object String]' :
        case '[object RegExp]' :
            return '' + a === '' + b;
        case '[object Number]' :
        case '[object Date]' :
        case '[object Boolean]' :
            return +a === +b;
    }
    // 初次就产生栈
    aStack = aStack || [];
    bStack = bStack || [];
    // 进栈
    aStack.push(a);
    bStack.push(b);
    // 从a的key入手
    var akeys = Object.keys(a);
    var key;
    var length = akeys.length;
    // 首先判断2个集合的长度是否一样，不一样就立马停掉，后面都不需要做了
    if (length !== Object.keys(b).length) return false;
    while (length--) {
        // 每个key
        key = akeys[length];
        // 开始判断了
        if (!_.isEqual(a[key], b[key], aStack, bStack)) return false;
    }
    // 这个维度验证通过，栈弹出
    // 直接递归就可以了，为什么还要用到栈呢？？？？？
    // 因为防止对象自引用，导致的无限递归
    aStack.pop();
    bStack.pop();
    // 到这里就说明这一维度的数组的值相等
    return true;
};

/*
    判断一堆数据中是否存在一个，一种，多个，多种数据
*/

var existence = function (collection) {
    // 现在只是单个存在，要添加多个存在，不但存在一，还要存在多
    // 存在多
    var args = [].slice.call(arguments, 1);
    if (!args.length) return false;
    // 纯值
    var value = [];
    // 谓词判断
    var predicate = [];
    args.forEach(function (currentValue, index, array) {
        _.isFunction(currentValue) ? predicate.push(currentValue) : value.push(currentValue);
    });
    value = value.length == 0 ? true : value.every(function (currentValue, index, array) {
        for (var key in collection) if (collection[key] === currentValue) return true;
        return false;
    });
    predicate = predicate.length == 0 ? true : predicate.every(function (currentValue, index, array) {
        for (var key in collection) if (currentValue(collection[key])) return true;
        return false;
    });
    return value && predicate;
};
_.isExistence = function (collection, value, isDeep) {
    collection = processCollection(collection);
    value = processCollection(value);
    if (isDeep !== true) {
        value.unshift(collection);
        return existence.apply(null, value);
    } else {
        value.unshift(_.value(collection, true));
        return existence.apply(null, value);
    }
};

/*
    反转谓词结果，跟其他具体的谓词函数合为一个整体
*/

_.negate = function (predicate) {
    predicate = processFunction(predicate);
    return function () {
        return !predicate.apply(null, arguments);
    };
};

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
            value : val,
        }, addObj[key]);
    });
}

/****************
    解除包裹
****************/
_.wrapBack = function (oldObj) {
    return factoryClone(oldObj, function (val, key, newObj) {
        newObj[key] = val.value;
    });
};




// 解决浮点数
// 加法
var aaaa = {
    accAdd : function(arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch(e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch(e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (_.accMul(arg1, m) + _.accMul(arg2, m)) / m;
    },
    // 减法
    accSub : function(arg1, arg2){      
        return _.accAdd(arg1, -arg2);  
    },
    // 乘法
    accMul : function(arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        } catch(e) {}
        try {
            m += s2.split(".")[1].length;
        } catch(e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    // 除法
    accDiv : function(arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1,
            r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        } catch(e) {}
        try {
            t2 = arg2.toString().split(".")[1].length;
        } catch(e) {}
        with(Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    },
}



/****************
    空间
****************/

/*未完成*/
/*
    重复行为
    重复做直到达到目标，不达目的誓不罢休
    但这里只是重复特定的值，万一我是要做其他更具体的事情呢？？？？其他情况最终还是转化为一个值
*/
_.repeat = function (iterator, predicate, array) {
    array = array ? [] : array;
    // 创建一个新值
    var res = iterator();
    // 判断这个新值在某个条件中符合不符合
    // 如果符合就添加到数据中
    // 如果不符合接着递归直到符合
    if (predicate(array, res)) {
        // 达到目的停止
        array.push(res);
        return res;
    // 没达到目的继续
    } else _.repeat(iterator, predicate, array);
};

/*
    第三者
    发现很多模式都是通过第三者甚至第n者来进行对象与对象之间的访问的，比如中介者，代理
    未完成。。。。。。
*/
_.third = function () {

};
/*
    策略
    访问对象的属性
    未完成。。。。。。
*/
_.strategy = function (road) {

};
/*
    js特性的终极目标--动态变化
    未完成。。。。。。
*/
_.change = function () {
    // ...
    return function () {
        // ...
    };
};


// export default _;