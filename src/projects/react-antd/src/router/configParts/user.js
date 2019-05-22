/* eslint-disable max-len */
import { PATHS } from 'src/router';
// 用户
export default {
  path: '/user',
  component: () => import('src/components/layout/UserLayout'),
  routes: [
    { path: '/user', redirect: PATHS.LOGIN },
    {
      path: PATHS.LOGIN,
      component: () => import('src/components/user/login')
    },
  ]
};
