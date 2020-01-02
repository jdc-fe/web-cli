import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
// eslint-disable-next-line
import router from './router';
// eslint-disable-next-line
import { resetRouter } from '@/router';
import store from './store';
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/reset', '/404']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // FIXME 新页面跳转home
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next();
      NProgress.done();
    } else {
      next();
      const { userid } = store.getters;
      if (userid) {
        resetRouter(true);
        next();
      } else {
        try {
          window.location.reload();
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token */
    // eslint-disable-next-line no-lonely-if
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
