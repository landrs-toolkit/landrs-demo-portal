import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'

import PageNotFound from './pages/PageNotFound.vue';
import DashboardRoot from './pages/dashboard/DashboardRoot.vue';
import Dashboard from './pages/dashboard/Dashboard.vue';
import UserProfile from './pages/user/UserProfile.vue';

import store from './store/store';

import {
  HTTP
} from '@/utilities/http-common';

Vue.use(Router)

store.dispatch('initApp');
HTTP.defaults.headers.common['Authorization'] = store.getters.getAuthorizationHeader.Authorization;

store.dispatch('user/getUser').then(res => {
  store.dispatch('user/setUser', res.data);
});

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: { component: 'BaseTemplate' },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './pages/About.vue'),
      meta: { component: 'BaseTemplate' },
    },
    {
      path: '/login/',
      name: 'login',
      component: Login,
      meta: { component: 'BaseTemplate' },
    },
    {
      path: '/dashboard/',
      component: DashboardRoot,
      meta: { requiresAuth: true, component: 'DashboardBaseTemplate' },
      children: [{
          path: '',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'user',
          name: 'user',
          component: UserProfile
        }
      ]
    },
    {
      path: '*',
      name: 'not-found',
      component: PageNotFound,
      meta: { component: '*' }
    },

  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isAuthenticated) {
      next();
    } else {
      next({
        name: 'login',
        query: {
          next: to.fullPath
        }
      });
    }
    
  } else {
    next();
  }
});

export default router;