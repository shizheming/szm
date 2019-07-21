/*
    组合
*/
// 最少的2个函数的组合
var c = function (a, b) {
    return function () {
        return a(b.apply(null, arguments));
    };
};
// 多个函数组合
export default function (...args) {
    return function (...a) {
        var once = true;
        return args.reduceRight(function (res, cb) {
            var result;
            if (once) {
                once = false;
                result = cb.apply(null, res);
            } else {
                result = cb(res);
            }
            return result;
        }, a);
    }
};




// 例子
// 2个参数的组合函数，最终的思想是柯里化成1个参数的函数，当然如果组合的函数接收相同的多个参数的话就没必要柯里化了
var data = [
    {
        id: 1,
        title: 234234,
        rating: 4.7,
        reviews: [
            {
                good: 4,
                excellent: 12
            }
        ]
    },
    {
        id: 18,
        title: 234454234,
        rating: 4.1,
        reviews: []
    }
];

var filterAAA = function (current) {
    return current.rating < 4.5;
};

var projectAuthor = function (current) {
    return {
        title: current.title
    };
};
var filter = function (fn, arr) {
    return arr.filter(fn);
};
var map = function (fn, arr) {
    return arr.map(fn);
};
/*var ab = curry(filter)(filterAAA);
var bv = curry(map)(projectAuthor);
var cc = compose(bv, ab);
var ff = cc(data);*/
// console.log(ff,1717);