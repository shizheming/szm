import Vue from 'vue';
import App from './App.vue';
import router from './router/router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView, {
    transfer: true,
    size: 'large',
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');

