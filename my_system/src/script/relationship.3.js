import _ from 'lodash';
const relationship = function (relationship) {
    var a = relationship.map(currentValue => {
        var {m, y} = currentValue;

        if (isOneOnOne(m, y)) {
            return [
                {
                    m,
                    y
                }
            ];
        }
        if (isOneToMany(m, y)) {
            return y.map(item => {
                return {
                    m,
                    y: item
                };
            });
        }
    });

    console.log(a, 123);
    return compose(_.flatten, filterFalse)(a);
};

const filterFalse = function (a) {
    return a.filter(function () {
        return a !== '' && a !== false && a !== undefined;
    });
};

// 一对一
const isOneOnOne = function (a, b) {
    return !_.isArray(a) && !_.isArray(b);
};

// 一对多
const isOneToMany = function (a, b) {
    return !_.isArray(a) && _.isArray(b);
};

// 组合
const compose = function (a, b) {
    return function () {
        return a(b.apply(null, arguments));
    };
};

export default relationship;