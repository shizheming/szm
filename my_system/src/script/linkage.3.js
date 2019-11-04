export default function (arr) {
    var d = {
        // 监听事件库
        client: []
    };
    // 老数据
    var od = {};
    // 数据层初始化

    for (var i = 0, len = arr.length; i < len; i++) {
        d[arr[i]] = '';
        od[arr[i]] = '';
    }
    var method = {
        set: function (json) {
            var num = 0;
            var newarr = [];

            for (var key in json) {
                // 1. 过滤有没有
                // if (d[key] === void 0) continue;
                if (!(key in d)) continue;
                // 2. 还得过滤和之前的发生了变化没有
                d[key] = json[key];
                // 是数组
                if (Array.isArray(od[key])) {
                    // 要验证与原来的包含不包含
                    // 要设置的不是数组
                    if (!Array.isArray(d[key])) {
                        if (od[key].indexOf(d[key]) > 0) continue; else od[key].push(d[key]);   
                    } else {
                    // 要设置的是数组,连接加去重
                        // od[key] = _.only(od[key].concat(d[key]));
                    }
                    // 更新当前的
                    d[key] = od[key];
                } else {
                // 不是数组
                    // if (d[key] === od[key]) continue; else od[key] = d[key];
                    // 占时都动吧，不管有没有改变值
                    od[key] = d[key];
                }
                newarr.push(key);
                num++;
            }
            // 有变化的时候再去执行对应的函数
            if (!num) return;
            for (var i = 0, len = d.client.length; i < len; i++) {
                for (var j = 0, len2 = newarr.length; j < len2; j++) {
                    // key
                    for (var key in d.client[i]) {
                        if (key == newarr[j]) {
                            // d.client[i][newarr[j]](d[key], [].slice.call(arguments, 1));
                            d.client[i][newarr[j]].apply(null, [d[key]].concat([].slice.call(arguments, 1)));
                        }
                    }
                }
            }
        },
        get: function (key) {
            return d[key];
        },
        listen: function (key, fn) {
            var j = {};

            j[key] = fn;
            d.client.push(j);
        }
    };

    return method;
}