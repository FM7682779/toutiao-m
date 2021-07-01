import axios from 'axios'
import store from '@/store/'
import jsonBig from 'json-bigint'
import router from '@/router'
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

const refrshTokenReq = axios.create({
  baseURL: 'https://toutiao.m.lipengzhou.com/' // api/app/v1_0/authorizations
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

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
},
async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.dir(error)

  const state = error.response.status
  if (state === 400) {
    const user = store.state.user
    if (user) {
      router.replace({
        name: 'empty',
        params: {
          state: 400
        }
      })
    }
  } else if (state === 401) {
    const user = store.state.user
    if (!user || !user.token) {
      return router.replace({
        name: 'Login',
        query: {
          redirect: router.currentRoute.fullPath
        }

      })
    }
    try {
      const { data } = await refrshTokenReq({
        method: 'PUT',
        url: 'app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.comit('setUser', user)
      // 发送请求
      return request(error.config)
    } catch (error) {
      router.replace('Login')
    }
  } else if (state === 403) {
    router.replace({
      name: 'empty',
      params: {
        state: 403
      }
    })
  } else if (state >= 500) {
    router.replace({
      name: 'empty',
      params: {
        state: 500
      }
    })
  }
  return Promise.reject(error)
})
export default request
