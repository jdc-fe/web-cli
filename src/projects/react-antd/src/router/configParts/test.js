export default {
  path: '/test',
  icon: 'icon-shujujicheng',
  name: '测试栏目',
  exact: true,
  routes: [
    {
      path: '/test/page',
      name: '测试子页面',
      component: () => import('src/views/TestPage')
    },
    {
      path: '/test/mock',
      name: 'mock demo',
      component: () => import('src/views/Mock')
    }
  ]
};
