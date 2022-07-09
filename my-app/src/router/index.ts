import { createRouter, createWebHistory } from "vue-router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import vueCookie from "vue-cookies";
import { setAxiosHeader } from "../utils/axios";
import order from "./order";
import goods from "./goods";

interface routes {
  path: string;
  name: string;
  meta: { title: string };
  component: () => Promise<typeof import("*.vue")>;
  children: [];
}

const routes = [
  {
    path: "/",
    // redirect: "/system",
    name: "index",
    meta: {
      title: "首页",
    },
    component: () => import("../frame.vue"),
    children: [
      {
        path: "/orderModule",
        name: "orderModule",
        meta: {
          title: "订单模块",
        },
        component: () => import("../views/orderModule/orderModule.vue"),
        children: order,
      },
      {
        path: "/goodsModule",
        name: "goodsModule",
        meta: {
          title: "商品模块",
        },
        component: () => import("../views/goodsModule/goodsModule.vue"),
        children: goods,
      },
      {
        path: "/listPage",
        name: "listPage",
        meta: {
          title: "列表代码块页面",
        },
        component: () => import("../components/listPage.vue"),
      },
      {
        path: "/formPage",
        name: "formPage",
        meta: {
          title: "表单代码块页面",
        },
        component: () => import("../components/formPage.vue"),
      },
      {
        path: "/detailPage",
        name: "detailPage",
        meta: {
          title: "详情代码块页面",
        },
        component: () => import("../components/detailPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: {},
    component: () => import("../login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {},
    component: () => import("../404.vue"),
  },
];
// path加上父级，同时打平
let newRoute: routes[] = [];
function handleRoute(arr: routes[], father?: string) {
  arr.forEach((item) => {
    if (father) {
      item.path = `${father}/${item.path}`;
    }
    if (item.children) {
      handleRoute(item.children, item.path);
    }
    newRoute.push(item);
  });
}

const myRouter = createRouter({
  history: createWebHistory(),
  routes,
});
let hasNecessaryRoute = true;

myRouter.beforeEach((to, form) => {
  nprogress.start();
  if (vueCookie.get("token")) {
    // 主动退出登陆，我在这里删除token，所以一开始进来的时候是有token的
    if (to.params.token === "0") {
      vueCookie.remove("token");
      // 我只能通过刷新页面来实现重置路由，难道4就没有重置的方法吗？？？？
      location.href = location.href;
      return false;
    } else if (form.path === "/") {
      // 刷新页面进来的，根据权限数据添加动态路由
      // // 这个项目暂时没有权限，先留个口子
      // let permissions = JSON.parse(localStorage.permissions);
      // // 处理。。。。。。
      if (hasNecessaryRoute) {
        // 添加token
        setAxiosHeader({ token: vueCookie.get("token") });
        /* // 打平路由
        handleRoute(cloneDeep(asyncRoutes));
        newRoute.forEach((item) => {
          // myRouter.addRoute("allInOneAccount", item);
        }); */
        hasNecessaryRoute = false;
        // 当有token的时候打开登陆页，让他去首页
        if (to.path === "/login") {
          return "/";
        } else {
          // 当有token的时候打开除登陆页以外的页面，让他进去
          // 触发重定向
          return to.fullPath;
        }
      }
    }
  } else if (to.params && to.params.token) {
    // 说明是用户登陆，带token参数过来的，设置token和菜单
    // 设置登录态
    vueCookie.set("token", to.params.token);
    // 设置请求头
    setAxiosHeader({ token: to.params.token as string });
    // 设置权限
    localStorage.permissions = to.params.permissions;
    localStorage.userInfo = to.params.userInfo;
    // 打平路由
    // handleRoute(cloneDeep(asyncRoutes));
    /* newRoute.forEach((item) => {
      myRouter.addRoute("allInOneAccount", item);
    }); */
    if (to.query.path) {
      return to.query.path as string;
    } else {
      return "/";
    }
  } else {
    // 没token的情况下跳转到登陆页，带上访问地址
    if (to.path !== "/login") {
      if (to.path === "/") {
        return "/login";
      } else {
        return `/login?path=${to.path}`;
      }
    }
  }
});

myRouter.afterEach(() => {
  nprogress.done();
});

export default myRouter;
