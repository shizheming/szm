import Vue from "vue";
import VueRouter from "vue-router";

import tool from "./content/tool.vue";
import consumptionRecord from "./life/consumptionRecord.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
    path: '/tool',
    title: '工具库',
    icon: 'ios-build',
    component: tool
}, {
    path: '/consumptionRecord',
    title: '消费记录',
    icon: 'ios-book',
    component: consumptionRecord
}, {
    path: '/xxx',
    title: '哲学',
    component: consumptionRecord
}]

var router = new VueRouter({
    routes
})
export default router;