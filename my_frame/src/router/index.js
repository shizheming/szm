import Vue from 'vue';
import VueRouter from 'vue-router';
import _ from 'lodash';
import r from './menu';

Vue.use(VueRouter);

/*var r = [
    {
        path: '/word',
        name: 'word',
        title: '词',
        icon: 'md-at',
        component: () => import('../view/word/relationship/relationship1.0.vue'),
        child: word
    }
];*/

var flattenRouter = (r) => {
    return _.flatten(r.map(current => {
        var r = [];

        if (current.child) {
            var c = current.child.map(item => {
                item.path = current.path + item.path;
                if (item.child) {
                    return flattenRouter(item.child);
                }
                return item;
            });

            r = r.concat(c);
        }
        return r.concat(current);
    }));
};
var routes = flattenRouter(r);

export const menu = r;
export default new VueRouter({
    routes
});