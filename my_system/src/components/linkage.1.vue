<template>
    <div>linkage</div>
</template>
<script>
import _ from '../script/_';
import linkage from '../script/linkage.1';

/*
        时间：2018.09

        联动：（属性，一和多，静和动，时间和空间，间断和连续）
        内容：
            完成了一对一，一对多，多对一的联动，单方向上就只有一对一，完成了动静，同时加上了时间，在不同的时间上有可能对象不同的联动，只有初始化联动的时候是不够的，无法再其他时间里变化联动，所以添加了建立和解除的属性方法来解决在时间上的变化。
        衍生：
            力，方向，顺序
        说明：
            始终是面向函数，从函数出发来考虑
            落实在函数上就是A函数被调用后，会触发与A函数有联动的B函数，B函数被调用后，会触发与B函数有联动的C函数，以此类推，也就是说调用运行都是一下子连着触发的，如果有了间断，那么被连带的函数能够自行判断是否执行
        属性（方法）：
            1建立联动
            2解除联动
        感想：
            这有点声明式的意思了，我只定义和声明，要怎么干交给函数就好了
            我发现我喜欢不动的代码，把一切都准备好，然后只要按下一个按钮，程序就自动运行了，我这个指的是写代码的时候，好像这就有点声明式的意思了
            我写的联动，就像vue的watch，不过人家是数据驱动，我这里是函数驱动,
            顺序和联动从内容上来看几乎是差不多的，只是用处和关注点不一样，也就是形式不一样，我现在在专注形式帮助我形成体系，
        改进：
            1把联动变成软软嵌入的，而不是现在的硬嵌入，
            2建立联动的同时，建立一张直观的联动表，需要看的时候一目了然，
            3增加间断和连续的概念
            4把空间概念引入，把联动的名称和联动体分开，联动名称单独写一个地方形成一个联动表
        思考：
            虽然一既是多，我只写了一对一的关系，我把多也写进一里面了。。。。。。。。。。。。。。。。。。
    */

var bigObj = [{
    relationName: 'selector2GetData',
    content: function list1GetData (a, b, c) {
        var h = _.randomNumber();
        var li = '';

        console.log('list1GetData');
        return [a + 1, b + 1, c + 1];
    }
}, {
    relationName: 'changeSelector2BackgroundColor',
    content: function selector1ChangeColor () {

    }
}, {
    content: function selector1ChangeSelector1FontSize (a, b, c) {
        return [a + 1, b + 1, c + 1];
    }
}, {
    relationName: 'changeUl1BackgroundColor',
    content: function selector2GetData (a, b, c) {
        var that = this;
        var h = _.randomNumber();
        var option = '';

        for (var i = 0; i < h; i++) option += '<option value="' + i + '">' + _.randomNumberAlphabet(10) + '</option>';

        console.log('selector2GetData', a, b, c);
        return [a + 1, b + 1, c + 1];
    }
}, {
    relationName: 'changeUl1BackgroundColor',
    content: function changeSelector2BackgroundColor () {

    }
}, {
    content: function changeBodyBackgroundColor () {

    }
}, {
    content: function changeUl1BackgroundColor (a, b, c) {
        console.log('changeUl1BackgroundColor', a, b, c);
    }
}, {
    content: function changeUl2BackgroundColor2 () {

    }
}, {
    relationName: 'select3GetData',
    content: function list2GetData (a, b, c) {
        var h = _.randomNumber();
        var li = '';

        return [a + 1, b + 1, c + 1];
    }
}, {
    content: function select3GetData (a, b, c) {
        var that = this;
        var h = _.randomNumber();
        var option = '';

        return [a + 1, b + 1, c + 1];
    }
}, {
    content: function select4ChangeBorderColor (a, b, c) {
        console.log('select4ChangeBorderColor');
    }
}];

var haha = linkage(bigObj);

export default {
    created () {

    }
};
</script>