export default () => {
    /*
        function (currentValue, key, collection) {
            currentValue => 当前值
            key => 当前键
            collection => 正在迭代的集合
        }
    */

    _.forEach([1, 2], function (currentValue, index, array) {
        array[index] = currentValue + 1;
    });
    // => [2, 3]

    _.forEach({
        c : 1,
        d : 2
    }, function (currentValue, key, object) {
        object[key] = currentValue + 1;
    });
    
    /*
        => {
            c : 2,
            d : 3
        }
    */
}