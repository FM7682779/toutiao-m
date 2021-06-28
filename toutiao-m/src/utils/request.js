import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'
const request = axios.create({
  baseURL: 'https://toutiao.m.lipengzhou.com/api/', // api/app/v1_0/authorizations
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [function (data) {
    try {
    // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
    // 如果转换失败，则包装为统一数据格式并返回
      return { data }
    }
  }]
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
