<template>
    <div id="app">
        <div>
            <router-link to="/tool">tool</router-link>
        </div>
        <div>
            <router-link to="/consumptionRecord">consumptionRecord</router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
// 起名字：并不是这个叫什么名字，而是这个是什么，这个量汽车，这两汽车的名字叫特斯拉ok
export default {
    name: 'app',
    components: {

    }
}

</script>

<style>

</style>
