/*
    压缩
*/
export default const zip = function (leftArr, rightArr, fn) {
    var index, result = [];
    for (index = 0; index < Math.min(leftArr.length, rightArr.length); index++) {
        result.push(fn(leftArr[index], fn(rightArr[index])));
    }
    return result;
};
