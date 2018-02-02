import {httpAuth} from './http-requests'
import router from '@/router'
import store from '@/store'

const superAdminAuthCheck = (to, from, next) => {
  httpAuth.get('/super-admin-auth')
    .then(res => {
      store.commit('setUser', res.data)
      next()
    })
    .catch(err => {
      router.push({name: 'SuperAdminLogin'}) 
    })
}

export default superAdminAuthCheck