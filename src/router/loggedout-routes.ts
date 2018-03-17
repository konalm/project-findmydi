import Login from '@/components/Login'
import SignUp from '@/components/SignUp'


const loggedoutRoutes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  }
]

export default loggedoutRoutes