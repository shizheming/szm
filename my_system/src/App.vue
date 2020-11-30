<template>
    <div id="app">
        <!-- <a href="#/relationship">关系</a>
        <p>弄个最最简单的关系，一对一，多到最后还是一，</p>
        <p>某人和某人的关系，有关系，是什么关系我不关心，这只是一个表，说明有关系</p>
        <a href="#/decorate">装饰</a>
        <p>对于人来说装饰就是穿一件漂亮的依附，当然不限于褒义的漂亮，我可以穿可以脱，并不是我身体的一部分，是外加的，有包裹的感觉</p>
        <a href="#/state">状态</a>
        <p>我先把策略去掉了，因为我觉得状态不仅仅是内部的自动变化，也有外部的出发条件，所以战且能当策略用</p>
        <a href="#/motion">运动（间断性连续性）</a>
        <p>运动就是大家一起动，彼此之间没有关系，所以入参是统一一样的，出参是独立的，相互无关系的</p>
        <a href="#/linkage">联动</a>
        <p>联动和运动的区别在于出参，参数会经过每一个函数，最后吐出一个最终的结果，从时间上来讲是有前后级关系的，是有关系的，不像运动是没关系的</p>
        <a href="#/attachment">依附</a>
        <p>依附和联动的区别在于有主次关系，而且是写在对象上面的，当属性的，而像联动，虽然是连带的，但每个函数都是独立的</p>
        <a href="#/memoized">记忆</a> -->

        <router-view/>
    </div>
</template>

<script>

import _ from './script/is';

export default {
    name: 'app',
    data () {
        return {
            color: '#ccc'
        };
    },
    created () {
        const myPromise = function (callback) {
            let full = function () {};
            const resolve = function (value) {
                full(value);
            };

            callback(resolve);
            return {
                then (successcallback) {
                    return myPromise(function (resolve) {
                        full = function (value) {
                            const r = successcallback(value);

                            // eslint-disable-next-line no-prototype-builtins
                            if (typeof r === 'object' && r.hasOwnProperty('then')) {
                                r.then(resolve);
                            } else {
                                resolve(r);
                            }
                        };
                    });
                }
            };
        };
    },
    components: {
    }
};
</script>

<style>
</style>