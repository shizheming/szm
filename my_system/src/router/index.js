import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

var routes = [
    {
        path: '/relationship',
        name: 'relationship',
        title: '关系',
        component: () => import('../components/relationship.vue')
    },
    {
        path: '/motion',
        name: 'motion',
        title: '运动',
        component: () => import('../components/motion.vue')
    },
    {
        path: '/linkage',
        name: 'linkage',
        title: '联动',
        component: () => import('../components/linkage.vue')
    },
    {
        path: '/strategy',
        name: 'strategy',
        title: '策略',
        component: () => import('../components/strategy.vue')
    },
];

export default new VueRouter({
    routes
});