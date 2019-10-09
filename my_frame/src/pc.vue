<template>
    <Layout>
        <Sider :style="{ width: '30%', backgroundColor: '#fff' }">
            <Menu :style="{ width: '100%' }">
                <MenuItem v-for="(current, index) in menu" :name="index" :to="{ name: current.name }" :key="`menu${index}`">{{
                    current.title
                }}</MenuItem>
            </Menu>
        </Sider>
        <Content :style="{ backgroundColor: '#fff' }">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </Content>
    </Layout>
</template>
<script>
import {menu} from './router';

export default {
    data () {
        return {
            menu
        };
    }
};
</script>
<style lang="less">
</style>