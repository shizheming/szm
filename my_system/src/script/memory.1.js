/*
    记忆存储
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤          ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤

    这个方法只是从函数调用出发，记录次数和步骤，但其实次数和步骤也是数据，最后都是数据
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