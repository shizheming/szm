/*
    策略：（属性，一和多，静和动，时间和空间，间断和连续：体现在运动上，函数的调用运行上，我想到的是给函数打点，不单单体现在柯理化参数上）
        1.必须要有判断条件（√）
        2.引入空间，把条件头和条件体分开来（√）
        3.引入时间，添加条件头，删除条件头，添加条件体，删除条件体，同时也就有了属性方法（这个现在看起来好像需要，因为判断是一下子就完成了，不会触发第二次）（√）
        4.条件头和条件体也是一一对应的关系的，一对多也就是一对一的辩证，所以也就解决了一和多的关系(增加多，要满足多条件成立，才执行条件体)（√）
        5.间断性和连续性
            参数上体现的间断性就是柯理化条件参数和条件体参数
            那参数上的连续性就写在一次调用上
            1. 上面是参数的间断性和连续性
            2. 连续性其实运行函数后本身就是个连续性的过程，所以我要做的只是如何实现间断性，打点的方式会有很多，我找了个立足点，那就是从这要方法本身是干什么的切入，这个叫策略的方法是由条件头和执行体构成的，从目的论的观点来看，策略的目的就是要找那个对的适合的策略，从众多的选择中找出那个需要的，符合条件的，我们姑且说是成功的，因为失败的会有超级多，而成功的只有一个，所以我就在成功判断条件体后打个点，就在那，表示方法本身的一个间断性。
    比较：
        粗略一看，策略和状态在设计模式中颇为相似，他们最终的方法都是通过多态来实现的，这就是内容，上升到形式就是一个状态，一个策略，策略是对象达到目的的方案是外部的，而状态是对象内部的变化，就像之前写的关系，顺序，这些都是外部的，同样策略也是外部的，这些事构成体系关系之间的各种因素联系，而对象是各种联系存在的大前提，是基础，状态就是依附于对象来说的
    问题：
        1. 上面添加了多，就是当全部条件都满足的时候才执行，遗留的问题是这个在当在多的时候想用一，也就是只要符合其中的任何一个提交就执行，这个我需要怎么设计
*/

_.strategy = function (relationshipTable, interrupted) {
    return function () {
        var args = arguments;
        var result = [];
        _.relationship(relationshipTable, function (currentValue) {
            currentValue.n.apply(null, args) && (result = currentValue.rn);
        }, function (currentValue) {
            currentValue.n.apply(null, args) && (result = currentValue.rn);
        }, function (currentValue) {
            currentValue.n.every(function (item, idx, arr) {
                return item.apply(null, args);
            }) && (result = currentValue.rn);
        }, function (currentValue) {
            currentValue.n.every(function (item, idx, arr) {
                return item.apply(null, args);
            }) && (result = currentValue.rn);
        });
        var resultFn = _.isFunction(result) ? result : _.isArray(result) ? function (value) {
            result.forEach(function (currentValue, index, array) {
                currentValue(value);
            });
        } : _.identity;
        if (_.isFunction(interrupted)) {
            return function () {
                var args = [].slice.call(arguments);
                args.push(result);
                interrupted.apply(null, args);
                return resultFn
            };
        } else {
            return resultFn;
        }
    };
};