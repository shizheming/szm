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
    /* {
        path: '/memoized',
        name: 'memoized',
        title: '记忆',
        component: () => import('../components/memoized.vue')
    }, */
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
    },
    {
        path: '/promise',
        name: 'promise',
        title: '异步时间',
        component: () => import('../components/promise.vue')
    },
    {
        path: '/test',
        name: 'test',
        title: '异步时间',
        component: () => import('../test.vue')
    },
    {
        path: '/test2',
        name: 'test2',
        title: '异步时间2',
        component: () => import('../test2.vue')
    },
    {
        path: '/test3',
        name: 'test3',
        title: '异步时间3',
        component: () => import('../test3.vue')
    },
    {
        path: '/test4',
        name: 'test4',
        title: '异步时间4',
        component: () => import('../test4.vue')
    }
];

export default new VueRouter({
    routes
});