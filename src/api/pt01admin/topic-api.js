import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'admin/topic/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'admin/topic/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'admin/topic/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'admin/topic/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'admin/topic/load',
    method: 'get',
    params: params
  })
}

export default { page, save, del, load, batchSave }
