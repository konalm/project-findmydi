import SuperAdminLogin from '@/components/superAdmin/SuperAdminLogin'
import HandleUserVerification from '@/components/superAdmin/HandleUserVerification'
import SuperAdminAuth from '@/super-admin-authorization'

const superadminRoutes = [
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


export default superadminRoutes