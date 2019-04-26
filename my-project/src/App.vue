<template>
<div id="app" class="app">
    <a-layout>
        <a-layout-sider style="background-color: #fff;">
            <a-menu mode="inline">
                <template v-for="(current, index) in menu">
                    <a-sub-menu :key="index" v-if="current.children">
                        <span slot="title"><a-icon :type="current.icon" />{{current.title}}</span>
                        <a-menu-item :key="`${index}_${idx}`" v-for="(item, idx) in current.children">{{item.title}}</a-menu-item>
                    </a-sub-menu>
                    <a-menu-item :key="index" v-else><a-icon :type="current.icon" />{{current.title}}</a-menu-item>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout-content style="background-color: #fff;">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </a-layout-content>
    </a-layout>
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
