import {httpAuth} from './http-requests'
import router from '@/router'
import store from '@/store'

/**  
 * Check user has authorized token 
 * Redirect user to Main App if they have already been inducted
 */
const inductionAuthCheck = (to, from, next) => {
  httpAuth.get('instructor')
    .then((res) => { 
      if (res.data.inducted) {
        router.push('/profile')
      }

      store.commit('setUser', res.data)
      next() 
    })
    .catch((err) => { 
      router.push({name: 'InstructorLogin'}) 
    })
}


export default inductionAuthCheck;