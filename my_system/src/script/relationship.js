/* eslint-disable no-console */
/*
    关系
    动态静态：（运动）
        1，添加关系
        2，删除关系
        3，替换关系
        4，查看关系
    核心就是：
        1，一对一
        2，一对多
        3. 多对一（把m和y的值颠倒下就变成一对多了----在策略中有多种条件产生一个结果）

    目的：关系表的目的就是建立说明关系，把不相干的东西联系在一起，并不做实际操作（比如联动），

    这里多运用些函数式的概念技巧去处理
    组合，柯里化，部分应用，单一功能原则，纯函数
    提取形式

    我觉得虽然多有很多，无限的，像维度，嵌套，但想要把这些功能都实现，太复杂，不利于理解，有些东西概念上需要比如间断性，联动性，但我不能为了在功能里面实现联动性和间断性的概念儿去赢靠，这个主次颠倒了，就像柏拉图把理念放第一位了，
    所以我觉得现在对我来说太复杂，太难的，占时不做，主要是保证核心简单干练

*/
import _ from 'lodash';
import __ from './_';
const relationship = function (relationship) {
    var a = relationship.map(currentValue => {
        var {m, y} = currentValue;

        if (isOneOnOne(m, y)) {
            return {
                m,
                y
            };
        }
        if (isOneToMany(m, y)) {
            return y.map(item => {
                return {
                    m,
                    y: item
                };
            }); 
        }
    });
    var b = compose(_.flatten, filterFalse)(a);
    // 最终哟啊变成1对多的结构，拿到外面的数据先打散成一对一，在重组成一对多
    // 先把一对一变成一对多
    // 拿key
    var keys = b.map(current => {
        return current.m.name;
    });
    // 去重
    var onlyKey = _.uniq(keys);
    // 合并m
    var r = {};
    onlyKey.forEach(current => {
        var f = b.filter(item => {
            return item.m.name === current;
        });
        r[current] = {
            
            m: f[0].m,
            y: f.map(i => {
                return i.y;
            })
        };
    });
    function createRelationshipTable (o, result = []) {
        o.forEach(value => {
            var no = {};
            no.m = value;
            if (r[value.name]) {
                no.y = createRelationshipTable(r[value.name].y);
            }
            result.push(no);
        });
        return result;
    }
    var tree = {};
    __.forEach(r, (value, key) => {
        tree[key] = createRelationshipTable(value.y);
    });
    // 把头塞进去
    __.forEach(tree, (value, key, o) => {
        var fn = r[key].m;
        o[key] = [
            {
                m: fn,
                y: value
            }
        ];
    });
    // console.log(tree, 'tree');

    var lines = [];
    function getLine (arr, result = []) {
        arr.forEach((current, index) => {
            if (index) result.pop();
            result.push(current.m);
            if (current.y) {
                getLine(current.y, [...result]);
            } else {
                lines.push([...result]);
            }
        });
    }
    __.forEach(tree, (value) => {
        getLine(value);
    });
    // console.log(lines, 28);

    return {
        lines,
        r
    };
};



const filterFalse = function (a) {
    return a.filter(function () {
        return a !== '' && a !== false && a !== undefined;
    });
};

// 一对一
const isOneOnOne = function (a, b) {
    return !_.isArray(a) && !_.isArray(b);
};

// 一对多
const isOneToMany = function (a, b) {
    return !_.isArray(a) && _.isArray(b);
};

// 组合
const compose = function (a, b) {
    return function () {
        return a(b.apply(null, arguments));
    };
};

export default relationship;