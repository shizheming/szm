export default [
    {
        path: '/relationship1',
        name: 'relationship1',
        title: '关系1',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/relationship2',
        name: 'relationship2',
        title: '关系2',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/relationship',
        name: 'relationship',
        title: '关系',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/discontinuity',
        name: 'discontinuity',
        title: '间断性',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/linkage1',
        name: 'linkage1',
        title: '联动1',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/linkage',
        name: 'linkage',
        title: '联动',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/strategy1',
        name: 'strategy1',
        title: '策略1',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/strategy',
        name: 'strategy',
        title: '策略',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/chain',
        name: 'chain',
        title: '职责链',
        component: () => import('@view/word/index.vue')
    },
    {
        path: '/observation',
        name: 'observation',
        title: '观察者',
        component: () => import('@view/word/index.vue')
    }
];