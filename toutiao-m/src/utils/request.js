import axios from 'axios'
const request = axios.create({
  baseURL: 'https://toutiao.m.lipengzhou.com/api/' // api/app/v1_0/authorizations
})
export default request
