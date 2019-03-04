import Vue from 'vue';
import Router from 'vue-router';

// router lazy load
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
});
