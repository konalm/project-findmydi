import {httpAuth} from './http-requests'
import router from '@/router'
import store from '@/store'

const authCheck = (to, from, next) => {
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