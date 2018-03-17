import {httpAuth} from './http-requests'
import router from '@/router'
import store from '@/store'


/**  
 * Check user has authorized token 
 * Redirect user to Introduction if the are not inducted
 */
const authCheck = (to, from, next) => {
  httpAuth.get('instructor')
    .then((res) => { 
      if (!res.data.inducted) {
        router.push('/induction')
      }

      store.commit('setUser', res.data)
      next() 
    })
    .catch((err) => { 
      router.push({name: 'Login'}) 
    })
}


export default authCheck;