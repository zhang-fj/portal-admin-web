import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm03sys/sysParam/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm03sys/sysParam/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm03sys/sysParam/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm03sys/sysParam/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm03sys/sysParam/load',
    method: 'get',
    params: params
  })
}

export default { page, save, del, load, batchSave }
