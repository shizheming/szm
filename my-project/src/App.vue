<template>
<div id="app">
    <header>
        <Menu mode="horizontal">
            <MenuItem v-for="(currentValue, index) in menu" :name="index" :to="currentValue.path" :key="index">
                <Icon :type="currentValue.icon" />
                {{currentValue.title}}
            </MenuItem>
        </Menu>
    </header>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
// 起名字：并不是这个叫什么名字，而是这个是什么，这个量汽车，这两汽车的名字叫特斯拉ok
export default {
    name: 'app',
    data() {
        return {
            menu: this.$router.options.routes
        };
    },
    components: {
    },
    methods: {

    }
}

</script>

<style>

</style>
