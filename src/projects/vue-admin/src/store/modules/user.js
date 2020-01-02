
// eslint-disable-next-line
import {
  login,
  logout
} from '@/api/user';
import {
  getToken, setToken, removeToken,
  setUserId, removeUserId, getUserId
} from '@/utils/auth';
// eslint-disable-next-line
import { resetRouter } from '@/router';

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userid: getUserId(),
    name: '',
    avatar: '',
    username: '',
    mobile: '',
    roles: ['admin'],
    authority: [],
    companyUrl: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERID: (state, userid) => {
      state.userid = userid;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_AUTHORITY: (state, authority) => {
      state.authority = authority;
    }
  },
  actions: {
    // user login
    login({ commit }, userInfo) {
      // const { username, password, captcha } = userInfo;
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          username: username.trim(),
          password
          // captcha
        }).then(async (response) => {
          const {
            data: {
              token, userId
            }
          } = response;
          commit('SET_TOKEN', token);
          commit('SET_USERID', userId);
          commit('SET_USERNAME', username);
          setToken(token);
          setUserId(userId);
          resolve({ token, userId });
        }).catch((error) => {
          reject(error);
        });
      });
    },
    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout({ userId: state.userid }).then(() => {
          commit('SET_TOKEN', '');
          removeToken();
          removeUserId();
          // removeAuthority()
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },

    // remove token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        removeToken();
        removeUserId();
        resolve();
      });
    },

    // set avatar
    setAvatar({ commit }, url) {
      commit('SET_AVATAR', url);
    },

    // set mobile
    setMobile({ commit }, mobile) {
      commit('SET_MOBILE', mobile);
    }
  }
};
