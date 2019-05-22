import { action, extendObservable } from 'mobx';
import { getMenuData } from 'src/router/menu';
// 可观察属性
const OBSERVABLE = {
  foldSidebar: false,
  menuData: []
};


class Layout {
  constructor() {
    extendObservable(this, {
      ...OBSERVABLE
    });
  }

  getBreadMap(menus) {
    const breadMap = {};
    const recusive = (menu, parents) => {
      menu.filter((i) => i.path || i.routes).forEach((route) => {
        const { routes, path } = route;
        breadMap[path] = parents.concat(route);
        if (routes) recusive(routes, breadMap[path]);
      });
    };
    recusive(menus, []);
    return breadMap;
  }

  @action.bound getMenuData(key) {
    const menuData = getMenuData(key);
    this.menuData = menuData;
    this.breadMap = this.getBreadMap(menuData);
  }

  @action.bound reset() {
    Object.assign(this, OBSERVABLE);
  }

  @action.bound update(data) {
    Object.assign(this, data);
  }
}

export default new Layout();
