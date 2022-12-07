export default [
  {
    path: 'orderMenu',
    name: 'orderMenu',
    meta: {
      title: '订单',
    },
    component: () => import('../views/menu.vue'),
    children: [
      {
        path: 'orderListPage',
        name: 'orderListPage',
        meta: {
          title: '订单列表',
        },
        component: () =>
          import('../views/orderModule/orderMenu/orderListPage.vue'),
        children: [
          {
            path: 'orderDetailPage',
            name: 'orderDetailPage',
            meta: {
              title: '订单详情',
            },
            component: () =>
              import('../views/orderModule/orderMenu/orderDetailPage.vue'),
          },
        ],
      },
      {
        path: 'orderManuallyFormPage',
        name: 'orderManuallyFormPage',
        meta: {
          title: '人工下单',
        },
        component: () =>
          import('../views/orderModule/orderMenu/orderManuallyFormPage.vue'),
      },

      {
        path: 'supplementaryInvoiceFormPage',
        name: 'supplementaryInvoiceFormPage',
        meta: {
          title: '补开发票',
        },
        component: () =>
          import(
            '../views/orderModule/orderMenu/supplementaryInvoiceFormPage.vue'
          ),
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
