import Coverage from '@/components/Coverage'
import Profile from '@/components/Profile'
import Reviews from '@/components/Reviews'
import Stats from '@/components/Stats'
import Auth from '@/authorization'


const appRoutes = [
  {
    path: '/statistics',
    name: 'Stats',
    component: Stats,
    beforeEnter: Auth 
  },
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