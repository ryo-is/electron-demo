import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

export default router
