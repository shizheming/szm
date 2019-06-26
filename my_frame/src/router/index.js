import Vue from 'vue';
import VueRouter from 'vue-router';
import verb from './verb';

Vue.use(VueRouter);

var routes = [
    {
        path: '/verb',
        name: 'verb',
        title: '动词',
        component: () => import('../view/verb/index.vue'),
        child: verb
    }
];

var flattenRouter = (r) => {
    return r.map(current => {
        if (current.child) {
            return current.child.map((item => {
                item.path = current.path + item.path;
                if (item.child) {
                    return flattenRouter(item.child);
                }
                return item;
            }));
        }
        return current;
    });
}
var g = flattenRouter(routes);
console.log(g,4454);
export default new VueRouter({
    routes 
});