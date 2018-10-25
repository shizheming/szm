/*
    联动：（属性，一和多，静和动，时间和空间，间断和连续）
    内容：
        加上了时间，在不同的时间上有可能对象不同的联动，只有初始化联动的时候是不够的，无法再其他时间里变化联动，所以添加了建立和解除的属性方法来解决在时间上的变化。
    衍生：
        力，方向，顺序
    说明：
        始终是面向函数，从函数出发来考虑
    属性（方法）：
        1建立联动
        2解除联动
    感想：
        顺序和联动从内容上来看几乎是差不多的，只是用处和关注点不一样，也就是形式不一样，我现在在专注形式帮助我形成体系，
    改进：
        1把联动变成软软嵌入的，而不是现在的硬嵌入，
        2建立联动的同时，建立一张直观的联动表，需要看的时候一目了然，（√）
        3增加间断和连续的概念
        4把空间概念引入，把联动的名称和联动体分开，联动名称单独写一个地方形成一个联动表（√）
    思考：
        我在想联动需要条件吗？如果我是目的论，那他发生的原因是什么，如果不是目的论，那怎么算动了
*/




_.linkage = function (relationshipTable) {
    return _.relationship(relationshipTable, function (currentValue, index, array) {

    }, function (currentValue, index, array) {

    }, function (currentValue, index, array) {

    }, function (currentValue, index, array) {

    });
    
}