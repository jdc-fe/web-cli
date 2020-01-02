import Vue from 'vue';
// eslint-disable-next-line
import store from '@/store';
import Router from 'vue-router';
import _ from 'lodash';
import constantRoutes from './route';

Vue.use(Router);
const createRouter = () => {
  const { authority } = store.getters;
  const arr = constantRoutes.map(i => i.name);
  if (authority.length > 0 && arr.indexOf('home') === -1) {
    constantRoutes.push({
      path: '*',
      redirect: '/home',
      permission: true,
      hidden: true
    });
  }
  const permissions = [];
  const filterPermissions = authoritys => authoritys.forEach((item) => {
    permissions.push(item.rescId);
    if (item.child.length > 0)filterPermissions(item.child);
  });
  filterPermissions(authority);
  // 判断是否为有权访问的菜单，menus值为['60','70','80']或者'60'
  const filterMenu = (menus) => {
    if (menus instanceof Object) {
      return menus.some(item => permissions.includes(item));
    }
    return permissions.includes(menus.toString());
  };
  // 把有权限访问的菜单筛选出来
  const filterRoutes = routes => routes.filter((item) => {
    if (item.permission
        || (typeof item.menuCode !== 'undefined'
         && filterMenu(item.menuCode))) {
      if (item.children && !item.permission) {
        item.children = filterRoutes(item.children);
      }
      return true;
    }
    return false;
  });
  // 根据登陆用户权限过滤路由
  const routes = filterRoutes(_.cloneDeep(constantRoutes));
  store.dispatch('app/setRoutes', routes);
  return new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes
  });
};

const router = createRouter();

export async function resetRouter(ifSkipPropAssign = false) {
  const newRouter = createRouter();
  if (!ifSkipPropAssign || !router.options.routes.length) {
    Object.assign(router.options, newRouter.options);
    router.matcher = newRouter.matcher; // reset router
  }
}

export default router;
