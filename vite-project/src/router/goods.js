export default [
  {
    path: "categoryMenu",
    name: "categoryMenu",
    meta: {
      title: "类目",
      type: "menu",
    },
    component: () => import("../views/menu.vue"),
    children: [
      {
        path: "frontendCategoryPage",
        name: "frontendCategoryPage",
        meta: {
          title: "前台类目",
        },
        component: () =>
          import("../views/goodsModule/categoryMenu/frontendCategoryPage.vue"),
      },
      {
        path: "backstageCategoryPage",
        name: "backstageCategoryPage",
        meta: {
          title: "后台类目",
        },
        component: () =>
          import("../views/goodsModule/categoryMenu/backstageCategoryPage.vue"),
      },
    ],
  },
];
