import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Bar from '@/components/Bar.vue'
import LandingPage from '@/components/LandingPage.vue'
import InstructorSearch from '@/components/InstructorSearch'
import InstructorSignUp from '@/components/InstructorSignUp'

// import {getApi} from './components/globalstwo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/bar',
      name: 'Bar',
      component: Bar
    },
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/instructor-search',
      name: 'InstructorSearch',
      component: InstructorSearch
    },
    {
      path: '/signup',
      name: 'InstructorSignUp',
      component: InstructorSignUp
    }
  ]
})
