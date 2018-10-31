/*
    联动：（属性，一和多，静和动，时间和空间，间断和连续）
    内容：
        加上了时间，在不同的时间上有可能对象不同的联动，只有初始化联动的时候是不够的，无法再其他时间里变化联动，所以添加了建立和解除的属性方法来解决在时间上的变化。
    衍生：
        力，方向，顺序
    说明：
        始终是面向函数，从函数出发来考虑
    属性（方法）：时间上的
        1建立联动
        2解除联动
    感想：
        顺序和联动从内容上来看几乎是差不多的，只是用处和关注点不一样，也就是形式不一样，我现在在专注形式帮助我形成体系，
    改进：
        1把联动变成软软嵌入的，而不是现在的硬嵌入，
        2建立联动的同时，建立一张直观的联动表，需要看的时候一目了然，（√）
        3增加间断和连续的概念
        4把空间概念引入，把联动的名称和联动体分开，联动名称单独写一个地方形成一个联动表（√）
        5引入时间的概念，增加建立和解除2个方法
        6我在想联动需要条件吗？
            a和b有关系，我调用了a，b也就联动这调用了，我觉得这就是联动的基础目的，但如果我说a和b是有联动关系，但并不能说明a动了，b一定要动，b只有满足a动完后的一些条件才能自己动，这里有把条件的概念引进来了，也就是原因，b动的原因是a动了 ，也可能是在a动了的基础上再加上满足某些条件的原因，b才动
                其实这个东西就像我写第一版联动的时候一对一怎么变成一对多，而不是真正写个多给用户用，就想把多写在那个一里面不就好了嘛，一既是多，多好，内部代码写起来就方便很多了，不用为了写个多，而增加多的入口，但对于用户来说可能是越方便越好，选择越多越好，既然我有一对多的关系，那么就在创建关系表的时候体现出来，而不是在写真正逻辑代码的时候写进去，也就是说前面一种一既是多的概念写法说明，a和b的联动关系就是个抽象的框架或是空壳，并不是实体，讲的具象点就是，人和动物的联动，而后面就是小明和那只埃及猫的联动了，我觉的这样讲就比较明白了，这个设计我是要上升的抽象的概念呢，还是面对实体，我们一般的人都是面向实体生活的，正常的思维就是这样的，那种抽象的思维是需要训练的，
                    好，回到我在这个要不要条件触发联动的上面，其实和上面讲的是一回事情，一个是我抽象了，如果有条件就写在联动体里面就好了，另一个就是我得加上这么一个操作给用户方便使用，甚至以后要加其他一些什么东西，我还是觉得这东西没有什么好坏对错之分，至少现在我倾向于面向实体，多是必须的，一占时是个美好的愿望但这个多并不是无意义的任意网上加，而是我的找到那么几个有规律的概念才行，找到了有规律的那么一些个概念的话，我的体系核心的内容也就基本确定了，可以说成功了一半
            那结论是什么？
            结论就是先完成基本联动，至于条件之后再引入，因为老实说还没想好条件这个概念应该放在什么位置
        7联动关系其实是交叉的，一张表的某一项的联动结束了，如果被联动的函数本身又是某一项的联动头，那么接着联动，知道运行完整个联动关系为止，当然，会变得无限调用停不下来，可以弄个开关是把，这里又可以插入间断性了
        8想着怎么解决7，想法想法又冒出了其他一些想法，比如，既然是多，那每一项的关系表会不止一对一嘛，一对一对一。。。等等，还有就是每一项的关系表不止扁平的，如果有空间的概念的话，每个就有维度，上下级关系，有点越来越多了，有点乱，但是不管是多少多，起点和终点最终应该是统一的
    思考：
        怎么算动了
        我的纠结的点在于，a动了，我告知b了，至于b动不动那就不管a的事情了，a已经把信息值传给b了，那如果只是告示信息给需要联动的一方，那叫什么联动嘛，我觉得就是另外的一个概念了，是把，所以还是要动起来，那么体现在哪里，就是函数被调用，函数是一等公民嘛！！！！
    说明：
        1. 以多为出发点的联动跟策略是不一样的，用户需要手动调了所有的多才会出触发对应的联动关系
        2. 一对多的传参就是每个多接受一的结果，多之间平级什么联系
        3. 传参的时候必须要穿数组，不然无法传递多个值
        4. 多级联动时，每个项自己联动完，判断做一件是否需要接着联动的事情就好了

*/




_.linkage = function (relationshipTable) {
    var relationship =  _.relationship(relationshipTable, function (currentValue, index, array) {
        var obj = {};
        obj[currentValue.n.name] = function () {
            var result = _.decorate(currentValue.n, currentValue.rn)();
            // 这里写多级联动的判断吗？？？
            if (Object.keys(this).indexOf(currentValue.rn.name) > -1) this[currentValue.rn.name]();
            return result;
        };

        return obj;
    }, function (currentValue, index, array) {
        var obj = {};
        function decorate () {
            // 一对多那些多函数返回的结果
            var manyReault = [];
            var result = currentValue.n.apply(null, arguments);
            currentValue.rn.forEach(function (item, indx, arr) {
                manyReault.push(item.apply(null, result));
            });
            return manyReault;
        }
        obj[currentValue.n.name] = decorate;
        return obj;
    }, function (currentValue, index, array) {
        var isActive = false;
        var obj = {};

        // return obj;
    }, function (currentValue, index, array) {

    });
    var arr = _.removeValue(relationship.callback, [undefined]);
    return arr.reduce(function (accumulator, currentValue, index, array) {
        var obj = {};
        _.forEach(accumulator, function (value, key, o) {
            obj[key] = value;
        });
        var key = Object.keys(currentValue);
        var value = currentValue[key[0]];
        obj[key] = value;
        return obj;
    });
}
