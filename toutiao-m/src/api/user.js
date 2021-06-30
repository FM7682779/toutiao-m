import request from '@/utils/request'

export const login = (data) => request({
  method: 'POST',
  url: '/app/v1_0/authorizations',
  data
})

export const userInfo = () => request({
  method: 'GET',
  url: '/app/v1_0/user'
  // // 发送请求头数据
  // headers: {
  //   // 注意：该接口需要授权才能访问
  //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

/**
 * 添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

/**
 * 修改用户信息
 */
export const UpdateUserInfo = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

/**
 * 修改用户头像
 */
export const UpdateAvter = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
