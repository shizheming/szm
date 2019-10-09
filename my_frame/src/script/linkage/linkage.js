
import relationship from '@script/relationship/relationship1';
import _ from '@script/_/_';
export default function (relationshipTable) {
    var cloneObj = _.clone(relationshipTable);

    var r = relationship(cloneObj, function (currentValue, index, array) {
        var obj = {};

        obj[currentValue.n.name] = _.decorate(currentValue.n, currentValue.rn);
        return obj;
    }, function (currentValue, index, array) {
        var obj = {};

        function decorate () {
            // 一对多那些多函数返回的结果
            var manyReault = [];
            var result = currentValue.n.apply(null, arguments);

            currentValue.rn.forEach(function (item, indx, arr) {
                manyReault.push(item.apply(null, result));
            });
            return manyReault;
        }
        obj[currentValue.n.name] = decorate;
        return obj;
    }, function (currentValue, index, array) {
        var isActive = false;
        var obj = {};

        // return obj;
    }, function (currentValue, index, array) {

    });

    console.log(r.callback);
    var arr = _.removeValue(r.callback, [undefined]);

    return arr.reduce(function (accumulator, currentValue, index, array) {
        var obj = {};

        _.forEach(accumulator, function (value, key, o) {
            obj[key] = value;
        });
        var key = Object.keys(currentValue);
        var value = currentValue[key[0]];

        obj[key] = value;
        return obj;
    });
}