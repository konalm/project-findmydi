import {httpAuth} from './http-requests'
import router from '@/router'
import store from '@/store'

const authCheck = (to, from, next) => {
  console.log('before enter authorization !')
  console.log('call http auth from http-requests')

  httpAuth.get('/user')
    .then((res) => { 
      store.commit('setUser', res.data)
      next() 
    })
    .catch((err) => { 
      router.push({name: 'InstructorLogin'}) 
    })
}

export default authCheck;