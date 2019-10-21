/*
    间断性
    概念：

    间断性作用于什么对象？
    作用于函数对象，在每个函数运行后停顿

    间断性和连续性是一体的，就是运动本身
    也就是说这个东西本身技能动又能停
*/
import _ from 'lodash';
/* function f (obj) {
    var inner = _.isFunction(obj) ? arguments : obj.inner;
    var out = _.isFunction(obj) ? undefined : obj.out;

    var a = [].slice.apply(inner);
    var o = a.shift();

    return function () {
        var r = o.apply(null, [].slice.apply(arguments).concat(out === undefined ? [] : out));

        if (!a.length) return;
        return f({
            inner: a,
            out: r
        });
    };
} */
function f () {
    var args = [].slice.apply(arguments);
    console.log(args, 88);
    var o = args.shift();
    return function () {
        console.log(o, 66);
        var r = o.apply(arguments);
        if (!args.length) return;
        return f.apply(null, args);
    };
}
export default f;