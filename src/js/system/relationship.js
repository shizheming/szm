/*

关系表数据操作

问题：1. 我在设计关系表的时候遇到了这样一个问题，就是在多对一的时候我是运行了多里面的一个，就会触发关系的那个一，还是要全部的多都运行过，才会触发关系的那个一，比较纠结这个问题，2种情况，然后我会试着询问同事，有没有第三种，第四种，第n种情况
回答：1. 梳理了一下，有2点，第一，关系没有动态的，那种连带触发的是对象行为本身，不是关系，关系只是静态说明，第二，上面说的怎么触发关系函数本身理解上就存在不同点，关系只是说明，a和b有关系，并不是a运行了，b一定要运行一样，只起到说明作用，然后就是关系表只表明他们之间有关系，至于是什么关系并不赋予，只有当调用某个特定的方法后，才会确立实在关系，比如我调用了连带方法，那么关系表的关系表明的就是连带关系，而我调用了策略方法的时候，关系表就代表的是条件头和条件体的关系了，至于在多对一的多条件的情况下怎么触发条件体那是这个方法所做的事情了（我是满足一个条件就触发，还是全部条件都要满足，还是满足第几个，还是。。。。。。），并不是关系表所考虑的范围内

1. 把多变成一，对外面向用户我用了多，而对内在我能控制的情况下，我坚持一
2. 变成一我不知道有什么优势，但我清楚要脱离用形的数据来说明说句之间的关系，而是往对象上打点的方式来说明，脱离形
3. 我发现关系的根本并不局限于之前写的连带函数关系，更多的本质上是建立联系和说明，至于的函数是最终落实在这个上面而已
*/
_.relationship = function (relationshipTable, a, b, c, d) {
    var oneOnOneRelationshipTable = [];

    relationshipTable.forEach(function (currentValue, index, array) {
        // 一对一
        if (!_.isArray(currentValue.n) && !_.isArray(currentValue.rn)) {
            oneOnOneRelationshipTable.push(currentValue);
            a && a(currentValue, index, array);
        }
        // 一对多
        if (!_.isArray(currentValue.n) && _.isArray(currentValue.rn)) {
            currentValue.rn.forEach(function (item, idx, arr) {
                var newObj = {};
                newObj.n = currentValue.n;
                newObj.rn = item;
                oneOnOneRelationshipTable.push(newObj);
            });
            b && b(currentValue, index, array);
        }
        // 多对一
        if (_.isArray(currentValue.n) && !_.isArray(currentValue.rn)) {
            currentValue.n.forEach(function (item, idx, arr) {
                var newObj = {};
                newObj.n = item;
                newObj.rn = currentValue.rn;
                oneOnOneRelationshipTable.push(newObj);
            });
            c && c(currentValue, index, array);
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
            d && d(currentValue, index, array);
        }
    });
    return oneOnOneRelationshipTable;
};