import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '@/components/LandingPage.vue'
import Home from '@/components/Home'
import Search from '@/components/Search'
import InstructorLogin from '@/components/InstructorLogin'
import InstructorSignUp from '@/components/InstructorSignUp'
import InstructorPortal from '@/components/InstructorPortal'
import InstructorVerfication from '@/components/InstructorVerificationForm'
import InstructorCoverage from '@/components/InstructorCoverage'

import SuperAdminLogin from '@/components/SuperAdmin/SuperAdminLogin'
import HandleUserVerification from '@/components/SuperAdmin/HandleUserVerification'

import Auth from '@/authorization'
import SuperAdminAuth from '@/super-admin-authorization'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search/:postcode',
      name: 'Search',
      component: Search
    },
    {
      path: '/login',
      name: 'InstructorLogin',
      component: InstructorLogin
    },
    {
      path: '/signup',
      name: 'InstructorSignUp',
      component: InstructorSignUp
    },
    {
      path: '/portal',
      name: 'InstructorPortal',
      component: InstructorPortal,
      beforeEnter: Auth
    },
    {
      path: '/verification-form',
      name: 'InstructorVerification',
      component: InstructorVerfication,
      beforeEnter: Auth
    },
    {
      path: '/coverage',
      name: 'InstructorConverage',
      component: InstructorCoverage,
      beforeEnter: Auth
    },
    {
      path: '/0082960605-super-admin-login',
      name: 'SuperAdminLogin',
      component: SuperAdminLogin,
    },
    {
      path: '/instructor-adi-reviews',
      name: 'InstructorAdiReviews',
      component: HandleUserVerification,
      beforeEnter: SuperAdminAuth
    }
  ]
})
