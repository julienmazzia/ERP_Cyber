import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import Client from'../views/Client.vue'
import RH from '../views/RH.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/client',
    name: 'client',
    //component: Client
  },
  {
    path: '/rh',
    name: 'RH',
    component: RH
  },
  {
    path: '/plan',
    name: 'Plan'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
