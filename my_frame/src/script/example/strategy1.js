import strategy from '../strategy/strategy1';
export const map = ['strategy'];
export const key = 'strategy1';
export default function () {
    /*
        时间：2018.09
        
        策略：（属性，一和多，静和动，时间和空间，间断和连续）
            1必须要有判断条件
            2引入空间，把条件头和条件体分开来
            3引入时间，添加条件头，删除条件头，添加条件体，删除条件体，同时也就有了属性方法
            4条件头和条件体也是一一对应的关系的，一对多也就是一对一的辩证，所以也就解决了一和多的关系
        比较：
            粗略一看，策略和状态在设计模式中颇为相似，他们最终的方法都是通过多态来实现的，这就是内容，上升到形式就是一个状态，一个策略，策略是对象达到目的的方案是外部的，而状态是对象内部的变化，就像之前写的关系，顺序，这些都是外部的，同样策略也是外部的，这些事构成体系关系之间的各种因素联系，而对象是各种联系存在的大前提，是基础，状态就是依附于对象来说的

        我体会到手动return function来柯理化，和bind自动柯理化的不同之处在于，虽然bind柯理化更高级，更自动，更方便，但是我现在是在写个功能给用户用，我不可能让用户用的时候让他来用bind来使用这个功能，所以要手动
    */

    var aaa = [{
        condition: function (a, b) {
            return a > b;
        },
        strategy: function () {
            alert('a > b');
        }
    }, {
        condition: function (a, b) {
            return b > a;
        },
        strategy: function () {
            alert('b > a');
        }
    }, {
        condition: function (a, b) {
            return a === b;
        },
        strategy: function (a) {
            alert(a);
        }
    }];

    var sss = strategy(aaa)(1, 1)(1000);
}