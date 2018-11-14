/*
关系表数据操作
属性和方法：（运动）
    1，添加关系
    2，删除关系
    3，替换关系
    4，查看关系
一和多：（数的关系）
    1，一对一
    2，一对多
    3，多对一
    4，多对多
静和动，时间和空间，间断和连续
空间：
    1，形状
    4，（长，宽，高）概念实体化

问题：
    1. 我在设计关系表的时候遇到了这样一个问题，就是在多对一的时候我是运行了多里面的一个，就会触发关系的那个一，还是要全部的多都运行过，才会触发关系的那个一，比较纠结这个问题，2种情况，然后我会试着询问同事，有没有第三种，第四种，第n种情况
回答：
    1. 梳理了一下，有2点，第一，关系没有动态的，那种连带触发的是对象行为本身，不是关系，关系只是静态说明，第二，上面说的怎么触发关系函数本身理解上就存在不同点，关系只是说明，a和b有关系，并不是a运行了，b一定要运行一样，只起到说明作用，然后就是关系表只表明他们之间有关系，至于是什么关系并不赋予，只有当调用某个特定的方法后，才会确立实在关系，比如我调用了连带方法，那么关系表的关系表明的就是连带关系，而我调用了策略方法的时候，关系表就代表的是条件头和条件体的关系了，至于在多对一的多条件的情况下怎么触发条件体那是这个方法所做的事情了（我是满足一个条件就触发，还是全部条件都要满足，还是满足第几个，还是。。。。。。），并不是关系表所考虑的范围内

1. 把多变成一，对外面向用户我用了多，而对内在我能控制的情况下，我坚持一
2. 变成一我不知道有什么优势，但我清楚要脱离用形的数据来说明说句之间的关系，而是往对象上打点的方式来说明，脱离形
3. 我发现关系的根本并不局限于之前写的连带函数关系，更多的本质上是建立联系和说明，至于的函数是最终落实在这个上面而已
4. 又冒出了其他一些想法，比如，既然是多，那每一项的关系表会不止一对一，一对一对一。。。等等，还有就是每一项的关系表不止扁平的，如果有空间的概念的话，每个就有维度，上下级关系，有点越来越多了，有点乱，但是不管是多少多，起点和终点最终应该是统一的，但那张表的初衷是关系表，并不是什么联动表，策略表什么的，一切从有关系开始，至于什么关系，那就是我现在要写的每一个方法
又很多概念都是同时具有的，并不是纯的那种，那我要找纯的那种在哪里


*/

// 添加方法。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
_.relationship = function (relationshipTable, a, b, c, d) {
    // 多变一最后分解的对象，要吐出去的
    // 现在这个是处理出来了，但还没有实际的用处，暂时停留在多变一的想法上面
    var oneOnOneRelationshipTable = [];
    // 回调函数返回的结果集
    var result = [];
    // 连续性集合 
    var continuity = [];

    relationshipTable.forEach(function (currentValue, index, array) {
        // 一对一
        if (!_.isArray(currentValue.n) && !_.isArray(currentValue.rn)) {
            oneOnOneRelationshipTable.push(currentValue);
            // 外界不同形式的回调入口
            a && result.push(a(currentValue, index, array));
            // 处理这条的rn对象的连续延伸最终到哪里，把他们连起来，形成一条线
            let obj = {};
            obj.n = currentValue.n;
            obj.continuity = [];
            // 先排除自己
            var filterMe = array.filter(function (item, idx, arr) {
                return item.n !== currentValue.n;
            });
            obj.continuity = createLine(filterMe, currentValue.rn, obj.continuity);
            obj.continuity.length && (continuity = continuity.concat(obj));
        }
        // 一对多
        if (!_.isArray(currentValue.n) && _.isArray(currentValue.rn)) {
            // 把多变成一
            currentValue.rn.forEach(function (item, idx, arr) {
                var newObj = {};
                newObj.n = currentValue.n;
                newObj.rn = item;
                oneOnOneRelationshipTable.push(newObj);
            });
            // 外界不同形式的回调入口
            b && result.push(b(currentValue, index, array));
        }
        // 多对一
        if (_.isArray(currentValue.n) && !_.isArray(currentValue.rn)) {
            // 把多变成一
            currentValue.n.forEach(function (item, idx, arr) {
                var newObj = {};
                newObj.n = item;
                newObj.rn = currentValue.rn;
                oneOnOneRelationshipTable.push(newObj);
            });
            // 外界不同形式的回调入口
            c && result.push(c(currentValue, index, array));
        }
        // 多对多
        if (_.isArray(currentValue.n) && _.isArray(currentValue.rn)) {
            // 把多变成一
            currentValue.rn.forEach(function (item, idx, arr) {
                currentValue.n.forEach(function (a, b, c) {
                    var newObj = {};
                    newObj.n = a;
                    newObj.rn = item;
                    oneOnOneRelationshipTable.push(newObj);
                });
            });
            // 外界不同形式的回调入口
            d && result.push(d(currentValue, index, array));
        }
    });
    return {
        one : oneOnOneRelationshipTable,
        callback : result,
        continuity : continuity
    };
};

// 一对一的连续性
var createLine = function (filterMe, rn, obj) {
    filterMe.forEach(function (item, idx, arr) {
        // 一对一的找不是数组的
        if (!_.isArray(item.n)) {
            // 找到了连续的下一个
            if (item.n === rn) {
                if (!_.isArray(item.rn)) {
                    obj.push([rn, item.rn]);
                     return createLine(filterMe, item.rn, obj);
                } else {
                    let result = [];
                    item.rn.forEach(function (q, w, e) {
                        obj.push([rn, q]);
                        result = result.concat(createLine(filterMe, q, obj));
                    });
                    return result;
                }
            }
        } else {
        // 一对一找的是数组
            if (item.n.indexOf(rn) > -1) {
                if (!_.isArray(item.rn)) {
                    obj.push([rn, item.rn]);
                    return createLine(filterMe, item.rn, obj);
                } else {
                    let result = [];
                    item.rn.forEach(function (q, w, e) {
                        obj.push([rn, q]);
                        result = result.concat(createLine(filterMe, q, obj));
                    });
                    return result;
                }
            }   
        }
    });
    return obj;
}