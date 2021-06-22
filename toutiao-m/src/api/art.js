import request from '@/utils/request'

export const getArt = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

export const getArts = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/**
 * 添加用户频道
 */
export const addUserChannel = (channels) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
