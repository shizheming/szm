import Vue from 'vue';
import VueRouter from 'vue-router';
import word from './word';
import _ from 'lodash';

Vue.use(VueRouter);

var r = [
    {
        path: '/word',
        name: 'word',
        title: '词',
        icon: 'md-at',
        component: () => import('../view/word/index.vue'),
        child: word
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