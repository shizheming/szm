/*
    装饰行为
*/
_.decorate = function () {
    var order;
    var idx;
    if (_.isBoolean(arguments[arguments.length - 1])) {
        order = arguments[arguments.length - 1];
        idx = arguments.length - 1;
    } else {
        order = true;
        idx = arguments.length;
    }
    var arrFn = order ? 'push' : 'unshift'
    var args = [].slice.call(arguments, 0, idx);
    var add = function (fn) {
        args[arrFn](fn);
    };
    var go = function(obj, context) {
        [].forEach.call(args, function(item, index, arr) {
            item.apply(context || null, obj ? obj[item.name] : []);
        })
    };
    go.add = add;
    return go;
};