import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LandingPage from '../views/main/LandingPage.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import AddPin from '../views/auth/AddPin.vue'
import Auth from '../views/auth/Auth.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/login/:nama',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/addPin',
    name: 'AddPin',
    component: AddPin
    // redirect: '/register'
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
    // redirect: '/register'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
