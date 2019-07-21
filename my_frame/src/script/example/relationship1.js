import relationship from '../relationship/relationship1';
export const map = ['relationship'];
export const key = 'relationship1';
export default function () {
    /*
        relationship函数方法
        
        时间：2018.09
        
        关系表
        一和多：（数的关系）
            1，一对一
            2，一对多
            3，多对一
            4，多对多
        静和动，时间和空间，间断和连续
        问题：
            1. 我在设计关系表的时候遇到了这样一个问题，就是在多对一的时候我是运行了多里面的一个，就会触发关系的那个一，还是要全部的多都运行过，才会触发关系的那个一，比较纠结这个问题，2种情况，然后我会试着询问同事，有没有第三种，第四种，第n种情况
        回答：
            1. 梳理了一下，有2点，第一，关系没有动态的，那种连带触发的是对象行为本身，不是关系，关系只是静态说明，第二，上面说的怎么触发关系函数本身理解上就存在不同点，关系只是说明，a和b有关系，并不是a运行了，b一定要运行一样，只起到说明作用，然后就是关系表只表明他们之间有关系，至于是什么关系并不赋予，只有当调用某个特定的方法后，才会确立实在关系，比如我调用了连带方法，那么关系表的关系表明的就是连带关系，而我调用了策略方法的时候，关系表就代表的是条件头和条件体的关系了，至于在多对一的多条件的情况下怎么触发条件体那是这个方法所做的事情了（我是满足一个条件就触发，还是全部条件都要满足，还是满足第几个，还是。。。。。。），并不是关系表所考虑的范围内

        1. 把多变成一，对外面向用户我用了多，而对内在我能控制的情况下，我坚持一
        2. 变成一我不知道有什么优势，但我清楚要脱离用形的数据来说明说句之间的关系，而是往对象上打点的方式来说明，脱离形
        3. 我发现关系的根本并不局限于之前写的连带函数关系，更多的本质上是建立联系和说明，至于的函数是最终落实在这个上面而已

        // 其实我觉得本质上就都是一对一，只是一对一多了后，自然而然就产生了一对多，多对一，多对多，虽然本质的理论上是就是一对一，但这是要对用户用的，人们总是希望这东西越简单越强大越方便的使用，所以多肯定是要的，多是一提升的一种形式，就像洗衣机的各种模式一样，本质上没有什么模式，有的只是时间转速温度的不一样，而那么多组合人们是记不住的，所以把一套的参数提升到模式的形式后，便于人类的理解而已，方便

        目的：关系表的目的就是建立说明关系，把不相干的东西联系在一起，并不做实际操作，上面已经说的很清楚了

        
    */

    function a () {
        alert(arguments.callee.name);
    }
    function b () {
        alert(arguments.callee.name);
    }
    function c () {
        alert(arguments.callee.name);
    }
    function d () {
        alert(arguments.callee.name);
    }
    function e () {
        alert(arguments.callee.name);
    }
    function f () {
        alert(arguments.callee.name);
    }
    function g () {
        alert(arguments.callee.name);
    }
    function h () {
        alert(arguments.callee.name);
    }

    // 改进成这样的，不要用户记key的名字
    // 不过我觉得记维度还是回比记个可以难，因为维度要数，key这要看，当然key容易
    /*var relationshipTable = [
        [a, [b, c, d]], 
        [b, c], 
        [[e, f, g], d], 
        [[a, c, e], [b, d]]
    ];
    */

    var relationshipTable = [{
        // 一对多
        n : a,
        rn : [b, c, d]
    }, {
        // 一对一
        n : b,
        rn: c
    }, {
        // 多对一
        n : [e, f, g],
        rn: d
    }, {
        // 多对多
        n : [a, c, e],
        rn: [b, d]
    }];

    var res = relationship(relationshipTable, function () {
        return 12312312;
    });
    console.log(res, 'relationship');
};