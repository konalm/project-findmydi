import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import appRoutes from './app-routes'
import inductionRoutes from './induction-routes'
import superAdminRoutes from './superadmin-routes'
import loggedOutRoutes from './loggedout-routes'


export default new Router({
  routes: [
    {
      path: '', 
      redirect: '/profile'
    }, 
    ...loggedOutRoutes, 
    ...appRoutes, 
    ...inductionRoutes, 
    ...superAdminRoutes
  ]
})
