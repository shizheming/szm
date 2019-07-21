<template>
    <Layout>
        <Sider :style="{width: '30%', backgroundColor: '#fff'}">
            <Menu :style="{width: '100%'}">
                <Submenu :name="index" v-for="(current, index) in menu" v-if="current.child">
                    <template slot="title">
                        <Icon :type="current.icon" />
                        {{current.title}}
                    </template>
                    <MenuItem :name="`${index}_${idx}`" :to="{name: item.name}" v-for="(item, idx) in current.child">{{item.title}}</MenuItem>
                </Submenu>
                <MenuItem :name="index" :to="{name: current.name}" v-else>{{current.title}}</MenuItem>
            </Menu>
        </Sider>
        <Content :style="{backgroundColor: '#fff'}">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </Content>
    </Layout>
</template>
<script>
import { menu } from './router';


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