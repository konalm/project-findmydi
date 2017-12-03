import axios from 'axios'
import {getApiUrl} from './globals'

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



