import Vue from 'vue';
import App from './App.vue';
import router from './router/router'
import store from './store'
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style/index.css';

Vue.use(antd);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');

