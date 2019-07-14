export default [
    {
        path: '/forEach',
        title: 'forEach',
        name: 'forEach',
        component: () => import('../../view/word/forEach.vue')
    },
    {
        path: '/after',
        title: 'after',
        name: 'after',
        component: () => import('../../view/word/after.vue')
    }
];