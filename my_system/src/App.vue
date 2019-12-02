<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <h2>范畴</h2>
        <p>量：单一性、多数性、总体性。 </p>
        <p>质：实在性、否定性和限制性。 </p>
        <p>关系：实体与偶性、原因性与依存性（原因和结果）、协同性或者交互性。 </p>
        <p>模态：可能性与不可能性、现实性与非现实性、必然性与偶然性。 </p>
        <!-- <h3>作用于函数，基于对象，也就是说，我在操作函数，但概念是对象级别的，把函数当作对象，对象是由属性和方法的</h3> -->
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
        <!-- <h3>作用于数组和json，基于对象，也就是说，我在操作数组和json，但概念是对象级别的，把数组和json当作对象，对象是由属性和方法的</h3> -->
        <h2>具体的行为，落实到质料上，数据上，同时是对象级别</h2>
        <p>是不是，判断是不是某个对象</p>
        <ul>
            <li>是不是类数组</li>
            <li>是不是数组</li>
            <li>是不是对象</li>
            <li>是不是正则</li>
            <li>是不是函数</li>
            <li>是不是日期</li>
            <li>是不是布尔</li>
            <li>是不是字符串</li>
        </ul>
        <p>是否，判断是不是某个对象状态</p>
        <ul>
            <li>是否冻结</li>
            <li>是否相等</li>
        </ul>
        <p>获取，要，拿，摘，分，分组，去，合</p>
        <ul>
            <li>要key</li>
            <li>要value</li>
            <li>摘部分value</li>
            <li>把数组按条件分组</li>
            <li>删</li>
            <li>去重</li>
            <li>并集</li>
            <li>交集</li>
            <li>差集</li>
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
            <li>包含</li>
            <li>最大</li>
            <li>最小</li>
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




console.log(_.zip(["moe", 30, true], ["larry", 40, false], ["curly", 50, false]));

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
