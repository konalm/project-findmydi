import axios from 'axios'
import {getApiUrl} from './globals'
import cookies from 'js-cookie'
import store from '@/store'


/**
 * get access token from store 
 * if store has no access token then mutate it to access token from cookie
 */
function getAccessToken () {
  console.log('GET ACCESS TOKEN !!!')

  if (!store.getters.accessToken) {
    store.commit('setAccessToken', cookies.get('findmydi_token'))  
  } 

  return store.getters.accessToken
}

/**
 * instance of axios used in every http request to the api.
 * With base url and headers to be used in every request.
 */
export const http = axios.create({
    baseURL: getApiUrl(),
    headers: {
        Accept: 'application/json'
    }
})

/**
 * same as the instance above however we carry the jwt access token
 * for requests that require authorization
 */
// export var httpAuth = axios.create({
//   baseURL: getApiUrl(),
//   headers: {
//     Accept: 'application/json',
//     Authorization: getAccessToken()
//   }
// })

console.log(typeof(httpAuth));


/**
 * 
 */
// export const getHttpAuth = () => {
//   return axios.create({
//     baseURL: getApiUrl(),
//     headers: {
//       Accept: 'application/json',
//       Authorization: getAccessToken()
//     }
//   })
// }


