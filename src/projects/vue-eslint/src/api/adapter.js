/**
 * axios
 * api: https://github.com/axios/axios
 */

import axios from 'axios'
import {domains} from '@/config'

const icity = axios.create({
  baseURL: domains.icity,
  timeout: 3000,
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  // transformResponse: [function (data) {
  //   return data
  // }],
})
icity.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

// export default axios
export {icity}
