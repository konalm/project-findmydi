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

import InstructorIntro from '@/components/InstAppIntro'
import InstructorIntroHourlyRate from '@/components/InstAppIntro/InstAppIntroHourlyRate.vue'
import InstructorIntroCoverage from '@/components/InstAppIntro/InstAppCoverage.vue'
import InstructorIntroProfilePic from '@/components/InstAppIntro/InstAppIntroProfilePic.vue'
import InstructorIntroAdiLicence from '@/components/InstAppIntro/InstAppIntroAdiLicence.vue'

import SuperAdminLogin from '@/components/SuperAdmin/SuperAdminLogin'
import HandleUserVerification from '@/components/SuperAdmin/HandleUserVerification'

import Auth from '@/authorization'
import InductionAuth from '@/induction-authorization'
import SuperAdminAuth from '@/super-admin-authorization'


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
    /* Induction */ 
    {
      path: '/intro',
      name: 'InstructorIntro',
      component: InstructorIntro,
      beforeEnter: InductionAuth
    },
    {
      path: '/intro/hourly-rate',
      name: 'InstructorIntroHourlyRate',
      component: InstructorIntroHourlyRate,
      beforeEnter: InductionAuth
    },
    {
      path: '/intro/coverage',
      name: 'InstructorIntroCoverage',
      component: InstructorIntroCoverage,
      beforeEnter: InductionAuth 
    },
    {
      path: '/intro/profile-picture',
      name: 'InstructorIntroProfilePic',
      component: InstructorIntroProfilePic,
      beforeEnter: InductionAuth
    },
    {
      path: '/intro/adi-licence',
      name: 'InstructorIntroAdiLicence',
      component: InstructorIntroAdiLicence,
      beforeEnter: InductionAuth
    },
    /* App */ 
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
