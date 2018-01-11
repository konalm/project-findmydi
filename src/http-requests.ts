import axios from 'axios'
import {getApiUrl} from './globals'
import store from '@/store'


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
 * axios instance used in every aith request, 
 * (carries Auth access token in header)
 */
export var httpAuth = axios.create({
  baseURL: getApiUrl(),
})

/**
 * update axios instance auth header to get cookie 
 * (usually called when the cookie has changed value)
 */
export const updateHttpHeader = () => {
  httpAuth.defaults.headers.common['Authorization'] = 
    localStorage.getItem('token');
}

updateHttpHeader()



