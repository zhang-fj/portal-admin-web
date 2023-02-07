import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/bm03sys/sysLogs/page',
    method: 'post',
    data: { logType: 'ERROR', ...data }
  })
}

export function del() {
  return request({
    url: '/bm03sys/sysLogs/delError',
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

export default { page, del, load }
