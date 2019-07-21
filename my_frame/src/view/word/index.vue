<template>
    <pre class="line-numbers language-javascript">
        <code class="language-javascript" v-html="code">
            <!-- <div v-html="code"></div> -->
        </code>
    </pre>
</template>
<script>
import i from './index';
import './index.less';

var m;
Promise.all([
    import('@script/example/relationship1'),
    import('@script/example/relationship2'),
    import('@script/example/relationship'),
    import('@script/example/discontinuity'),
    import('@script/example/linkage1'),
    import('@script/example/linkage'),
    import('@script/example/strategy1'),
    import('@script/example/strategy'),
    import('@script/example/chain'),
    import('@script/example/observation')
]).then((a) => {
    m = a;
});


export default {
    data() {
        return {
            code: ''
        };
    },
    watch: {
        '$route': function (to, from) {
            this.$nextTick(() => {
                var k = m.filter(current => current.key === to.name);
                this.renderFun(k[0].default, k[0].map);
            });
        }
    },
    mounted() {
        
    },
    methods: {
        renderFun (example, map) {
            example();
            var h = i.renderFun(example, map);
            // console.log(h,2342342);
            this.code = h;
        }
    }
};
</script>
<style lang="less">

</style>