import { getRouterData } from './router';

export const getMenuData = (path) => { // 以path为标示获取下级routes菜单，作为菜单数据
  const routerData = getRouterData();
  let menuData = [];
  function recursive(deepRoute) {
    deepRoute.some((item) => {
      if (item.path === path) {
        menuData = item.routes || [];
        return true;
      }
      if (item.routes) {
        recursive(item.routes);
      }
      return false;
    });
  }
  recursive(routerData);
  return menuData;
};
