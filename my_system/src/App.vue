<template>
    <div id="app">
        <p>我下面写的词都是以人为出发点，是一些名词，也同时是一些动词，但是这些动词并不同于具体的动词，是抽象的动词，更加形式提炼的动词，摘，拿，这些事具体动词，也可以认为、是质料性的动词</p>
        <a href="#/relationship">关系</a>
        <p>弄个最最简单的关系，一对一，多到最后还是一，</p>
        <p>某人和某人的关系，有关系，是什么关系我不关心，这只是一个表，说明有关系</p>
        <a href="#/decorate">装饰</a>
        <p>对于人来说装饰就是穿一件漂亮的依附，当然不限于褒义的漂亮，我可以穿可以脱，并不是我身体的一部分，是外加的，有包裹的感觉</p>
        <a href="#/motion">运动（间断性连续性）</a>
        <p>运动就是大家一起动，彼此之间没有关系，所以入参是统一一样的，出参是独立的，相互无关系的</p>
        <a href="#/linkage">联动</a>
        <p>联动和运动的区别在于出参，参数会经过每一个函数，最后吐出一个最终的结果，从时间上来讲是有前后级关系的，是有关系的，不像运动是没关系的</p>
        <a href="#/attachment">依附</a>
        <p>依附和联动的区别在于有主次关系，而且是写在对象上面的，当属性的，而像联动，虽然是连带的，但每个函数都是独立的</p>
        <a href="#/strategy">策略（分支，判断）</a>
        <a href="#/memoized">记忆</a>
        <a href="#/run">运行（达到条件才停止）</a>
        <a href="#/state">状态</a>
        <p>判断（也就是形成分叉的原因）从统一出发</p>
        <p>有没有，判断，先有没有这个，再说是不是这个</p>
        <ul>
            <li>_.includes</li>
        </ul>
        <p>是不是，判断是不是某个对象</p>
        <ul>
            <li>是不是类数组_.isArguments</li>
            <li>是不是数组_.isArray</li>
            <li>是不是对象_.isObject</li>
            <li>是不是正则_.isRegExp</li>
            <li>是不是函数_.isFunction</li>
            <li>是不是日期_.isDate</li>
            <li>是不是布尔_.isBoolean</li>
            <li>是不是字符串_.isString</li>
        </ul>
        <p>是否，判断是不是某个对象状态</p>
        <ul>
            <li>是否冻结_.isFrozen</li>
            <li>是否相等_.is</li>
        </ul>

        <!-- 姑且这样分吧，小操作大概念，没有绝对的界限 -->
        <p>操作，动作</p>
        <p>获取，要，拿，摘，分，分组，去，删，合，差，最，次数（有些数学的意思）</p>
        <ul>
            <li>要键_.key</li>
            <li>要值_.value</li>
            <li>摘部分值P_.pluck</li>
            <li>把数组按条件分组_.group</li>
            <li>把数组按长度分组_.chunk（长度也是条件，所以条件这个前提最大，可以也许多外延，长度就是一个）</li>
            <li>删_.without</li>
            <li>去重_.uniq</li>
            <li>去假值_.compact</li>
            <li>并集_.union</li>
            <li>交集_.intersection</li>
            <li>差集_.differenceset</li>
            <li>最大_.max</li>
            <li>最小_.min</li>
            <li>一次_.min</li>
            <li>之后几次_.min</li>
            <li>之前几次_.min</li>
        </ul>
        <p>形态变化，结构变化</p>
        <ul>
            <li>对象变数组，数组变对象</li>
            <li>冻结对象</li>
        </ul>
        <p>循环</p>
        <ul>
            <li>单循环</li>
        </ul>
        <p>尚未定义</p>
        <ul>
            <li>反转</li>
        </ul>
        <!-- <dl>
            <dt>语言是什么？</dt>
            <dd>xxxx</dd>
            <dt>什么是语言？</dt>
            <dd>xxxx</dd>
            <dt>语言的组成是什么？</dt>
            <dd>xxxx</dd>
            <dt>语言不变的是什么？</dt>
            <dd>xxxx</dd>
            <dt>语言变的是什么？</dt>
            <dd>xxxx</dd>
        </dl>
        <dl>
            <dt>js是什么？</dt>
            <dd>js是门语言</dd>
            <dt>什么是js？</dt>
            <dd>xxxx</dd>
            <dt>js的组成是什么？</dt>
            <dd>变量，语句，对象，属性，方法，逻辑</dd>
            <dt>js不变的是什么？</dt>
            <dd>js组成的本身</dd>
            <dd>（在我看来js乃至人类语言本身有两条路，第一条不叉路，一个起点，一个终点，第二条分叉路，一个起点，分叉成n个终点，造成分叉的原因是判断语句，如果js没有判断一条路写到底会怎么样）</dd>
            <dd>怎么把叉路合成一条路，把判断分装在里面</dd>
            <dt>js变的是什么？</dt>
            <dd>js组成的衍生的第一实体，那个个别的</dd>
        </dl> -->
        <router-view/>
    </div>
</template>

<script>

import _ from './script/is';

export default {
    name: 'app',
    data () {
        return {
            n: 6767
        };
    },
    components: {
    }
};

</script>

<style>
</style>