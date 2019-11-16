/* eslint-disable no-console */
/*
    运动
    ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥函数与函数两者之间的间断性和连续性（运动）函数本身调用的运动没有意义♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
    概念：
    包含间断性和连续性
    能动能停
    动动停停
    停停动动

    间断性作用于什么对象？
    作用于函数对象，在每个函数运行后停顿

    间断性和连续性是一体的，就是运动本身
    也就是说这个东西本身技能动又能停


    待解决：
        passValue公用存返回值，不独立，不对象
*/
import _ from 'lodash';
// 我觉得应该弄一个独立的把手来控制动动停停，一开始我是想在返回的函数里面传参的，后来觉得和其他的参数混在一起不利于区分，不能很好的区分这是把手参数还是真正的参数
var passValue;
var fnName;
function f () {
    var args = [].slice.apply(arguments);
    var o = args.shift();
    return function () {
        var a = [].slice.apply(arguments);
        a = passValue === undefined ? a : a.concat(passValue);
        // 1.先弄里面的传递值
        // 2.在考虑外面当间断性用的时候传进来的值，连续性的时候是没有外面值传进来的，因为插不进来
        passValue = o.apply(null, a);
        fnName = o.name;
        if (!args.length) return passValue;
        return f.apply(null, args);
    };
}
// 在包一个
// 默认是连续的
function motion () {
    // 创建对象存数据
    // passValue是公用的，所以每次调用这个函数都要还原下，免的数据串了
    passValue = undefined;
    fnName = undefined;
    var last = arguments[arguments.length - 1];
    if (!_.isBoolean(last)) {
        // 这里要多一步来接受连续性运行第一个函数应该接受的值
        
        let r = f.apply(null, arguments);
        return function (...firstValue) {
            return running(_.isFunction, r, firstValue); 
        };
    } else {
        let a = [].slice.apply(arguments);
        // 把最后一个true干掉
        a.pop();
        return f.apply(null, a);
    }
}
// 写一个当条件成立前无限运行的方法
function running (predicate, fn, firstValue/*连续性运行的时候第一个函数接收的传值进来*/) {
    if (predicate(fn)) {
        if (_.isArray(firstValue) && firstValue.length) {
            fn = fn.apply(null, firstValue);
        } else {
            fn = fn();
        }
        return running(predicate, fn);
    } else {
        // console.log(passValue, '解放了');
        // 我要返回什么呢
        // 1.全部运行完后返回的最终值----这个体现在连续性的上面
        // 2.运行到一半需要返回函数----这个体现在间断性上，但是运行完最后一个的时候还是要返回最终值
        // 这里也是歪打正着一个fn就搞定了，既能返回函数又能返回最终值
        return fn;
    }
}

motion.handle = function (fn, name) {
    // 要处理的函数，和要到达的目的地的函数
    return running(function () {
        console.log(fnName, 123);
        return fnName !== name;
    }, fn);
};
export default motion;