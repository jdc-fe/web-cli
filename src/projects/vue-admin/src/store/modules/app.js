import Cookies from 'js-cookie';
import { randomString } from '@/utils/secutity';

export default {
  namespaced: true,
  state: {
    aesKey: randomString(),
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
  },
  mutations: {
    OPEN_SIDEBAR: (state) => {
      Cookies.set('sidebarStatus', 1);
      state.sidebar.opened = true;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_SIDEBAR: (state) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes;
    }
  },
  actions: {
    openSideBar({ commit }) {
      commit('OPEN_SIDEBAR');
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    setRoutes({ commit }, routes) {
      commit('SET_ROUTES', routes);
    }
  }
};
