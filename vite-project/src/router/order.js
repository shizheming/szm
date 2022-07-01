export default [
  {
    path: "orderMenu",
    name: "orderMenu",
    meta: {
      title: "订单",
      type: "menu",
    },
    component: () => import("../views/menu.vue"),
    children: [
      {
        path: "orderListPage",
        name: "orderListPage",
        meta: {
          title: "订单列表",
        },
        component: () =>
          import("../views/orderModule/orderMenu/orderListPage.vue"),
      },
      {
        path: "orderDetailPage",
        name: "orderDetailPage",
        meta: {
          title: "订单详情",
        },
        component: () =>
          import("../views/orderModule/orderMenu/orderDetailPage.vue"),
      },
    ],
  },
  /* {
    path: "/afterSaleMenu",
    name: "afterSaleMenu",
    meta: {
      title: "售后单",
    },
    component: () => import("../views/menu.vue"),
    children: [
      {
        path: "afterSaleListPage",
        name: "afterSaleListPage",
        meta: {
          title: "订单列表",
        },
        component: () =>
          import("../views/orderModule/afterSaleMenu/afterSaleListPage.vue"),
      },
    ],
  }, */
];
