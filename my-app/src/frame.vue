<template>
  <a-layout>
    <a-layout-header class="header">
      <a-menu
        v-model:selectedKeys="navigationSelectedKeys"
        theme="dark"
        mode="horizontal"
        @select="navigationMenuSelect"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item in navigationData" :key="item.name">
          <router-link :to="`/${item.name}`">{{ item.zh_CN }}</router-link>
        </a-menu-item>
      </a-menu>
      <a-space style="color: #abadaf; position: absolute; right: 10px; top: 0">
        <span>{{ userInfoData.username }}</span>
        <a style="color: #abadaf" @click="logoutButtonClick">退出登录</a>
      </a-space>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="menuSelectedKeys"
          v-model:openKeys="menuOpenKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu
            v-for="item in menusData"
            :key="item.name"
            :title="item.meta.title"
          >
            <a-menu-item :key="current.name" v-for="current in item.children">
              <router-link :to="`${item.path}/${current.path}`">{{
                current.meta.title
              }}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="item in breadcrumbData" :key="item.name">
            <router-link :to="item.path">{{ item.meta.title }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view> </router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons-vue';
import { ref, watch } from 'vue';
import axios from './utils/axios';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import r from './router/index';
import { compact, first } from 'lodash';

const navigationData = [
  {
    name: 'orderModule',
    zh_CN: '订单',
  },
  {
    name: 'goodsModule',
    zh_CN: '商品',
  },
];
const route = useRoute();
const router = useRouter();
const allRoute = r.getRoutes();
const menusData = ref([]);
const pathData = compact(route.path.split('/'));
if (localStorage.userInfo === undefined) {
  router.push({
    name: 'index',
    params: {
      token: 0,
    },
  });
}
const userInfoData = JSON.parse(localStorage.userInfo);
const menuSelectedKeys = ref([pathData[2]]);
const menuOpenKeys = ref([pathData[1]]);
const navigationSelectedKeys = ref([first(pathData)]);
const breadcrumbData = ref([]);

const logoutButtonClick = async () => {
  await axios.post('/api/manager/logout');
  router.push({
    name: 'index',
    params: {
      token: 0,
    },
  });
};

// 获取面包屑导航
const getBreadcrumbDataFn = (pathData) => {
  const newPathData = [];
  pathData.forEach((item, index) => {
    if (index === 0) newPathData.push(`/${item}`);
    else newPathData.push(`${newPathData[index - 1]}/${item}`);
  });
  newPathData.forEach((item) => {
    breadcrumbData.value.push(
      allRoute.find((current) => current.path === item)
    );
  });
};

// 获取侧边栏导航
const getMenuDataFn = (path) => {
  path = first(compact(path.split('/')));
  menusData.value = allRoute
    .filter((item) => item.meta.type)
    .filter((item) => item.path.includes(path));
};

const navigationMenuSelect = (v) => {
  getMenuDataFn(v.key);
};

// 初始化
getBreadcrumbDataFn(pathData);
getMenuDataFn(route.path);
onBeforeRouteUpdate((updateGuard) => {
  breadcrumbData.value = [];
  getBreadcrumbDataFn(compact(updateGuard.path.split('/')));
  const updatePathData = compact(updateGuard.path.split('/'));
  menuSelectedKeys.value = [updatePathData[2]];
  menuOpenKeys.value = [updatePathData[1]];
});
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
