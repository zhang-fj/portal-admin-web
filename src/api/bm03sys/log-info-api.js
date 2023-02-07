import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/bm03sys/sysLogs/page',
    method: 'post',
    data: { ...data }
  })
}

export function userlogs(data) {
  return request({
    url: '/bm03sys/sysLogs/userlogs',
    method: 'post',
    data: { logType: 'INFO', ...data }
  })
}

export function del() {
  return request({
    url: '/bm03sys/sysLogs/delInfo',
    method: 'delete'
  })
}

export function load(id) {
  return request({
    url: '/bm03sys/sysLogs/load',
    method: 'get',
    params: { id: id }
  })
}

export default { page, userlogs, del, load }
