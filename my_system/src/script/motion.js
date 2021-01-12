/* eslint-disable no-console */
/*
    运动
    ❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤函数与函数两者之间的间断性和连续性（运动）函数本身调用的运动没有意义❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤❤
    概念：
    连着动
    占时不考虑间断性
    参数是一个接着一个传递下去的，联动嘛
*/
function motion (first, ...fn) {
    const arrFn = oneState(c => c, c => [c]);

    return function (...args) {
        return fn.reduce((a, b) => {
            const r = arrFn.Irreversibility(a.back);

            console.log(r, 'back');
            return {
                name: a.f.name,
                back: a.f.apply(this, r),
                f: b
            };
        }, {
            name: undefined,
            back: args,
            f: first
        });
    };
}
const oneState = function (a, b) {
    const obj = {};

    obj.Irreversibility = function (c) {
        obj.Irreversibility = function (nc) {
            return b(nc);
        };
        return a(c);
    };

    return obj;
};

export default motion;