import request from '@/utils/request'

export function page(params) {
  return request({
    url: 'online',
    method: 'get',
    params
  })
}

export function del(keys) {
  return request({
    url: 'online',
    method: 'delete',
    data: keys
  })
}

export default { page, del }
