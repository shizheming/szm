import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./life.vue"),
  },
  {
    path: "/film",
    name: "film",
    component: () => import("./film.vue"),
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("./demo.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
