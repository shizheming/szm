/*
    记忆存储
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤          ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤

    记忆数据，我们的一切生活不都是数据吗
    对，从哲学的角度，数据是数据，方法也是数据，那么就是记录2种么，存数据，记方法步骤
    记忆存在活不存在
    记忆操作步骤（记忆动作）
    记忆数据（记忆结果）
    js中的数据就是array，josn
    动作就是function
    动作就是过程
    数据就是结果
    有些动作重复的在做，但没有出结果，过程已经做了n遍了
    记录打点的话要开始和结束，不然就是无限记录
    如果是一连串动作的话，那就要在所有的步骤上打点，用链表来表示上一步下一步

    // relationship
    // 现在就弄一条，
    // [b,n,m,h,e]
    刚想了下，不从上面的点下手，上面是先有这么条路，然后看看用户或是程序走没走这条路，现在是这样想，先去掉目的性，就是一个对象切入，一个对象上有好多方法，每次的调用都是一步，都要记录，
    就像vue先走mounted，然后用户各种上点击事件函数调用，我去记录他，从对象去切入这个记录点
*/

import {forEach} from 'lodash';

function memoized (obj/* 把整个要记录的对象都传进来 */) {
    var newObj = {};

    forEach(obj, (value, key) => {
        newObj[key] = (function (key) {
            return function () {
                newObj[key].info.count++;
                memoized.storage.push(newObj[key].info);
                return value.apply(this, arguments);
            };
        })(key);
        newObj[key].info = {
            // 调用方法明
            name: key,
            // 动用的次数
            count: 0
        };
    });
    return newObj;
}
memoized.storage = [];
export default memoized;