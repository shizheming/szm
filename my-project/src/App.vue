<template>
<div id="app" class="app">
    <Menu style="position: fixed;">
        <template v-for="(currentValue, index) in menu">
            <Submenu :name="index" :key="index" v-if="currentValue.children">
                <template slot="title">
                    <Icon :type="currentValue.icon" />
                    {{currentValue.title}}
                </template>
                <MenuItem v-for="(item, idx) in currentValue.children" :to="{name: item.name}" :name="idx + item.name">
                    {{item.title}}
                </MenuItem>
            </Submenu>
            <MenuItem :to="{name: currentValue.name}" :name="index" v-else>
                <Icon :type="currentValue.icon" />
                {{currentValue.title}}
            </MenuItem>
        </template>
    </Menu>
    <div class="content">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</div>
</template>

<script>
import menu from './menu';
// 起名字：并不是这个叫什么名字，而是这个是什么，这个量汽车，这两汽车的名字叫特斯拉ok
export default {
    name: 'app',
    data() {
        return {
            // menu: this.$router.options.routes
            menu,
        };
    },
    components: {
    },
    methods: {

    }
}

</script>

<style lang="scss">
    .content{
        margin-left: 240px;
        padding: 20px;
    }
</style>
