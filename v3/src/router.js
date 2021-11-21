import { createRouter, createWebHistory } from "vue-router";
import {defineAsyncComponent} from 'vue'
const routes = [
  {
    path: "/",
    name:'home',
    component:defineAsyncComponent(() => import('./life.vue')),
  },
  {
    path: "/film",
    name: "film",
    component: defineAsyncComponent(() => import('./film.vue')),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
