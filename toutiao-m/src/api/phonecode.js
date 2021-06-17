import request from '@/utils/request'

export const phonecode = (mobile) => request({
  method: 'GET',
  url: `/app/v1_0/sms/codes/${mobile}`

})