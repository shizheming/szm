<template>
    <div>linkage</div>
</template>

<script>

import observation from '../script/linkage.3';
// 这个是变量级别的联动，不是函数级别的
function () {
    /*********************************设计原则********************************************/
    /*
    1.单一原则：
        一个对象（方法）只做一件事，一个对象（方法）应该仅有一个引起他变化的原因

    2.最少知道原则：
        一个对象（方法）应当尽可能少的去其他对象（方法）发生相互作用
        “城门失火殃及池鱼，一人犯法株连九族”

    3.开放-封闭原则

        这里是观察数据的变化而动作，还要写个观察更抽象的动作而动作，数据动作也是动作的一种，从数据变化抽象出他的种的，那就是一切动作
    
    */
    // 初始化key
    var a = observation(['accont', 'password', 'smscode']);
    // 监听

    a.listen('accont', function () {
        console.log('我动了accont');
    });
    a.listen('password', function () {
        console.log('我动了password');
    });
    a.listen('smscode', function () {
        console.log('我动了smscode');
    });
    // 发布新数据
    setTimeout(function () {
        a.set({
            accont: 11111
        });
    }, 1000);
    // 下个版本需要升级的内容
    // 1.初始数据层的时候就能初始数据
    // 2.可以动态添加数据
    // 3.动态删除数据
    // 4.值是引用类型而且带有嵌套的时候如何set值，如何get值，如何去继承不变的值
}

</script>