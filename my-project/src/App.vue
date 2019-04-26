<template>
<div id="app" class="app">
</div>
</template>

<script>
import menu from './menu/index';
// 起名字：并不是这个叫什么名字，而是这个是什么，这个量汽车，这两汽车的名字叫特斯拉ok
export default {
    name: 'app',
    data() {
        return {
            // menu: this.$router.options.routes
            menu,
        };
    },
    watch: {
        '$route': function() {

        }
    },
    components: {
    },
    methods: {

    }
}

</script>

<style lang="scss">
.app{
    .content{
        margin-left: 240px;
    }
}
</style>
