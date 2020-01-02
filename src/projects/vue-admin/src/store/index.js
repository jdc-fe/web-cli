import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';
import app from './modules/app';
// eslint-disable-next-line
import user from './modules/user';
import settings from './modules/settings';
import tagsView from './modules/tagsView';
// eslint-disable-next-line
import permission from './modules/permission';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 持久化
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        user: val.user // 只储存user
      };
    }
  })],
  modules: {
    app,
    user,
    tagsView,
    settings,
    permission
  },
  getters
});

export default store;
