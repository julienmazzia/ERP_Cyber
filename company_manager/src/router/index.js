import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import Client from'../views/Client.vue'
import RH from '../views/RH.vue'
import plan from '../views/Plannification.vue'
import plans from '../views/Plans.vue'
import series from '../views/chaines.vue'

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
    name: 'Plan',
    component: plan
  },
  {
    path: '/plan/plans',
    name: 'plans',
    component: plans
  },
  {
    path: '/plan/chaine',
    name: 'chaines',
    component: series
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
