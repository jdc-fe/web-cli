import Vue from 'vue';
import './main.styl';
import App from './App.vue';
import router from './router';
import store from './store';
import { getPing } from './api/demo';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  async mounted() {
    // eslint-disable-next-line no-console
    console.log('get ping: ', await getPing());
    setInterval(() => {
      this.$store.commit('SYNC_CURRENT_TIME');
    }, 1000);
  }
}).$mount('#app');
