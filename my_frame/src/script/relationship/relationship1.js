import _ from 'lodash';
export default function (relationshipTable, a, b, c, d) {
    // 返回变成扁平化的对象，一对一
    var oneOnOneRelationshipTable = [];
    // 回调函数返回的结果集
    var result = [];
    relationshipTable.forEach(function (currentValue, index, array) {
        // 一对一
        if (!_.isArray(currentValue.n) && !_.isArray(currentValue.rn)) {
            oneOnOneRelationshipTable.push(currentValue);
            a && result.push(a(currentValue, index, array));
        }
        // 一对多
        if (!_.isArray(currentValue.n) && _.isArray(currentValue.rn)) {
            currentValue.rn.forEach(function (item, idx, arr) {
                var newObj = {};
                newObj.n = currentValue.n;
                newObj.rn = item;
                oneOnOneRelationshipTable.push(newObj);
            });
            b && result.push(b(currentValue, index, array));
        }
        // 多对一
        if (_.isArray(currentValue.n) && !_.isArray(currentValue.rn)) {
            currentValue.n.forEach(function (item, idx, arr) {
                var newObj = {};
                newObj.n = item;
                newObj.rn = currentValue.rn;
                oneOnOneRelationshipTable.push(newObj);
            });
            c && result.push(c(currentValue, index, array));
        }
        // 多对多
        if (_.isArray(currentValue.n) && _.isArray(currentValue.rn)) {
            currentValue.rn.forEach(function (item, idx, arr) {
                currentValue.n.forEach(function (a, b, c) {
                    var newObj = {};
                    newObj.n = a;
                    newObj.rn = item;
                    oneOnOneRelationshipTable.push(newObj);
                });
            });
            d && result.push(d(currentValue, index, array));
        }
    });
    return {
        one : oneOnOneRelationshipTable,
        callback : result
    };
};