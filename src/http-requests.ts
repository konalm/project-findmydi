import axios from 'axios'
import {getApiUrl} from './globals'
import cookies from 'js-cookie'


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
export const httpAuth = axios.create({
    baseURL: getApiUrl(),
    headers: {
        Accept: 'application/json',
        Authorization: cookies.get('findmydi_token')
    }
})



