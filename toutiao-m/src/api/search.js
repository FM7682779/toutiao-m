import request from '@/utils/request'

export const getSearchLX = (q) => request({
  method: 'GET',
  url: '/app/v1_0/suggestion',
  params: {
    q
  }
})

/**
 * 获取搜索结果
 */
export function getSearch(params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
