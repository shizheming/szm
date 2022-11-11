<template>
  <a-layout>
    <a-layout-header class="header">
      <a-menu
        v-model:selectedKeys="navigationMenuSelectedKeys"
        theme="dark"
        mode="horizontal"
        @select="navigationMenuSelect"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="item in navigationArray" :key="item.name">
          <router-link :to="`/${item.name}`">{{ item.zh_CN }}</router-link>
        </a-menu-item>
      </a-menu>
      <a-space style="color: #abadaf; position: absolute; right: 10px; top: 0">
        <span>{{ userInfoObject.username }}</span>
        <a style="color: #abadaf" @click="logoutLinkClick">退出登录</a>
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
            v-for="item in menusArray"
            :key="item.name"
            :title="item.meta.title"
          >
            <a-menu-item :key="current.name" v-for="current in item.children">
              <router-link :to="`${item.path}/${current.path}`">{{
                current.meta?.title
              }}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="item in breadcrumbArray" :key="item.name">
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
import { ref, watch, reactive } from 'vue';
import axios from './utils/axios';
import {
  useRoute,
  useRouter,
  onBeforeRouteUpdate,
  RouteRecord,
  Router,
} from 'vue-router';
import r from './router/index';
import { UserInfoInterface } from './interface/index';
import type { MenuProps, MenuItemProps } from 'ant-design-vue';
import { compact, first } from 'lodash';

const navigationArray = [
  {
    name: 'orderModule',
    zh_CN: '订单',
  },
  {
    name: 'goodsModule',
    zh_CN: '商品',
  },
];
const routeObject = useRoute();
const routerObject = useRouter();
const allRouteArray = r.getRoutes();
const menusArray = ref<RouteRecord[]>([]);
const pathArray = compact(routeObject.path.split('/'));
const userInfoObject: UserInfoInterface = JSON.parse(localStorage.userInfo);
const breadcrumbArray = ref<RouteRecord[]>([]);

if (localStorage.userInfo === undefined) {
  routerObject.push({
    name: 'index',
    params: {
      token: 0,
    },
  });
}

const menuSelectedKeys = ref([pathArray[2]]);
const menuOpenKeys = ref([pathArray[1]]);
const navigationMenuSelectedKeys = ref([first(pathArray)]);

const logoutLinkClick = async () => {
  await axios.post('/api/manager/logout');
  routerObject.push({
    name: 'index',
    params: {
      token: 0,
    },
  });
};

// 获取面包屑导航
const getBreadcrumbDataFn = (pathArray: string[]) => {
  const newPathArray: string[] = [];
  pathArray.forEach((item, index) => {
    if (index === 0) newPathArray.push(`/${item}`);
    else newPathArray.push(`${newPathArray[index - 1]}/${item}`);
  });
  newPathArray.forEach((item) => {
    breadcrumbArray.value.push(
      // ts告诉我会有可能会找到一个undefined的值，不能赋给breadcrumbData
      allRouteArray.find((current) => current.path === item)
    );
  });
};

// 获取侧边栏导航
const getMenuDataFn = (path: string) => {
  let newPathString = first(compact(path.split('/'))) as string;
  menusArray.value = allRouteArray
    .filter((item) => item.meta.type)
    .filter((item) => item.path.includes(newPathString));
};

const navigationMenuSelect: MenuProps['onClick'] = (v) => {
  getMenuDataFn(v.key as string);
};

// 初始化
getBreadcrumbDataFn(pathArray);
getMenuDataFn(routeObject.path);
onBeforeRouteUpdate((updateGuard) => {
  breadcrumbArray.value = [];
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
