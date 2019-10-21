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
        path: '/discontinuity',
        name: 'discontinuity',
        title: '关系',
        component: () => import('../components/discontinuity.vue')
    },
];

export default new VueRouter({
    routes
});