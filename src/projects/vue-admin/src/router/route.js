import Layout from '@/layout';
/**
 * 路由配置说明
// 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true // (默认 false)

//  permission: true, // 是否要校验功能id

// 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
redirect: 'noRedirect'

// 一直显示根路由
alwaysShow: true

// 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
name: 'router-name'

// 用于权限过滤
menuCode: 'code'

meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标， 可以自定义图标 自定义图标放在icons/svg下
  noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
}
*/

const constantRoutes = [
  {
    path: '/',
    redirect: '/home',
    permission: true,
    hidden: true
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    permission: true,
    hidden: true,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    permission: true, // 是否要校验功能id
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    permission: true,
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: { title: '用户管理', icon: 'app-icon' },
    permission: true,
    children: [
      {
        path: '',
        name: '',
        component: () => import('@/views/user/userList.vue'),
        meta: { title: '用户查询', icon: '' },
        permission: true
      }
    ]
  },
  {
    path: '/content',
    name: 'content',
    component: Layout,
    meta: { title: '内容管理', icon: 'content-icon' },
    permission: true,
    children: [
      {
        path: 'travel',
        name: 'travel',
        component: () => import('@/views/content/travel'),
        meta: { title: '出行百科', icon: '' },
        permission: true
      },
      {
        path: 'newTravel',
        name: 'newTravel',
        component: () => import('@/views/content/travel/new'),
        meta: { title: '新建出行百科', icon: '' },
        permission: true,
        hidden: true
      }
    ]
  }
];
export default constantRoutes;
