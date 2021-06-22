import axios from 'axios'
import store from '@/store/'
const request = axios.create({
  baseURL: 'https://toutiao.m.lipengzhou.com/api/' // api/app/v1_0/authorizations
})
request.interceptors.request.use((config) => {
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, (error) => {
  console.dir(error)
  return Promise.reject(error)
})
export default request
