<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="site-title">
        <img
          src="./assets/logo-mqj.png"
          height="30"
          style="margin-right: 10px"
        />名气商城后台运营管理系统
      </div>
      <a-menu
        v-model:selectedKeys="navigationMenuSelectedKeysArray"
        theme="dark"
        mode="horizontal"
        @select="navigationMenuSelectFunction"
        :style="{ lineHeight: '64px', display: 'inline-block' }"
      >
        <a-menu-item v-for="item in navigationArray" :key="item.name">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </a-menu-item>
      </a-menu>
      <a-space style="color: #abadaf; float: right">
        <span>{{ userInfoObject.username }}</span>
        <a style="color: #abadaf" @click="logoutLinkButtonClickFunction"
          >退出登录</a
        >
      </a-space>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200">
        <a-menu
          v-model:selectedKeys="menuSelectedKeysArray"
          v-model:openKeys="menuOpenKeysArray"
          theme="dark"
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
            height: 'calc(100vh - 142px)',
            overflow: 'auto',
          }"
        >
          <router-view v-slot="{ Component }">
            <Suspense>
              <component :is="Component"></component>
              <template #fallback>
                <a-skeleton active />
              </template>
            </Suspense>
          </router-view>
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
  RouteRecordName,
} from 'vue-router';
import myRouteObject from './router/index';
import {
  UserInfoRequestResultInterface,
  PermissionsRequestResultInterface,
} from './interface/index';
import type { MenuProps, MenuItemProps } from 'ant-design-vue';
import { compact, first } from 'lodash';
import { routerPermissionsArray } from './permissions/index';

const navigationArray = ref<
  {
    name: RouteRecordName;
    path: string;
    title: string;
  }[]
>([]);

const routeObject = useRoute();
const routerObject = useRouter();
const allRouteArray = myRouteObject.getRoutes();
const menusArray = ref<RouteRecord[]>([]);
const pathArray = compact(routeObject.path.split('/'));
console.log(allRouteArray, 1234);
console.log(pathArray, 12300);
const permissionsArray: PermissionsRequestResultInterface[] = JSON.parse(
  localStorage.permissions
);
const userInfoObject: UserInfoRequestResultInterface = JSON.parse(
  localStorage.userInfo
);
const breadcrumbArray = ref<RouteRecord[]>([]);

const menuSelectedKeysArray = ref([pathArray[2]]);
const menuOpenKeysArray = ref([pathArray[1]]);
const navigationMenuSelectedKeysArray = ref([first(pathArray)]);

const logoutLinkButtonClickFunction = async () => {
  await axios.post('/api/manager/logout');
  routerObject.push({
    name: 'index',
    params: {
      token: 0,
    },
  });
};

// 获取面包屑导航
const getBreadcrumbDataFunction = (pathArray: string[]) => {
  breadcrumbArray.value = [];
  const newPathArray: string[] = [];
  pathArray.forEach((item, index) => {
    if (index === 0) newPathArray.push(`/${item}`);
    else newPathArray.push(`${newPathArray[index - 1]}/${item}`);
  });
  newPathArray.forEach((item) => {
    breadcrumbArray.value.push(
      allRouteArray.find((current) => current.path === item)!
    );
  });
};

// 获取侧边栏导航
const getMenuDataFunction = (path: string) => {
  let newPathString = first(compact(path.split('/')));
  menusArray.value = allRouteArray
    .filter((item) => item.meta.type === 'menu') //获取是菜单的
    .filter((item) => item.path.includes(newPathString!)) //获取当前模块路由
    .map((item) => {
      // 过滤类似详情页不需要展示在侧边栏的菜单
      item.children = item.children.filter(
        (current) => !current.meta!.menuIsHidden
      );
      return item;
    });
};

const navigationMenuSelectFunction: MenuProps['onClick'] = (v) => {
  getMenuDataFunction(v.key as string);
};

// 初始化
// 根据权限显示模块和菜单
routerPermissionsArray.forEach((item) => {
  if (
    permissionsArray.some((current) => {
      return item.permissionName === current.name;
    })
  ) {
    const {
      name,
      path,
      meta: { title },
    } = allRouteArray.find(({ name }) => name === item.name);
    // 添加模块
    navigationArray.value.push({
      name,
      path,
      title: title as string,
    });
    // 添加菜单
    console.log(routeObject.path, 2839);

    getMenuDataFunction(routeObject.path);
  }
});

getBreadcrumbDataFunction(pathArray);

onBeforeRouteUpdate((updateGuard) => {
  getBreadcrumbDataFunction(compact(updateGuard.path.split('/')));
  const updatePathData = compact(updateGuard.path.split('/'));
  menuSelectedKeysArray.value = [updatePathData[2]];
  menuOpenKeysArray.value = [updatePathData[1]];
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

.site-title {
  font-size: 16px;
  margin-right: 30px;
  line-height: 46px;
  color: rgba(255, 255, 255, 0.65);
  display: inline-block;
}

body {
  overflow: hidden;
}
</style>
