import Vue from 'vue';
import Logger from '@/plugins/logger';
import './theme/index.scss';
// 以下三项不需要的时候可以注释掉
import './plugins/element.js';
import router from './router';
import store from './store';

import App from './App.vue';

Vue.use(Logger, { debug: false });
Vue.config.productionTip = false;

Vue.$log.info('vue-eslint launch...');
new Vue({
  router,
  store,
  render(h) { return h(App); },
  async mounted() {
    this.$log.info('vue-eslint ready...');
    setInterval(() => {
      this.$store.commit('SYNC_CURRENT_TIME');
    }, 1000);
  }
}).$mount('#app');
