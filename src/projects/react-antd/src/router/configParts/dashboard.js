export default {
  path: '/dashboard',
  icon: 'icon-shujujicheng',
  name: '仪表盘',
  exact: true,
  component: () => import('src/views/Dashboard'),
};
