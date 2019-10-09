import relationship from '@script/relationship/relationship1';
import _ from 'lodash';
export default function (relationshipTable, interrupted) {
    // 这一步暂缓了条件头的处理，我们在运行下面的函数之前能随意的修改条件头
    return function () {
        var args = arguments;
        // 最后要运行的函数集合
        var result = [];
        // 间断性要传出去的值
        var relation;
        // 全部运行完要返回给用户的东西
        var returnResult = [];

        relationship(relationshipTable, function (currentValue, index, array) {
            if (currentValue.n.apply(null, args)) {
                // 这步是利用引用来达到动态添加和删除关系表中的数据的目的
                array[index].rn = [currentValue.rn];
                result = array[index];
                relation = currentValue;
            }
        }, function (currentValue, index, array) {
            if (currentValue.n.apply(null, args)) {
                result = currentValue.rn;
                relation = currentValue;
            }
        }, function (currentValue, index, array) {
            if (currentValue.n.every(function (item, idx, arr) {
                return item.apply(null, args);
            })) {
                array[index].rn = [currentValue.rn];
                result = array[index];
                relation = currentValue;
            }
        }, function (currentValue, index, array) {
            if (currentValue.n.every(function (item, idx, arr) {
                return item.apply(null, args);
            })) {
                result = currentValue.rn;
                relation = currentValue;
            }
        });
        var resultFn = _.isFunction(result) ? result : _.isArray(result) ? function () {
            var args = arguments;

            result.forEach(function (currentValue, index, array) {
                returnResult.push(currentValue.apply(null, args));
            });
            return returnResult;
        } : _.identity;
        // 打点，间断性

        if (_.isFunction(interrupted)) {
            return function () {
                var args = [].slice.call(arguments);

                args.push(relation);
                interrupted = interrupted.apply(null, args);
                return function () {
                    return resultFn.apply(null, [].slice.call(arguments).concat(interrupted));
                };
            };
        } else {
            return resultFn;
        }
    };
};