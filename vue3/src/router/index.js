import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/relationship',
  //   name: 'relationship',
  //   component: relationship
  // },
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
