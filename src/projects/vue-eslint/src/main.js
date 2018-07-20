import './main.styl'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    setInterval(() => {
      this.$store.commit('SYNC_CURRENT_TIME')
    }, 1000)
  }
}).$mount('#app')
