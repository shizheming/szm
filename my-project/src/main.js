import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import tool from './components/content/tool.vue';
console.log(tool)

// Vue.config.productionTip = false
var router = new VueRouter({
	path : '/tool',
	name : 'tool',
	component : tool
	// component : reslove => require(['@/components/content/tool'], reslove)
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

