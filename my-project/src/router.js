import Vue from "vue";
import VueRouter from "vue-router";

import tool from "./content/tool.vue";
import consumptionRecord from "./life/consumptionRecord.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
    path: "/tool",
    component: tool
}, {
    path: "/consumptionRecord",
    component: consumptionRecord
}]

var router =  new VueRouter({
    routes
})
export default router;