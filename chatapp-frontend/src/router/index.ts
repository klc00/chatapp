import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../views/MainView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    beforeEnter: (to, from, next) => {
      let isAuth = false;
      if (localStorage.getItem("access_token")) {
        isAuth = true;
      }
      if (isAuth) {
        next("/playground")
      } else {
        next()
      }
    },
  },
  {
    path: '/playground',
    name: 'playground',
    beforeEnter: (to, from, next) => {
      let isAuth = false;
      if (localStorage.getItem("access_token")) {
        isAuth = true;
      }
      if (isAuth) {
        next()
      } else {
        next("/")
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/PlaygroundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
