<template>
    <Layout>
        <Sider :style="{width: '30%', backgroundColor: '#fff'}">
            <Menu :style="{width: '100%'}">
                <MenuItem name="1" :to="{name: 'verb'}">123123</MenuItem>
                <MenuItem name="2" :to="{name: 'forEach'}">123123</MenuItem>
                <MenuItem name="3">123123</MenuItem>
                <MenuItem name="4">123123</MenuItem>
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
export default {
    data () {
        return {
        };
    }
};
</script>
<style lang="less">

</style>