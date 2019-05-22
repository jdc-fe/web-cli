import routesConfig from 'src/router/router.config';
import Loadable from '@loadable/component';
import _ from 'lodash';

function dynamicRequire(Comp) {
  return Loadable(Comp);
}
function flatRoutes(routes) {
  const flatRouter = [];
  function recursive(deepRoutes) {
    deepRoutes.forEach((ele) => {
      const item = ele;
      if (!item.redirect && item.component) {
        flatRouter.push(item);
      }
      if (item.routes) {
        recursive(item.routes);
        delete item.routes;
      }
    });
  }
  recursive(routes);
  return flatRouter;
}

function recursiveRequireComp(routes) {
  function recursive(deepRoutes) {
    for (let i = deepRoutes.length - 1; i >= 0; i--) { // 倒序遍历删除
      const item = deepRoutes[i];
      if (item.routes) {
        recursive(item.routes);
      }
      if (item.component) {
        item.component = dynamicRequire(item.component);
      }
      if (item.redirect) {
        deepRoutes.splice(i, 1);
      }
    }
  }
  recursive(routes);
}

/* 将每个compoent 组件loadable，并去除redirect项 */
export const getRouterData = () => {
  const cloneConfig = _.cloneDeep(routesConfig);
  recursiveRequireComp(cloneConfig);
  return cloneConfig || [];
};
/* 将router扁平化，只留一级routes，这样react-router才能正常渲染 */
export const getFlatRouterData = () => {
  const routerData = [];
  const originRouterData = getRouterData();
  let temp = null;
  originRouterData.forEach((ele) => {
    const item = ele;
    if (item.routes) {
      item.routes = flatRoutes(item.routes);
    }
    if (item.path === '/') { // 将path为'/'放在最后一项初始化路由，为避免'/'在前面妨碍后面的路由找不到
      temp = item;
      return;
    }
    routerData.push(item);
  });
  if (temp) {
    routerData.push(temp);
  }
  return routerData;
};

export const getRedirectData = () => {
  const redirectData = [];
  function recursive(routes) {
    routes.forEach((item) => {
      if (item.redirect) {
        redirectData.push({
          from: item.path,
          to: item.redirect
        });
        return;
      }
      if (item.routes) {
        recursive(item.routes);
      }
    });
  }
  recursive(routesConfig);
  return redirectData;
};
