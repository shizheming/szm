var _ = {};
_.val = function(val) {
    return val
};
_.fnVal = function(val) {
    return function() {
        return val
    }
};
_.digit = function() {
    return Math.ceil(Math.random() * 10)
};
_.randomNumber = function(digit, digit2) {
    var that = this;
    var n = function() {
        return that.digit()
    };
    var nn = function() {
        return Math.ceil(Math.random() * Math.pow(10, digit))
    };
    var nnn = function() {
        return parseInt(digit + Math.random() * (digit2 - digit))
    };
    return arguments.length === 2 ? nnn() : digit ? nn() : n()
};
_.randomAlphabet = function(digit) {
    var arr = [];
    for (var i = 0; i < (digit ? digit : 1); i++) {
        arr.push(Math.ceil(Math.random() * 25))
    }
    return String.fromCharCode.apply(null, arr.map(function(currentValue, index, array) {
        return currentValue + 65
    }))
};
_.randomNumberAlphabet = function(digit) {
    digit = digit ? digit : 9;
    var s = Math.random().toString(16);
    var d = /(?:\.[a-zA-Z]+\d+)|(?:\.\d+[a-zA-Z]+)/.test(s);
    return s.length > digit && d ? s.substr(2, digit) : arguments.callee(digit)
};
_.randomColor = function() {
    return '#' + Math.floor(Math.random() * parseInt('0xffffff', 16).toString(10)).toString(16)
}, _.reversePredicate = function(predicate) {
    return function() {
        return !predicate.apply(null, arguments)
    }
};
_.isExistence = function(data, value) {
    var args = [].slice.call(arguments, 1);
    var val = [];
    var predicate = [];
    args.forEach(function(item, index, arr) {
        typeof item == 'function' ? predicate.push(item) : val.push(item)
    });
    var arrData = function() {
        val = val.length == 0 ? true : val.every(function(item, index, arr) {
            return data.indexOf(item) > -1
        });
        predicate = predicate.length == 0 ? true : predicate.every(function(item, index, arr) {
            return data.some(function(val, index, arr) {
                return item(val)
            })
        })
    };
    var objData = function() {
        val = val.length == 0 ? true : val.every(function(item, index, arr) {
            for (let key in data) if (data[key] === item) return true;
            return false
        });
        predicate = predicate.length == 0 ? true : predicate.every(function(item, index, arr) {
            for (let key in data) if (item(data[key])) return true;
            return false
        })
    };
    this.whichData(data, arrData, objData);
    return val && predicate
};
_.isInteger = function(num) {
    return typeof num == 'number' && num % 1 === 0
};
_.isNaN = function(n) {
    return n !== n
};
_.isExisty = function(x) {
    return x != null
};
_.isEqual = function(a, b, aStack, bStack) {
    var c1 = Object.prototype.toString.call(a);
    if (c1 !== Object.prototype.toString.call(b)) return false;
    switch (c1) {
    case '[object String]':
    case '[object RegExp]':
        return '' + a === '' + b;
    case '[object Number]':
    case '[object Date]':
    case '[object Boolean]':
        return +a === +b
    }
    aStack = aStack || [];
    bStack = bStack || [];
    aStack.push(a);
    bStack.push(b);
    var akeys = Object.keys(a);
    var key;
    var length = akeys.length;
    if (length !== Object.keys(b).length) return false;
    while (length--) {
        key = akeys[length];
        if (!equal(a[key], b[key], aStack, bStack)) return false
    }
    aStack.pop();
    bStack.pop();
    return true
};
_.past = function(date) {
    return (new Date(date)).getTime() < (new Date()).getTime() || false
};
_.future = function(date) {
    return !_.past(date)
};
_.repeat = function(createVal, predicate, arr) {
    arr = arr ? [] : arr;
    var res = createVal();
    if (predicate(arr, res)) {
        arr.push(res);
        return res
    } else arguments.callee(createVal, predicate, arr)
};
_.whichData = function(data, arr, obj) {
    if (_.isObject(data)) return obj(data);
    if (Array.isArray(data)) return arr(data)
};
_.debounce = function(fn, interval) {
    var num = 0;
    return function() {
        if (num) return;
        else {
            num++;
            var timer = setTimeout(function() {
                num = 0;
                clearTimeout(timer)
            }, interval || 1000)
        }
        fn.apply(null, arguments)
    }
};
_.once = function(fn) {
    var bl = true;
    return function() {
        var result;
        if (bl) result = fn.apply(null, arguments);
        bl = false;
        return result
    }
};
_.after = function(times, fn) {
    return function() {
        if (--times < 1) return fn.apply(this, arguments)
    }
};
_.before = function(times, fn) {
    return function() {
        if (--times > 0) return fn.apply(this, arguments)
    }
};
_.decorate = function() {
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
    var go = function(context, obj) {
        [].forEach.call(args, function(item, index, arr) {
            item.apply(context || null, obj ? obj[item.name] : []);
        })
    };
    go.add = add;
    return go;
};
_.state = function() {
    var data = [].map.call(arguments, function(item, index, arr) {
        return _.isFunction(item) ? item : _.fnVal(item)
    });
    var link = _.createLink();
    data.forEach(function(item, index, arr) {
        link.add(item)
    });
    var one = link.find(data[0]);
    var direction = true;
    var directionFn = function() {
        direction ? one = one.next : one = one.previous;
        if (one === link.head.next) direction = true;
        if (one === link.tail.previous) direction = false
    };
    var oneByOne = function(backflow, context) {
        context = _.isBoolean(backflow) ? context : backflow;
        one.el.call(context);
        backflow ? void
        function() {
            directionFn()
        }() : void
        function() {
            one = one.next
        }()
    };
    var addState = function(newState, item) {
        link.add(newState, item)
    };
    var editState = function(newState, oldState) {
        link.replace(newState, oldState);
        if (one.el === oldState) one = link.find(newState)
    };
    var delState = function(obj) {
        if (one.el === obj) directionFn();
        link.del(obj)
    };
    return {
        currState: oneByOne,
        addState: addState,
        editState: editState,
        delState: delState
    }
};
_.third = function() {};
_.strategy = function(road) {};
_.change = function() {
    return function() {}
};
_.depth = function() {};
_.findKey = function(obj, value) {
    for (var key in obj) if (obj[key] == value) return key
};
_.getObj = function() {
    var arr = [function oneVal(obj, one, depth, result) {
        var dimension = 1;
        for (var oldKey in obj) {
            if (typeof obj[oldKey] === 'object') {
                if (depth) {
                    if (oldKey == one) return obj;
                    result = oneVal(obj[oldKey], one, depth, result);
                    if (result) return result
                } else {
                    if (dimension === 1) {
                        if (one in obj[oldKey]) return obj[oldKey]
                    }
                }
            } else if (one in obj) return obj;
            else if (one == obj[oldKey]) return obj
        }
        dimension++
    }, function twoVal(obj, newKey, val, depth, result) {
        var dimension = dimension || 1;
        for (var oldKey in obj) {
            if (typeof obj[oldKey] === 'object') {
                if (depth) {
                    result = twoVal(obj[oldKey], newKey, val, depth, result);
                    if (result) return result
                } else {
                    if (dimension === 1) {
                        if (newKey in obj[oldKey] && val == obj[oldKey][newKey]) return obj[oldKey]
                    }
                }
            } else if (obj[newKey] == val) return obj
        }
        dimension++
    }];
    return !this.isBoolean(arguments[arguments.length - 1]) ? arr[arguments.length % 2].apply(null, arguments) : arr[arguments.length % 3].apply(null, arguments)
};
_.values = function(obj) {
    var keys = Object.keys(obj);
    var length = keys.length;
    var val = [];
    for (var i = 0; i < length; i++) val[i] = obj[keys[i]];
    return val
};
_.compact = function(obj) {
    var newObj = {};
    for (var key in obj) newObj[key] = obj[key];
    var keys = Object.keys(newObj);
    var result = keys.filter(function(item, index, arr) {
        return !newObj[item]
    });
    result.forEach(function(item, index, arr) {
        delete newObj[item]
    });
    return Array.isArray(obj) ? this.objectToArr(newObj) : newObj
};
_.invert = function(obj, arr) {
    var result = {};
    var keys = Object.keys(obj);

    function a(it) {
        var n;
        arr.forEach(function(item, index, arr) {
            if (item === it) {
                n = false
            } else {
                n = true
            }
        });
        return !n
    }
    arr ? a : a = function() {};
    keys.forEach(function(item, index, arr) {
        if (a(item)) {
            result[item] = obj[item];
            return
        }
        result[obj[item]] = item
    });
    return result
};
var processObject = function (fn) {
    fn = fn || function (oldObj, newObj) {
        return newObj;
    };
    return function (oldObj, iterator, data) {
        var newObj = data || {};
        newObj = fn(oldObj, newObj);
        Object.keys(oldObj).forEach(function (item, index, arr) {
            iterator(oldObj[item], item, newObj);
        });
        return newObj;
    };
};
var processCloneObject = processObject(function (oldObj, newObj) {
    for (var key in oldObj) newObj[key] = oldObj[key];
    return newObj;
});
var processNewObject = processObject();
_.para = function(obj, form) {
    for (var x in obj) {
        if (this.isObject(obj[x]) && obj[x] !== null) {
            this.para(obj[x], form)
        } else {
            if (x in form) {
                obj[x] = form[x][obj[x]]
            }
        }
    }
    return obj
};
_.paraKey = function (obj, form) {
    return processNewObject(obj, function (val, key, newObj) {
        for (let x in form) {
            if (key === form[x]) newObj[x] = val;
        }
    });
}
_.wrap = function (oldObj, addObj) {
    return processCloneObject(oldObj, function (val, key, newObj) {
        newObj[key] = _.extend({
            value : val,
        }, addObj[key]);
    });
}
_.wrapBack = function (oldObj) {
    return processCloneObject(oldObj, function (val, key, newObj) {
        newObj[key] = val.value;
    });
};
_.objectToArr = function(obj) {
    var result = [];
    for (var key in obj) result.push(obj[key]);
    return result
};
_.arrToObject = function(arr) {
    var result = {};
    arr.forEach(function(item, index, arr) {
        result[index] = item
    });
    return result
};
_.pairs = function(obj) {
    var keys = Object.keys(obj);
    var length = keys.length;
    var pai = [];
    for (var i = 0; i < length; i++) pai[i] = [keys[i], obj[keys[i]]];
    return pai
};
_.uniq = function(array) {
    var result = [];
    var repeat = [];
    for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (!this.isExistence(result, value)) result.push(value);
        else {
            i--;
            this.without(array, value);
            if (!this.isExistence(repeat, value)) repeat.push(value)
        }
    }
    return repeat
};
_.shuffle = function(obj) {
    var length = obj.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
        rand = n(0, index);
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = obj[index]
    }
    return shuffled
};
_.without = function(obj, del) {
    var arrData = function() {
        var idx;
        obj.every(function(item, index, arr) {
            if (item === del) {
                idx = index;
                obj.splice(index, 1);
                return false
            }
            return true
        });
        return idx
    };
    var objData = function() {
        delete obj[this.findKey(this.getObj(obj, del), del)];
        return obj
    }.bind(this);
    return this.whichData(obj, arrData, objData)
};
_.trim = function(obj) {
    for (var key in obj) {
        if (obj[key] == null || obj[key] == undefined) {
            obj[key] = ''
        } else if (typeof obj[key] == 'object') {
            this.trim(obj[key])
        } else {
            obj[key] = obj[key].toString().replace(/(^\s*)|(\s*$)/g, '')
        }
    }
    return obj
};
var aggregate = function(index, bl) {
    return function(obj) {
        var that = this;
        var thatArg = arguments;
        return _.whichData(obj, function() {
            var union = [].concat.apply(obj, [].slice.call(thatArg, 1));
            var result = [union, this.uniq(union)];
            result[2] = (function() {
                var complement = union.slice(0);
                result[1].forEach(function(item, index, arr) {
                    that.without(complement, item)
                });
                return complement
            })();
            return result[index]
        }.bind(this), function() {
            var result = [function() {
                var newObj = {};
                for (let key in obj) newObj[key] = obj[key];
                for (let i = 1, len = thatArg.length; i < len; i++) {
                    for (let key in thatArg[i]) {
                        if (that.isBoolean(bl) && bl) {
                            if (!newObj.hasOwnProperty(key)) newObj[key] = thatArg[i][key]
                        } else newObj[key] = thatArg[i][key]
                    }
                }
                return newObj
            }, function() {
                var newObj = {};
                for (let i = 1, len = thatArg.length; i < len; i++) {
                    for (let key in thatArg[i]) {
                        if (that.isExistence(obj, thatArg[i][key])) {
                            newObj[key] = thatArg[i][key]
                        }
                    }
                }
                return newObj
            }];
            result[2] = function() {
                var union = result[0]();
                var intersection = result[1]();
                for (let key in intersection) {
                    that.without(union, intersection[key])
                }
                return union
            };
            return result[index]()
        })
    }
};
_.union = aggregate(0);
_.intersection = aggregate(1);
_.complement = aggregate(2);
_.extend = aggregate(0, true);
_.clone = function(obj, iteratee) {
    if (!obj) return {};
    iteratee = !iteratee ?
        function() {
            return true
        } : iteratee;
    return _.whichData(obj, function() {
        return !iteratee ? obj.slice() : obj.filter(iteratee)
    }, function() {
        var newObj = {};
        Object.keys(obj).filter(iteratee).forEach(function(item, index, arr) {
            newObj[item] = obj[item]
        });
        return newObj
    }.bind(this))
};
_.flatten = function(input) {
    var result = [];
    for (var i = 0, length = input.length; i < length; i++) {
        var value = input[i];
        if (Array.isArray(value)) {
            value = _.flatten(value);
            for (var j = 0, len = value.length; j < len; j++) result.push(value[j])
        } else result.push(value)
    }
    return result
};
_.getDays = function(year, month) {
    return new Date(year, month, 0).getDate()
};
_.date = function(time) {
    var n = n ? new Date(time) : new Date();
    return [n.getFullYear(), fillZero(n.getMonth() + 1), fillZero(n.getDate()), fillZero(n.getHours()), fillZero(n.getMinutes()), fillZero(n.getSeconds())]
};
_.getTime = function(stamp) {
    var time = this.date(stamp);
    return time[0] + '-' + time[1] + '-' + time[2] + ' ' + time[3] + ':' + time[4] + ':' + time[5]
};
_.countDown = function(c, fn) {
    if (/-/g.test(c)) c = (new Date(c)).getTime();
    upDate(c, fn);
    var timer = setInterval(function() {
        if (!upDate(c, fn)) clearInterval(timer)
    }, 1000);

    function upDate(c, fn) {
        var d = new Date();
        var nowTime = d.getTime();
        var overTime = c;
        var mist = parseInt((overTime - nowTime) / 1000);
        var date = parseInt(mist / 86400);
        mist = mist % 86400
        var hours = parseInt(mist / 3600);
        mist = mist % 3600;
        var minutes = parseInt(mist / 60);
        mist = mist % 60;
        fn && fn(date, hours, minutes, mist);
        return date + hours + minutes + mist
    }
};
_.fillZero = function(nub) {
    return nub < 10 ? '0' + nub : nub
};
_.money = function(num) {
    num = num + '';
    return num.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^\,/, '')
};
var linkFn = (function() {
    var link = {};
    var isConnected = function(that) {
        return that.head.next === that.head.previous
    };
    link.add = function(newElement, item) {
        var newNode = {
            el: newElement,
            next: null,
            previous: null
        };
        var addLast = function() {
            if (isConnected(this)) {
                this.head.next = newNode;
                this.tail.previous = newNode;
                return
            }
            newNode.next = this.head.next;
            newNode.previous = this.tail.previous;
            this.head.next.previous = newNode;
            this.tail.previous.next = newNode;
            this.tail.previous = newNode
        }.bind(this);
        if (!item) {
            addLast()
        } else {
            var current = this.find(item);
            if (!current) return;
            if (current === this.tail.previous) addLast();
            else {
                newNode.next = current.next;
                newNode.previous = current;
                current.next.previous = newNode;
                current.next = newNode
            }
        }
    };
    link.del = function(item) {
        var currNode = this.find(item);
        if (!currNode) return;
        if (this.head.next === currNode) this.head.next = currNode.next;
        if (this.tail.previous === currNode) this.tail.previous = currNode.previous;
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        return currNode
    };
    link.replace = function(newElement, item) {
        this.add(newElement, item);
        this.del(item)
    };
    link.find = function(item) {
        if (item === 'head' || item === 'tail' || isConnected(this)) return;
        var currNode = this.head;
        while (currNode.el != item && currNode !== this.tail.previous) {
            currNode = currNode.next
        }
        return currNode.el !== item ? false : currNode
    };
    link.display = function() {
        var currNode = this.head;
        var arr = [];
        var bl = true;
        while (bl || currNode.next !== this.head.next) {
            arr.push(currNode.next.el);
            currNode = currNode.next;
            bl = false
        }
        return arr
    };
    return link
})();
_.createLink = function() {
    var newLink = {};
    newLink.head = {
        el: 'head',
        next: null,
        previous: null
    };
    newLink.tail = {
        el: 'tail',
        next: newLink.head,
        previous: newLink.head
    };
    newLink.head.next = newLink.tail;
    newLink.head.previous = newLink.tail;
    return _.extend(newLink, linkFn)
};
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Array', 'Object', 'Boolean'].forEach(function(element, index, array) {
    _['is' + element] = function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + element + ']'
    }
});
export default _;