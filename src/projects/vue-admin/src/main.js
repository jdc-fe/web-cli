import Vue from 'vue';
import '@/icons'; // icon
import '@/permission'; // permission control
import './theme/index.scss';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
import Logger from '@/plugins/logger';
import permission from '@/directive/permission';
import './theme/element-variable.scss';
import './components';
import App from './App';
import store from './store';
import router from './router';

Vue.use(permission);
Vue.use(ElementUI, { locale });
Vue.use(Logger, { debug: process.env.NODE_ENV !== 'production' });

// todo

// eslint-disable-next-line
Vue.prototype.confirmBox = function(title, handler) {
  this.$confirm(title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    handler();
  }).catch(() => {});
};

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
