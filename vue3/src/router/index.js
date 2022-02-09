import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../HelloWorld.vue')
  },
  {
    path: '/examine',
    name: 'examine',
    component: () => import('../page/examine.vue')
  },
  {
    path: '/fullgift',
    name: 'fullgift',
    component: () => import('../page/fullgift/index.vue')
  },
  // {
  //   path: '/linkage',
  //   name: 'linkage',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   //component: () => import(/* webpackChunkName: "about" */ '../views/linkage.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
