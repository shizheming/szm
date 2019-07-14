<template>
    <Layout>
        <Sider :style="{width: '30%', backgroundColor: '#fff'}">
            <Menu :style="{width: '100%'}">
                <Submenu :name="index" v-for="(current, index) in menu">
                    <template slot="title">
                        <Icon :type="current.icon" />
                        {{current.title}}
                    </template>
                    <MenuItem :name="`${index}_${idx}`" :to="{name: item.name}" v-for="(item, idx) in current.child">{{item.title}}</MenuItem>
                </Submenu>
                <!-- <MenuItem name="x" :to="{name: 'verb'}">词</MenuItem> -->
            </Menu>
        </Sider>
        <Content :style="{paddingLeft: '10%', backgroundColor: '#fff'}">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </Content>
    </Layout>
</template>
<script>
import { menu } from './router';
import maybe from './script/maybe';
var aa = maybe.of({a: 34}).map(function (current) {
    console.log(current,1237134);
    return current.a;
}).map(function (current) {
    return current.v;
});
console.log(aa,123123);
console.log(menu,18)
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