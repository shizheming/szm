import _ from 'lodash';
export default function f (obj) {
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
}