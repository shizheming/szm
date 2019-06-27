import './src/index.js';
import Vue from 'vue';
import Pc from './src/pc.vue';
import iview from 'iview';
import 'iview/dist/styles/iview.css';
import router from './src/router';

// if (module.hot) module.hot.accept();

Vue.use(iview);

new Vue({
    render: h => h(Pc),
    router
}).$mount('#my_system');