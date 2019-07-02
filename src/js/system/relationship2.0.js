/*
    时间：2018.11
*/
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


3. 我发现关系的根本并不局限于之前写的连带函数关系，更多的本质上是建立联系和说明，至于的函数是最终落实在这个上面而已
4. 又冒出了其他一些想法，比如，既然是多，那每一项的关系表会不止一对一，一对一对一。。。等等，还有就是每一项的关系表不止扁平的，如果有空间的概念的话，每个就有维度，上下级关系，有点越来越多了，有点乱，但是不管是多少多，起点和终点最终应该是统一的，但那张表的初衷是关系表，并不是什么联动表，策略表什么的，一切从有关系开始，至于什么关系，那就是我现在要写的每一个方法

目的：关系表的目的就是建立说明关系，把不相干的东西联系在一起，并不做实际操作，上面已经说的很清楚了

我觉得虽然多有很多，无限的，像维度，嵌套，但想要把这些功能都实现，太复杂，不利于理解，有些东西概念上需要比如间断性，连续性，但我不能为了在功能里面实现连续性和间断性的概念儿去靠，这个主次颠倒了，就像柏拉图把理念放第一位了，
所以我觉得现在对我来说太复杂，太难的，占时不做，主要是保证核心简单干练


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
            let filterMe = array.filter(function (item, idx, arr) {
                return item.n !== currentValue.n;
            });
            obj.continuity = createOneOnOneLine(filterMe, currentValue, obj.continuity);
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
            // 处理这条的rn对象的连续延伸最终到哪里，把他们连起来，形成一条线
            let obj = {};
            obj.n = currentValue.n;
            obj.continuity = [];
            // 先排除自己
            let filterMe = array.filter(function (item, idx, arr) {
                return item.n !== currentValue.n;
            });
            obj.continuity = createOneToManyLine(filterMe, currentValue, obj.continuity);
            obj.continuity.length && (continuity = continuity.concat(obj));
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
var createOneOnOneLine = function (filterMe, currentValue, obj) {
    filterMe.forEach(function (item, idx, arr) {
        // 排除关系延生段循环到自身
        if (JSON.stringify(item, function (k, v) {
            if (_.isFunction(v)) return v.toString();
            return v;
        }) === JSON.stringify(currentValue, function (k, v) {
            if (_.isFunction(v)) return v.toString();
            return v;
        })) return;
        // 寻找的name对象不是数组
        if (!_.isArray(item.n)) {
            // 当寻找到的name对象和传递进来的relationName对象是相同时
            // 这里的relationName对象没有分是不是数组
            if (item.n === currentValue.rn /*|| currentValue.rn.indexOf && currentValue.rn.indexOf(item.n)*/) {
                if (!_.isArray(item.rn)) {
                    // 避免2个关系之间互相引用造成的无限递归的判断
                    if (item.rn !== currentValue.n && !obj.some(function (a, b, c) {
                            return a.name === item.rn.name;
                        })) {
                        obj.push(currentValue.rn, item.rn);
                        // 添加上层关系名称
                        currentValue.rn.n = currentValue.n.name;
                        item.rn.n = currentValue.rn.name;
                        createOneOnOneLine(filterMe, item, obj);
                    }
                } else {
                    item.rn.forEach(function (q, w, e) {
                        // 避免2个关系之间互相引用造成的无限递归的判断
                        if (q !== currentValue.n && !obj.some(function (a, b, c) {
                                return a.name === q.name;
                            })) {
                            obj.push(currentValue.rn, q);
                            // 添加上层关系名称
                            currentValue.rn.n = currentValue.n.name;
                            q.n = currentValue.rn.name;
                            // createOneOnOneLine(filterMe, item, obj);
                        }
                    });
                }
            }
        } else {
        // 寻找的name对象是数组
            if (item.n.indexOf(currentValue.rn) > -1) {
                if (!_.isArray(item.rn)) {
                    // 避免2个关系之间互相引用造成的无限递归的判断
                    if (item.rn !== currentValue.n && !obj.some(function (a, b, c) {
                            return a.name === item.rn.name;
                        })) {
                        obj.push(currentValue.rn, item.rn);
                        // 添加上层关系名称
                        currentValue.rn.n = currentValue.n.name;
                        item.rn.n = currentValue.rn.name;
                        createOneOnOneLine(filterMe, item, obj);
                    }
                } else {
                    item.rn.forEach(function (q, w, e) {
                        // 避免2个关系之间互相引用造成的无限递归的判断
                        if (q !== currentValue.n && !obj.some(function (a, b, c) {
                                    return a.name === q.name;
                                })) {
                            obj.push(currentValue.rn, q);
                            // 添加上层关系名称
                            currentValue.rn.n = currentValue.n.name;
                            q.n = currentValue.rn.name;
                            createOneOnOneLine(filterMe, item, obj);
                        }
                    });
                }
            }   
        }
    });
    return _.uniq(obj);
}

// 一对多的连续性
var createOneToManyLine = function (filterMe, currentValue, obj) {;
    filterMe.forEach(function (item, idx, arr) {
        // 排除关系延生段循环到自身
        if (JSON.stringify(item, function (k, v) {
            if (_.isFunction(v)) return v.toString();
            return v;
        }) === JSON.stringify(currentValue, function (k, v) {
            if (_.isFunction(v)) return v.toString();
            return v;
        })) return;
        // 一对多的name不是数组
        if (!_.isArray(item.n)) {
            // 找到了连续的下一个
            if (_.isArray(currentValue.rn)) {
                if (currentValue.rn.indexOf(item.n) > -1) {
                    let idx = currentValue.rn.indexOf(item.n);
                    if (!_.isArray(item.rn)) {
                        // 避免2个关系之间互相引用造成的无限递归的判断
                        if (item.rn !== currentValue.n && !obj.some(function (a, b, c) {
                            return a.name === item.rn.name;
                        })) {
                            obj.push(currentValue.rn[idx], item.rn);
                            // 添加上层关系名称
                            currentValue.rn.n = currentValue.n.name;
                            item.rn.n = currentValue.rn[idx].name;
                            createOneToManyLine(filterMe, item, obj);
                        }
                    } else {
                        item.rn.forEach(function (q, w, e) {
                            // 避免2个关系之间互相引用造成的无限递归的判断
                            if (q !== currentValue.n && !obj.some(function (a, b, c) {
                                return a.name === q.name;
                            })) {
                                obj.push(currentValue.rn[idx], q);
                                // 添加上层关系名称
                                currentValue.rn.n = currentValue.n.name;
                                q.n = currentValue.rn[idx].name;
                                createOneToManyLine(filterMe, e, obj);
                            }
                        });
                    }
                }
            } else {

            }
        } else {
        // 一对多的name是数组
            item.n.forEach(function (h, j, k) {
                if (_.isArray(currentValue.rn)) {
                    if (currentValue.rn.indexOf(h) > -1) {
                        let idx = currentValue.rn.indexOf(h);
                        if (!_.isArray(item.rn)) {
                            // 避免2个关系之间互相引用造成的无限递归的判断
                            if (item.rn !== currentValue.n && !obj.some(function (a, b, c) {
                                return a.name === item.rn.name;
                            })) {
                                obj.push(currentValue.rn[idx], item.rn);
                                // 添加上层关系名称
                                currentValue.rn.n = currentValue.n.name;
                                item.rn.n = currentValue.rn.name;
                                createOneToManyLine(filterMe, item, obj);
                            }
                        } else {
                            // 避免2个关系之间互相引用造成的无限递归的判断
                            item.rn.forEach(function (q, w, e) {
                                if (q !== currentValue.n && !obj.some(function (a, b, c) {
                                    return a.name === q.name;
                                })) {
                                    obj.push(currentValue.rn[idx], q);
                                    // 添加上层关系名称
                                    currentValue.rn.n = currentValue.n.name;
                                    q.n = currentValue.rn.name;
                                    createOneToManyLine(filterMe, e, obj);
                                }
                            });
                        }
                    }
                } else {
                    
                }
            });
        }
    });
    return _.uniq(obj);
}