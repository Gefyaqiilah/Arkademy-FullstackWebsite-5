import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/main/landing-page/LandingPage.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '@/views/auth/SignUp.vue'
import CreatePin from '@/views/auth/CreatePin.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import Auth from '../views/auth/Auth.vue'
import Home from '@/views/main/home/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: 'createpin',
        name: 'CreatePin',
        component: CreatePin
      },
      {
        path: 'resetpassword',
        name: 'ResetPassword',
        component: ResetPassword
      }
    ]
    // redirect: '/register'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
