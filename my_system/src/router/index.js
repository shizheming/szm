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
    {
        path: '/memoized',
        name: 'memoized',
        title: '记忆',
        component: () => import('../components/memoized.vue')
    },
    {
        path: '/decorate',
        name: 'decorate',
        title: '装饰',
        component: () => import('../components/decorate.vue')
    },
    {
        path: '/state',
        name: 'state',
        title: '状态',
        component: () => import('../components/state.vue')
    },
    {
        path: '/attachment',
        name: 'attachment',
        title: '依附',
        component: () => import('../components/attachment.vue')
    }
];

export default new VueRouter({
    routes
});