// 这个是从左往右的组合，compose是从右往左的组合
export default const pipe = function (...args) {
    return function (...a) {
        return args.reduce(function (res, cb) {
            return cb(res);
        }, a);
    }
};