import {
  createRouter,
  createWebHistory,
  RouterOptions,
  RouteRecordRaw,
  Router,
} from 'vue-router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import vueCookie from 'vue-cookies';
import { setAxiosHeader } from '../utils/axios';
import order from './order';
import goods from './goods';
import { flatRouter } from '../utils/tool';
import { PermissionsRequestResultInterface } from '../interface/index';
import { routerPermissionsArray } from '../permissions/index';

// 这里的问题牵扯的就是什么时候利用作用域，什么时候用函数返回
flatRouter(order);

const moudleRouterArray: RouteRecordRaw[] = [
  {
    path: '/orderModule',
    name: 'orderModule',
    meta: {
      title: '订单模块',
    },
    component: () => import('../views/orderModule/orderModule.vue'),
    children: order,
  },
  {
    path: '/goodsModule',
    name: 'goodsModule',
    meta: {
      title: '商品模块',
    },
    component: () => import('../views/goodsModule/goodsModule.vue'),
    children: goods,
  },
];

moudleRouterArray.forEach((item) => {
  item.meta.type = 'moudle';
});

const routesArray = [
  {
    path: '/',
    // redirect: "/system",
    name: 'index',
    meta: {
      title: '首页',
    },
    component: () => import('../frame.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {},
    component: () => import('../login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {},
    component: () => import('../404.vue'),
  },
];

// path加上父级，同时打平
// 这是是用来干嘛得，没有用到饿？？？？
/* let newRouteArray: RouteRecordRaw[] = [];
function handleRouteFunction(arr: RouteRecordRaw[], father?: string) {
  arr.forEach((item) => {
    if (father) {
      item.path = `${father}/${item.path}`;
    }
    if (item.children) {
      handleRouteFunction(item.children, item.path);
    }
    newRouteArray.push(item);
  });
} */

const myRouteObject = createRouter({
  history: createWebHistory(),
  routes: routesArray,
});
let hasNecessaryRouteBoolean = true;

myRouteObject.beforeEach((to, form) => {
  nprogress.start();
  if (vueCookie.get('token')) {
    if (to.params.token === '0') {
      // 主动退出登陆，我在这里删除token，所以一开始进来的时候是有token的
      vueCookie.remove('token');
      // 我只能通过刷新页面来实现重置路由，难道4就没有重置的方法吗？？？？
      location.href = location.href;
      return false;
    } else if (form.path === '/') {
      // 说明是刷新页面进来的
      if (
        !localStorage.userInfo ||
        !localStorage.permissions ||
        !vueCookie.get('token')
      ) {
        // userInfo，permissions，token任一一个没有就要重新登陆
        vueCookie.remove('token');
        setAxiosHeader({ token: undefined });
        localStorage.permissions = '';
        localStorage.userInfo = '';
        if (to.path) {
          return `/login?path=${to.path}`;
        } else {
          return '/login';
        }
      }
      // 都有得就要加载这个页面了
      // 权限
      addRouteFunction(JSON.parse(localStorage.permissions));
      if (hasNecessaryRouteBoolean) {
        // 添加token
        setAxiosHeader({ token: vueCookie.get('token') });
        hasNecessaryRouteBoolean = false;
        // 当有token的时候打开登陆页，让他去首页

        if (to.path === '/login') {
          return '/';
        } else {
          // 当有token的时候打开除登陆页以外的页面，让他进去
          // 触发重定向
          return to.fullPath;
        }
      }
    }
  } else if (to.params && to.params.token) {
    // 说明是用户登陆进来，带token参数过来的，
    // 设置登录态
    vueCookie.set('token', to.params.token);
    // 设置请求头
    setAxiosHeader({ token: to.params.token as string });
    // 缓存用户信息和权限信息
    localStorage.permissions = to.params.permissions;
    localStorage.userInfo = to.params.userInfo;
    // 动态添加路由

    addRouteFunction(JSON.parse(to.params.permissions as string));
    if (form.query.path) {
      return form.query.path as string;
    } else {
      return '/';
    }
  } else {
    // 其他页面没token的情况下跳转到登陆页，带上访问地址
    if (to.path !== '/login') {
      if (to.path === '/') {
        return '/login';
      } else {
        return `/login?path=${to.path}`;
      }
    }
  }
});

myRouteObject.afterEach(() => {
  nprogress.done();
});

// 获取权限对应得路由，然后添加
const addRouteFunction = (
  permissionsArray: PermissionsRequestResultInterface[]
) => {
  haddleMoudleRouterFunction(permissionsArray, moudleRouterArray).forEach(
    (item) => {
      myRouteObject.addRoute('index', item);
    }
  );
};

type xx = typeof moudleRouterArray;

// 匹配权限
const haddleMoudleRouterFunction = (
  permissionsArray: PermissionsRequestResultInterface[],
  routerArray: typeof moudleRouterArray
): typeof moudleRouterArray => {
  const newMoudleRouterArray = routerArray.filter(({ name }) => {
    const permissionsObject = routerPermissionsArray.find(
      (item) => item.name === name
    );
    if (permissionsObject) {
      return permissionsArray.some(
        (item) => item.name === permissionsObject.permissionName
      );
    }
  });
  return newMoudleRouterArray;
};
export default myRouteObject;
