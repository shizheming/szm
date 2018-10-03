/*
    我暂时觉得关系可以包含顺序，顺序是从关系中衍生出来的，所以暂时先把这个写的顺序放一放
*/

/*
    顺序
*/

// 始终是面向函数，从函数出发来考虑
// 顺序是2者之间的序列关系，并非单个

/*
    链表--循环双向链表
    这张图大致是这样的所有链表真正用的元素之外有一个head一个tail，head的previous是tail，tail的next是head，而head的next是第一，tail的previous是最后一个，所有对象之间也是双向的，循环的关键在于第一和最后一个是双向的，这样头尾实体就循环连起来了。
    1. 空白链表
    head←----→tail
      ↑--------↑
    2. 一个对象的链表
    head----→object←----tail
      ↑------------------↑
    3. 多个对象链表
    head----→object←----→object←----tail
      ↑        ↑------------↑        ↑
       ------------------------------
*/

var linkOperation = (function () {
    var link = {};
    // 判断是否头尾相连，也就是链表里面有没有元素
    var isEmptyLink = function (element) {
        return element.head.next === element.head.previous;
    };
    var isLast = function (element) {
        return element === this.tail.previous
    }.bind(this);
    // 添加
    link.add = function (newElement, oldElement) {
        var lastLength = this.display().length;
        // 缺点在于一次只能插一个值
        var newNode = {
            element : newElement,
            next : null,
            previous : null
        };
        // 插入尾部
        var addLast = function () {
            // 这里是链表里面没有元素的情况下
            if (isEmptyLink(this)) {
                // 更新头尾
                this.head.next = newNode;
                this.tail.previous = newNode;
            } else {
                // 这里是链表里面有元素的情况下
                // 新元素下一个连第一个
                newNode.next = this.head.next;
                // 新元素上一个连最后一个
                newNode.previous = this.tail.previous;
                // 更新第一个的上一个的指向
                this.head.next.previous = newNode;
                // 更新最后一个的下一个的指向
                this.tail.previous.next = newNode;
                // 更新尾巴的上一个的指向
                this.tail.previous = newNode;
            }
        }.bind(this);
        // 1个参数直接添加到尾部
        if (!oldElement) {
            addLast();
        // 2个参数是找到第2个参数后面插入
        } else {
            var currentValue = this.find(oldElement);
            if (!currentValue) return false;
            // 判断是不是最后一个
            if (currentValue === this.tail.previous) addLast(); else {
                newNode.next = currentValue.next;
                newNode.previous = currentValue;
                currentValue.next.previous = newNode;
                currentValue.next = newNode;
            }
        }
        return lastLength !== this.display().length;
    };
    // 删除
    link.delete = function (element) {
        var currentValue = this.find(element);
        // 没找到
        if (!currentValue) return;
        // 有2种可能需要判断，一种是删头，一种是删尾，就需要调整虚体头尾的next和previous的指向了
        if (this.head.next === currentValue) this.head.next = currentValue.next;
        if (this.tail.previous === currentValue) this.tail.previous = currentValue.previous;
        currentValue.previous.next = currentValue.next;
        currentValue.next.previous = currentValue.previous;
        // 返回被删除的对象
        return currentValue;
    };
    // 替换
    link.replace = function (newElement, oldElement) {
        // 删除和添加就是替换
        this.add(newElement, oldElement);
        this.delete(oldElement);
        return this.find(newElement);
    };
    // 寻找
    // 找到当前的
    link.find = function (element) {
        // 头尾不给找，排除在外，头尾相连也不给找，因为本身里面就没有东西，还没添加呢
        if (element === 'head' || element === 'tail' || isEmptyLink(this)) return;
        // 这里用this，因为head是创建链表时候独立存在的，link是没有head的，find调的时候也要用this，应为如果用link，里面this又指向link了，而link是没有head的
        var currentValue = this.head;
        // 要避免无限循环
        while (currentValue.element != element && currentValue !== this.tail.previous) {
            currentValue = currentValue.next;
        }
        return currentValue.element !== element ? false : currentValue;
    };
    // 展示
    link.display = function () {
        var currentValue = this.head;
        var array = [];
        var lock = true;
        while (lock || currentValue.next !== this.head.next) {
            if (!currentValue.next) return array;
            array.push(currentValue.next.element);
            currentValue = currentValue.next;
            lock = false;
        }
        return array;
    };
    return link;
})();

/*
    链表
*/

_.link = function () {
    var newLink = {};
    // 头节点
    newLink.head = {
        element : 'head',
        next : null,
        previous : null
    };
    // 尾节点
    newLink.tail = {
        element : 'tail',
        next : newLink.head,
        previous : newLink.head
    };
    // 头尾相连
    newLink.head.next = newLink.tail;
    newLink.head.previous = newLink.tail;
    // 继承方法
    newLink = Object.assign(newLink, linkOperation);
    // 初始化添加链表元素
    var allLink = [].filter.call(arguments, function (currentValue, index, array) {
        return _.isFunction(currentValue);
    });
    allLink.forEach(function (currentValue, index, array) {
        newLink.add(currentValue);
    });
    return newLink;
};

/****************
    状态
    2种方向，正序，倒序
******************/

var OrderFunc;
(function () {
    OrderFunc = function () {
        var arg = arguments[0];
        // 1. 静态
        // 首先要定义多个状态和状态的顺序
        var orderAll = [].filter.call(arg, function (currentValue, index, array) {
            return _.isFunction(currentValue);
        });
        if (!orderAll.length) return;
        this.link = _.link();
        orderAll.forEach(function (currentValue, index, array) {
            this.link.add(currentValue);
        }, this);
        this.order = this.link.find(orderAll[0]);

        // 方向
        this.left = true;
        // 记录上一次的方向（像这种东西现在来说都很零散，需要了，想到了，才会去写，以后要形成一整套概念体系才行）
        this.previousLeft = true;
        var wLeft = false;
    };
    var direction = function () {
        this.previousLeft = this.left;
        this.order = this.left ? this.order.next : this.order.previous;
        // 正序
        if (this.order === this.link.head.next) this.left = true;
        // 倒序
        if (this.order === this.link.tail.previous) this.left = false;
    };
    var oneByOne = function (isLeft, context) {
        context = _.isBoolean(isLeft) ? context : isLeft;
        var back = this.order.element.call(context);
        isLeft ? direction.call(this) : this.order = this.order.next;
        return back;
    };
    // 2. 动态
    // 然后添加一些方法能动态的添加或是删除或是修改状态
    // 添加状态
    OrderFunc.prototype.addOrder = function (newOrder, oldOrder) {
        var back = this.link.add(newOrder, oldOrder);
        if (!back) return;
        newOrder = this.link.find(newOrder);
        if (this.order.element === newOrder.next.element) this.order = newOrder;
        if (this.order.element === newOrder.previous.element) this.order = newOrder;
        return back;
    };
    // 替换状态
    OrderFunc.prototype.replaceOrder = function (newOrder, oldOrder) {
        var back = this.link.replace(newOrder, oldOrder);
        if (!back) return;
        // 更新要替换的前一个或后一个的指针
        if (this.order.element === oldOrder) this.order = this.link.find(newOrder);
        return back;
    };
    // 删除状态
    OrderFunc.prototype.deleteOrder = function (oldOrder) {
        if (!_.isFunction(oldOrder)) return;
        // 这里有个问题就是，有时删除的对象已经变成下一个要运行的对象了，例如我运行1，运行完1后，运行对象变成2，虽然紧接着我删除了2，可下次运行的是时候是运行2的对象，因为之前运行完1后，就更新了运行对象，添加，替换也有这个问题
        if (this.order.element === oldOrder) direction.call(this);
        return this.link.delete(oldOrder);
    };
    // 设置当前状态
    OrderFunc.prototype.setOrder = function (newOrder, isLeft) {
        var element = this.link.find(newOrder);
        if (!element) return;
        this.order = element;
        this.left = _.isBoolean(isLeft) ? isLeft : this.previousLeft;
        return oneByOne.call(this, wLeft);
    };
    OrderFunc.prototype.currOrder = function (isLeft, context) {
        wLeft = isLeft;
        return oneByOne.call(this, isLeft, context);
    };
})();
_.order = function () {
    return new OrderFunc(arguments);
};