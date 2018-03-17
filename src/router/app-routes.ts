import Coverage from '@/components/Coverage'
import Profile from '@/components/Profile'
import Reviews from '@/components/Reviews'
import Auth from '@/authorization'


const appRoutes = [
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: Auth
  },
  {
    path: '/areas-you-cover',
    name: 'Coverage',
    component: Coverage,
    beforeEnter: Auth
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: Reviews,
    beforeEnter: Auth
  }
]

export default appRoutes