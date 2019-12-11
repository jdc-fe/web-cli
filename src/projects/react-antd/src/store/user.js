import * as api from 'src/service/user';
import { action, extendObservable } from 'mobx';
// 可观察属性
const OBSERVABLE = {
  isLogin: true,
  user: ''
};


class User {
  constructor() {
    extendObservable(this, {
      ...OBSERVABLE
    });
  }

  @action.bound async login(data) {
    try {
      const res = await api.login(data);
      this.isLogin = true;
      this.user = res;
    } catch (err) {
      throw new Error(err);
    }
  }

  @action.bound async logout() {
    try {
      await api.logout();
      this.isLogin = false;
      this.user = '';
    } catch (err) {
      throw new Error(err);
    }
  }

  @action.bound reset() {
    Object.assign(this, OBSERVABLE);
  }

  @action.bound update(data) {
    Object.assign(this, data);
  }
}

export default new User();
