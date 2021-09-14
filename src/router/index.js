import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Daily',
    component: Home
  },
  {
    path: '/annual',
    name: 'Annual',
    component: () => import(/* webpackChunkName: "about" */ '../views/Annual.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
