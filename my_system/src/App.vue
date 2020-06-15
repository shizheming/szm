<template>
    <div id="app">
        <h1>js的质料是什么，是数据结构，是函数</h1>
        <h1>大的概念，有巨大的外延很小的内涵，大的形式，小的质料</h1>
        <ul>
            <li>
                <a href="#/relationship">关系</a>
            </li>
            <li>
                <a href="#/motion">间断性连续性（运动）</a>
                <ul>
                    <li>
                        <a href="#/linkage">联动</a>
                    </li>
                    <li>
                        <a href="#/compose">组合</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#/strategy">策略（分支，判断）</a>
            </li>
            <li>
                <a href="#/memoized">记忆</a>
            </li>
            <li>
                <a href="#/run">运行（达到条件才停止）</a>
            </li>
            <li>
                <a href="#/decorate">装饰</a>
            </li>
            <li>
                <a href="#/state">状态</a>
            </li>
        </ul>
        <h1>判断（也就是形成分叉的原因）从统一出发</h1>
        <h1>有没有，判断，先有没有这个，再说是不是这个</h1>
        <ul>
            <li>_.includes</li>
        </ul>
        <h1>是不是，判断是不是某个对象</h1>
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
        <h1>是否，判断是不是某个对象状态</h1>
        <ul>
            <li>是否冻结_.isFrozen</li>
            <li>是否相等_.is</li>
        </ul>

        <!-- 姑且这样分吧，小操作大概念，没有绝对的界限 -->
        <h1>操作，动作</h1>
        <h1>获取，要，拿，摘，分，分组，去，删，合，差，最，次数（有些数学的意思）</h1>
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
        <h1>形态变化，结构变化</h1>
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