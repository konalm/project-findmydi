import {httpAuth} from './http-requests'
import router from '@/router'
import store from '@/store'

const superAdminAuthCheck = (to, from, next) => {
  httpAuth.get('/super-admin')
    .then(res => {
      console.log('SA all good')
      store.commit('setUser', res.data)
      next()
    })
    .catch(err => {
      console.log('catch SA auth')
      router.push({name: 'SuperAdminLogin'}) 
    })
}

export default superAdminAuthCheck