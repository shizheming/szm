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
    path: "/TVplay",
    name: "TVplay",
    component: () => import("./TVplay.vue"),
  },
  {
    path: "/animation",
    name: "animation",
    component: () => import("./animation.vue"),
  },
  {
    path: "/TVanimation",
    name: "TVanimation",
    component: () => import("./TVanimation.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
