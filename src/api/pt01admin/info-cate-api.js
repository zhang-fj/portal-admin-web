import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'admin/infoCate/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'admin/infoCate/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'admin/infoCate/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'admin/infoCate/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'admin/infoCate/load',
    method: 'get',
    params: params
  })
}

export default { page, save, del, load, batchSave }
