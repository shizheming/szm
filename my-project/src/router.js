import Vue from "vue";
import VueRouter from "vue-router";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [{
    path: '/tool',
    name: 'tool',
    title: '工具库',
    component: () => import('./view/tool.vue'), 
}, {
    path: '/designPattern',
    name: 'designPattern',
    title: '设计模式',
    component: () => import('./view/designPattern.vue'),
}, {
    path: '/consumptionRecord',
    name: 'consumptionRecord',
    title: '消费记录',
    component: () => import('./view/consumptionRecord.vue'),
}, {
    path: '/reason',
    name: 'reason',
    title: '点',
    component: () => import('./view/reason.vue'),
}, {
    path: '/perceptual',
    name: 'perceptual',
    title: '点',
    component: () => import('./view/perceptual.vue'),
}]

var router = new VueRouter({
    routes
})
export default router;