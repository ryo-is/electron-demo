import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainView from '../views/MainView.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

export default router
