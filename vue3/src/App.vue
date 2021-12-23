<template>
  <a-config-provider :locale="zhCN">
    <a-layout v-if="cook">
      <a-layout-header class="header">
        <span style="color: rgba(255, 255, 255, 0.65)"
          >{{ kfsc === "kfsc" ? "" : "名气" }}商城后台运营管理系统</span
        >
        <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys1"
          :style="{ lineHeight: '64px', display: 'inline-block' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            :style="{ height: '100%', borderRight: 0 }"
          >
            <a-sub-menu key="sub1">
              <template #title>
                <span>营销</span>
              </template>
              <router-link to="/fullgift"
                ><a-menu-item key="1">满赠</a-menu-item></router-link
              >
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <template #title>
                <span>订单</span>
              </template>
              <router-link to="/examine"
                ><a-menu-item key="2">审核</a-menu-item></router-link
              >
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #title>
                <span> subnav 3 </span>
              </template>
              <a-menu-item key="9">option9</a-menu-item>
              <a-menu-item key="10">option10</a-menu-item>
              <a-menu-item key="11">option11</a-menu-item>
              <a-menu-item key="12">option12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content
            :style="{
              background: '#fff',
              padding: '24px',
              margin: 0,
              minHeight: '280px',
            }"
          >
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
    <Login v-model:cook="cook" v-else />
  </a-config-provider>
</template>

<script setup>
import VueCookies from "vue-cookies";
import Login from "./login.vue";
import { ref, toRefs, reactive, onMounted } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

let cook = ref(VueCookies.get("token"));
let kfsc = localStorage.userInfo && JSON.parse(localStorage.userInfo).platform;
let selectedKeys1 = ref();
let selectedKeys2 = ref();
let openKeys = ref();
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
