import Vue from 'vue'
import Router from 'vue-router'

import LandingPage from '@/components/LandingPage.vue'
import Home from '@/components/Home'
import Search from '@/components/Search'
import InstructorLogin from '@/components/InstructorLogin'
import InstructorSignUp from '@/components/InstructorSignUp'
import InstAppCoverage from '@/components/InstAppCoverage'
import InstructorVerfication from '@/components/InstructorVerificationForm'
import InstructorProfile from '@/components/InstAppProfile'

import SuperAdminLogin from '@/components/SuperAdmin/SuperAdminLogin'
import HandleUserVerification from '@/components/SuperAdmin/HandleUserVerification'

import Auth from '@/authorization'
import SuperAdminAuth from '@/super-admin-authorization'
import InstAppProfile from '@/components/LandingPage.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: Auth
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
      path: '/profile',
      name: 'InstructorProfile',
      component: InstructorProfile,
      beforeEnter: Auth
    },
    {
      path: '/areas-you-cover',
      name: 'InstAppCoverage',
      component: InstAppCoverage,
      beforeEnter: Auth
    },
    {
      path: '/verification-form',
      name: 'InstructorVerification',
      component: InstructorVerfication,
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
