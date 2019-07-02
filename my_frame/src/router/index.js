import Vue from 'vue';
import VueRouter from 'vue-router';
import verb from './verb';
import _ from 'lodash';

Vue.use(VueRouter);

var r = [
    {
        path: '/verb',
        name: 'verb',
        title: '词1',
        icon: 'md-at',
        component: () => import('../view/verb/index.vue'),
        child: verb
    }
];

var flattenRouter = (r) => {
    return _.flatten(r.map(current => {
        var r = [];
        if (current.child) {
            var c = current.child.map((item => {
                item.path = current.path + item.path;
                if (item.child) {
                    return flattenRouter(item.child);
                }
                return item;
            }));
            r = r.concat(c);
        }
        return r.concat(current);
    }));
}
var routes = flattenRouter(r);
console.log(routes,19);

export const menu = r;
export default new VueRouter({
    routes
});