import axios from 'axios'
import {getApiUrl} from './globals'
import cookies from 'js-cookie'
import store from '@/store'

console.log('run http requests script')

/**
 * get access token from store 
 * if store has no access token then mutate it to access token from cookie
 */
const getAccessToken = () => {
  console.log('GET ACCESS TOKEN')

  if (!store.getters.accessToken) {
    console.log('have to update access token with cookie')
    store.commit('setAccessToken', cookies.get('findmydi_token'))  
  } else { 
    console.log(' store has access token')
    console.log(store.getters.accessToken)
  }

  console.log('get access token ---->')
  console.log(store.getters.accessToken);

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
export var httpAuth = axios.create({
  baseURL: getApiUrl(),
  headers: {
    Accept: 'application/json',
    Authorization: getAccessToken()
  }
})


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


// export const test = () => {
//   console.log('this is a test export !!')
//   getAccessToken()
// }



