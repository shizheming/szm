import relationship from '../relationship/relationship2';
export const map = ['relationship'];
export const key = 'relationship2';
export default function () {
    /*
        时间：2018.11
        
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

    function a () {
        alert('a');
    }
    function b () {
        alert('b');
    }
    function c () {
        alert('c');
    }
    function d () {
        alert('d');
    }
    function e () {
        alert('e');
    }
    function f () {
        alert('f');
    }
    function g () {
        alert('g');
    }
    function h () {
        alert('h');
    }
    function i () {
        alert('i');
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
        n: b,
        rn: c
    }, {
        n: c,
        rn: [d, a, g]
    }, {
        n: h,
        rn: g
    }, {
        n: a,
        rn: b
    }, {
        n: [c, g],
        rn: f
    }, {
        n: f,
        rn: i
    }];

    // 我先想到的是把它们全部通过一对一的方式罗列出所有的可能，有个坑就是当2个关系相互引用的时候，我在动态的输出每一条到底的关系线是就会就如死循环，a引用b，b引用a，a在引用b，b在引用a。。。。。。这样无线循环，这个要解决下，什么时候停下来，我想了下，当他的关系接受来源和他的关系目的点是一样的时候就停止

    var gggggg = relationship(relationshipTable);

    console.log(gggggg, 89);
    /*
        形式
        可以有很多形式，各种样子的，但最终只有一种样子形成，我是想把所有的形式揉捏在一起吗，弄个最完美的吗，既然有形，肯定是不完美的，只有无形才是最完美的，因为可以变成任何形状，
        1. 就是上面这种，只有一和多
        2. 加上维度
            var relationshipTable = [{
                n : a1,
                rn : {
                    n : a2,
                    rn : {
                        n : {
                            n : a6,
                            rn : a7
                        },
                        rn : [a4, a5]
                    }
                }
            }];
        3. 这种就是无形的，没有表，直接依附对象
            a1.rn = a2;
            a3.rn = a4;
            a5.rn = [a1,a2,a3];

        凭空想象那个最初的东西相当的难，不符合人的思考方式，那我就从人的角度来思考，从我开始好不好，没有我哪来世界，完全从主观出发，因为客观太难了，我之所以能思考，能想，是因为有感官，听觉，视觉，嗅觉，触觉，味觉，如果5官全失，我还能感觉到我存在嘛，我还能感觉到我思考嘛，我觉的不能，思考就是对外界的一切反应，那有了我，有了五感，然后就是客观的时间和空间，具备了这4大条件因素，结论就是我思故我在了，接着在对代码世界的认识中五感就只剩下视觉，视觉给的信息就是样子，形状，外观，那么什么东西有形，必须是实体，概念无形，是存在于大脑中，所以不是实体，但我们有时候是需要概念实体化的，单单留在脑中无法解决问题，比如，民警在办案时会在黑板上划出一个嫌疑人的关系图，那么关系这种无形的概念就立即被实体化了，这就是概念实体化，回到代码，前不久纠结于是把关系挂在实体上，还是写个关系表，现在来看2者没有对错，关系表就是一种概念实体化，既然是实体，必有广延，就是三维，之前是2位，现在要加上深度，也就是嵌套，之前维度的问题也就解决了，是的，需要的，因为他是实体，加上本身有数的概念，一个静止的实体就诞生了，有了静止相对的运动也就呼之欲出了，怎么体现，加方法，增加关系，删除关系，替换关系，查看关系，这些都能叫修改，但我不能只有这个方法，在现实中一般会有多个目的性的方法，这只能在哲学上达到一与多的统一，好，运动有了随之而来的就是间断性和连续性，很顺的就过来了，恩，之前的问题都理通了，从我回到了客观的那4个出发点，nice，嘻嘻。

        虽然之前实体的维度概念确认加进去了，但是在实际把深度添加进去以后发现，并不能正确的体现关系的形，因为他是层层嵌套的，有包裹的层级概念，但关系之间连续性是平级的，没有里外的形式，只有平面方向的位置关系，所以json的对象维度包裹并不适合。我得寻找另一种形式，宗旨是人们对于扁平化的图更好理解，因为简单不复杂，所以现在就是不能通过json数据格式本身的嵌套形式来表现维度的概念，我需要寻找另一种形式来体现，或者是，和原来一样，没有深度，虽然从概念上来说并不完美，但概念并不强制，最后还是回到原来，从人的理解上来，扁平化最容易接受，因为简单，好，先这样

    */ 
};