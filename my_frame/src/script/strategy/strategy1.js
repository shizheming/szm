export default function (obj) {
    return function () {
        var args = arguments;
        var idx;

        obj.some(function (currentValue, index, array) {
            var result = currentValue.condition.apply(null, args);

            result && (idx = index);
            return result;
        });
        return function () {
            if (idx !== undefined) return obj[idx].strategy.apply(null, arguments);
        };
    };
};