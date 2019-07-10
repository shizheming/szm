/*
    时间：2019.07
*/
/*
关系表数据操作
属性和方法：（运动）
    1，添加关系
    2，删除关系
    3，替换关系
    4，查看关系
关系表
一和多：（数的关系）
    1，一对一
    2，一对多
    3，多对一(这个不需要，因为有顺序的概念，这里剔除，就留下最简单的关系概念)
    4，多对多
目的：关系表的目的就是建立说明关系，把不相干的东西联系在一起，并不做实际操作（比如联动），

这里多运用些函数式的概念技巧去处理
组合，柯里化，部分应用，单一功能原则，纯函数
提取形式

我觉得虽然多有很多，无限的，像维度，嵌套，但想要把这些功能都实现，太复杂，不利于理解，有些东西概念上需要比如间断性，联动性，但我不能为了在功能里面实现联动性和间断性的概念儿去赢靠，这个主次颠倒了，就像柏拉图把理念放第一位了，
所以我觉得现在对我来说太复杂，太难的，占时不做，主要是保证核心简单干练


*/

_.relationship = function (relationship) {
    var a = relationship.map(currentValue => {
        var {m, y} = currentValue;
        if (isOneOnOne(m, y)) return [
            {
                m: m,
                y: y
            }
        ];
        if (isOneToMany(m, y)) return y.map(item => {
            return {
                m: m,
                y: item
            };
        });
    });
    return compose(_.value, _.filterFalse)(a);
}

// 一对一
const isOneOnOne = function (a, b) {
    return !_.isArray(a) && !_.isArray(b);
}

// 一对多
const isOneToMany = function (a, b) {
    return !_.isArray(a) && _.isArray(b);
}

// 组合
const compose = function (a, b) {
    return function () {
        return a(b.apply(null, arguments));
    };
};

