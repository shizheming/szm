<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <ul>
            <li>
                到底是有人呢还是没人
                <ul>
                    <li>
                        <a href="#/relationship">关系</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="#/motion">间断性连续性（运动）</a>
                        <ul>
                            <li>
                                <a href="#/linkage">联动</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#/strategy">策略（分支，判断）</a>
                    </li>
                </ul>
            </li>
        </ul>
        <dl>
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
        </dl>
        
       
        <router-view/>
    </div>
</template>

<script>

export default {
    name: 'app',
    components: {
    }
};
</script>

<style>
</style>
