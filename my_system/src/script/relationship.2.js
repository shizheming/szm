import _ from 'lodash';
// 添加方法。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
const relationship = function (relationshipTable, a, b, c, d) {
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
            const obj = {};

            obj.n = currentValue.n;
            obj.continuity = [];
            // 先排除自己
            const filterMe = array.filter(function (item, idx, arr) {
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
            const obj = {};

            obj.n = currentValue.n;
            obj.continuity = [];
            // 先排除自己
            const filterMe = array.filter(function (item, idx, arr) {
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
        one: oneOnOneRelationshipTable,
        callback: result,
        continuity: continuity
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
            if (item.n === currentValue.rn /* || currentValue.rn.indexOf && currentValue.rn.indexOf(item.n) */) {
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
};

// 一对多的连续性
var createOneToManyLine = function (filterMe, currentValue, obj) {
    ;
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
                    const idx = currentValue.rn.indexOf(item.n);

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
                        const idx = currentValue.rn.indexOf(h);

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
};

export default relationship;