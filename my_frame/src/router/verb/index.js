export default [
    {
        path: '/forEach',
        title: 'forEach',
        name: 'forEach',
        component: () => import('../../view/verb/forEach.vue')
    },
    {
        path: '/after',
        title: 'after',
        name: 'after',
        component: () => import('../../view/verb/after.vue')
    }
];